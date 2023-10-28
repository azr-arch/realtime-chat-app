import Chat from "@models/chat";
import ChatMessage from "@models/message";
import User from "@models/user";
import { ApiResponse } from "@utils";
import { getServerSession } from "next-auth";

export async function POST(request) {
    const { user } = await getServerSession();
    try {
        const { receiverId } = await request.json();
        const currUserId = await User.findOne({ email: user.email }).select("_id");

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
