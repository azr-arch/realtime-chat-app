import ChatMessage from "@models/message";
import User from "@models/user";
import Chat from "@models/chat";
import mongoose from "mongoose";

const SEND_MSG_EVENT = "send-message";
const RECEIVE_MSG_EVENT = "receive-message";

// Reponsible for Sending messages

export default async function handler(req, res) {
    const { chatId } = req.query;
    const { users, content } = JSON.parse(req.body);

    try {
        // find if chat exists
        const selectedChat = await Chat.findById(chatId);

        if (!selectedChat)
            return res.status(402).json({ message: " Chat doesnt exists", error: true });

        // Create new instance of Message
        const message = await ChatMessage.create({
            sender: users.senderId,
            content: content,
            chat: chatId,
            status: "sent",
        });

        // Update last message in Chat
        const chat = await Chat.findByIdAndUpdate(
            chatId,
            {
                $set: {
                    lastMessage: message._id,
                },
                $inc: {
                    unreadCount: 1,
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
                                name: 1,
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

        let receivedMessage = messages[0];

        chat.participants.forEach((participantObjectId) => {
            if (participantObjectId.toString() === users.senderId) return;

            // emit the receive message event to the other participants with received message as the payload
            res?.socket?.server?.io?.emit(RECEIVE_MSG_EVENT, receivedMessage);
            return res.status(200).json(receivedMessage);
        });
    } catch (error) {
        console.log("[SOCKET_MESSAGE]: ", error);
        return res.status(500).json({ message: "Internal Error" || error.message });
    }
}
