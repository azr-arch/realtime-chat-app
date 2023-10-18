import ChatMessage from "@models/message";
import User from "@models/user";
import { ApiResponse } from "@utils";
import Chat from "@models/chat";
import mongoose from "mongoose";

export async function POST(request, { params }) {
  const { chatId } = params;
  const { users, content } = await request.json();
  // find if chat exists

  try {
    const [senderProfile, receiverProfile] = await Promise.all([
      User.findById(users.senderId),
      User.findById(users.receiverId),
    ]);

    if (!senderProfile || !receiverProfile) {
      return ApiResponse("User does not exists", 400);
    }

    const selectedChat = await Chat.findById(chatId);

    if (!selectedChat) return ApiResponse("Chat doesnot exists", 402);

    // Create new instance of Message
    const message = await ChatMessage.create({
      sender: users.senderId,
      content: content,
      chat: chatId,
    });

    // Update last message in Chat
    const chat = await Chat.findByIdAndUpdate(
      chatId,
      {
        $set: {
          lastMessage: message._id,
        },
      },
      { new: true }
    );

    // Structured messages
    const messages = await ChatMessage.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(message._id),
        },
      },
      {
        $lookup: {
          from: "users",
          foreignField: "_id",
          localField: "sender",
          as: "sender",
          pipeline: [
            {
              $project: {
                avatar: 1,
                email: 1,
              },
            },
          ],
        },
      },
      {
        $addFields: {
          sender: { $first: "$sender" },
        },
      },
    ]);

    const receivedMessage = messages[0];

    chat.participants.forEach((participantObjectId) => {
      if (participantObjectId.toString() === req.user._id.toString()) return;

      // emit the receive message event to the other participants with received message as the payload
      emitSocketEvent(
        req,
        participantObjectId.toString(),
        ChatEventEnum.MESSAGE_RECEIVED_EVENT,
        receivedMessage
      );
    });
  } catch (error) {
    return ApiResponse("Something went wrong", 500);
  }
}
