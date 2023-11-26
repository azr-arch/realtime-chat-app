import Chat from "@models/chat";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req, { params }) {
    try {
        const { chatId } = params;
        if (!chatId) {
            return new NextResponse("Invalid");
        }

        // Reset the unread of chat to 0
        const updatedChat = await Chat.findByIdAndUpdate(
            chatId,
            {
                $set: {
                    unread: 0,
                },
            },
            { new: true }
        ); // new: true returns the updated documnet

        if (!updatedChat) {
            return new NextResponse("Not Found");
        }

        const populatedChat = await Chat.findById(updatedChat._id)
            .populate({
                path: "participants",
                select: "name avatar email _id",
            })
            .populate({
                path: "lastMessage",
                populate: {
                    path: "sender",
                    select: "name avatar email _id",
                },
            });

        return NextResponse.json({ chat: populatedChat }, { status: 200 });
    } catch (error) {
        console.log("[RESET_UNREAD]", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
