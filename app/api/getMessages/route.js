import Chat from "@models/chat";
import ChatMessage from "@models/message";
import { ApiResponse } from "@utils";

export async function POST(request) {
  try {
    // Shift to using params, incase wanna include POST request and GET Request
    const { chatId } = await request.json();

    const selectedChat = await Chat.findById(chatId);

    if (!selectedChat) {
      ApiResponse("No chat exists", 404);
    }
    // Add a route for checking wether use is a part of or not
    const messages = await ChatMessage.find({ chat: chatId }).sort({
      createdAt: -1,
    });
    return ApiResponse(messages, 201);
  } catch (error) {
    return ApiResponse("Something went wrong while fetching messages", 500);
  }
}
