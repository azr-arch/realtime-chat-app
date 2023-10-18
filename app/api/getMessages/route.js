import Chat from "@models/chat";
import ChatMessage from "@models/message";
import { ApiResponse } from "@utils";
import mongoose from "mongoose";

export async function POST(request) {
  try {
    // Shift to using params, incase wanna include POST request and GET Request
    const { chatId } = await request.json();

    const selectedChat = await Chat.findById(chatId);

    if (!selectedChat) {
      return ApiResponse("No chat exists", 404);
    }
    // Add a route for checking wether user is a part of or not

    const messages = await ChatMessage.aggregate([
      {
        $match: {
          chat: new mongoose.Types.ObjectId(chatId),
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

    return ApiResponse(messages, 201);
  } catch (error) {
    return ApiResponse(
      error.message || "something went wrong",
      error.statusCode || 503
    );
  }
}
