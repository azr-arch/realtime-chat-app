import { Server as ServerIO } from "socket.io";
import { RECEIVE_MSG_EVENT, TYPING_EVENT } from "@lib/socket-events";

import { connectToDB } from "@lib/db";
import ChatMessage from "@models/message";
import Chat from "@models/chat";
import mongoose from "mongoose";

export const config = {
    api: {
        bodyParser: false,
    },
};

const SocketHandler = (req, res) => {
    if (res.socket.server.io) {
        console.log("Socket is already running...");
    } else {
        console.log("Socket is initializing...");

        const io = new ServerIO(res.socket.server, {
            path: "/api/socket/io",
            pingTimeout: 60000, // 60 seconds
        });
        res.socket.server.io = io;

        io.on("connection", (socket) => {
            console.log("a client connected", socket.id);

            socket.on("test", (data) => {
                console.log("got client event test with: ", data);
            });

            socket.on("JOIN", ({ data }) => {
                console.log("SOCKET JOINED: ", data._id);
                socket.join(data?._id);
                console.log(`socket id: ${socket.id} has rooms:`, socket.rooms);
                socket.broadcast.to(data?._id).emit("newjoin", data);
            });

            socket.on("SEND_MESSAGE", async ({ chatId, users, content, status }, returnMsg) => {
                const [receiveMessage, chat] = await handleMessage(chatId, users, content, status);

                returnMsg(receiveMessage);
                socket.broadcast.to(chat?.id).emit(RECEIVE_MSG_EVENT, receiveMessage);
            });

            // socket.on("TYPING", ({ chat, isTyping }) => {
            //     console.log(`SERVER] typing status:${isTyping}, BROADCASTING TO ${chat._id}`);
            //     socket.broadcast.to(chat?._id).emit("TYPING", { chat, isTyping });
            // });
            socket.on(TYPING_EVENT, ({ chat, isTyping }) => {
                socket.broadcast.to(chat?._id).emit(TYPING_EVENT, { isTyping });
            });

            socket.on("SEEN_MESSAGE", async ({ messageId, chatId }) => {
                console.log("SEEN MESSAGE EVENT SERVER: ", messageId, chatId);
                const updatedMsg = await updateMessageStatus(messageId);
                console.log("updatedMSg: ", updatedMsg);
                socket.broadcast.to(chatId).emit("SEEN_MESSAGE_UPDATE", { updatedMsg });
            });
        });
    }

    res.end();
};

const updateMessageStatus = async (msgId) => {
    try {
        await connectToDB();
        return await ChatMessage.findByIdAndUpdate(
            msgId,
            { status: "seen" },
            { new: true }
        ).populate({
            path: "sender",
            select: "avatar email name _id",
        });
    } catch (error) {
        console.log("error while updating seen", error);
    }
};

const handleMessage = async (chatId, users, content, status) => {
    try {
        await connectToDB();
        const selectedChat = await Chat.findById(chatId);

        if (!selectedChat) throw new Error("Chat doesnt exists");

        // Create new instance of Message
        const message = await ChatMessage.create({
            sender: users.senderId,
            content: content,
            chat: chatId,
            status: "sent",
        });

        const [chat, messages] = await Promise.all([
            lastMessageUpdate(chatId, message._id),
            chatAggregate(message._id),
        ]);
        return [messages[0], chat];
    } catch (error) {
        throw new Error(error);
    }
};

async function lastMessageUpdate(chatId, messageId) {
    return await Chat.findByIdAndUpdate(
        chatId,
        {
            $set: {
                lastMessage: messageId,
            },
        },
        { new: true }
    );
}

async function chatAggregate(messageId) {
    return await ChatMessage.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(messageId),
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
}

export default SocketHandler;
