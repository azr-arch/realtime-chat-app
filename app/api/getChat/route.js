import Chat from "@models/chat";
import User from "@models/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request) {
    const { user } = await getServerSession();
    try {
        if (!user) {
            return new NextResponse("Unauthenticated");
        }
        const { receiverId } = await request.json();
        const currUserId = await User.findOne({ email: user.email }).select("_id");

        const chat = await Chat.findOne({
            participants: {
                $all: [currUserId, receiverId],
            },
        });

        // If chat exists
        if (chat) {
            const chatDetails = await getChatDetails(chat);
            return NextResponse.json({ data: chatDetails }, { status: 200 });
        }

        // Else Create a new instance
        const newChatInstance = await Chat.create({
            participants: [currUserId, receiverId],
        });

        const chatDetails = await getChatDetails(newChatInstance);
        return NextResponse.json({ data: chatDetails }, { status: 200 });
    } catch (error) {
        console.log("[GET_CHAT]", error);
        return new NextResponse(error);
    }
}

async function getChatDetails(chat) {
    return await Chat.aggregate([
        { $match: { _id: chat._id } },
        { $sort: { updatedAt: -1 } },
        {
            $lookup: {
                from: "users",
                foreignField: "_id",
                localField: "participants",
                as: "participants",
                pipeline: [
                    {
                        $project: {
                            password: 0,
                            contacts: 0,
                            updatedAt: 0,
                            createdAt: 0,
                        },
                    },
                ],
            },
        },
        {
            $lookup: {
                from: "chatmessages",
                foreignField: "_id",
                localField: "lastMessage",
                as: "lastMessage",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            foreignField: "_id",
                            localField: "sender",
                            as: "sender",
                            pipeline: [
                                {
                                    $project: {
                                        name: 1,
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
                ],
            },
        },
        {
            $addFields: {
                lastMessage: { $first: "$lastMessage" },
            },
        },
    ]);
}
