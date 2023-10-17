import Chat from "@models/chat";
import User from "@models/user";
import { attachUser } from "@middleware";
import { ApiResponse } from "@utils";

export async function POST(request) {
  try {
    const { currUserId } = await request.json();

    const chats = await Chat.find({
      participants: currUserId,
    }).sort({ createdAt: -1 });

    return ApiResponse(chats, 200);
  } catch (error) {
    return ApiResponse("Somehitng went wrong", 500);
  }
}
