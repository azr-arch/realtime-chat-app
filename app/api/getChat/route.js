import Chat from "@models/chat";
import ChatMessage from "@models/message";
import { ApiResponse } from "@utils";

export async function POST(request) {
  try {
    const { currUserId, receiverId } = await request.json();

    const chat = await Chat.findOne({
      participants: {
        $all: [currUserId, receiverId],
      },
    });

    // If chat exists
    if (chat) {
      return ApiResponse(chat, 200);
    }

    // Else Create a new instance
    const newChatInstance = await Chat.create({
      participants: [currUserId, receiverId],
    });

    return ApiResponse(newChatInstance, 201);
  } catch (error) {
    return ApiResponse("bad", 500);
  }
}
