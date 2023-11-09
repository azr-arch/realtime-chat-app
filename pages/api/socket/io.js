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

const socketToEmail = new Map();
const emailToSocket = new Map();

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

            // Event for Mapping socketid to email
            socket.on("REGISTER", ({ email }) => {
                // Remove the existing mapping if it exists
                if (emailToSocket.has(email)) {
                    socketToEmail.delete(emailToSocket[email]);
                }

                // Add the new mapping
                socketToEmail[socket.id] = email;
                emailToSocket[email] = socket.id;

                console.log("REGISTERED_USER: ", socketToEmail);
                console.log("EMAILTOSOCKETMAP: ", emailToSocket);
            });

            socket.on("test", (data) => {
                console.log("got client event test with: ", data);
            });

            socket.on("JOIN", ({ data }) => {
                // This can be improve, to provide the user not only in currentChat but globally
                // Current typing status like whatsapp

                // Currently leaving all the socket previously i was in
                // To fix the typing status event if not in currentChat i.e. room
                socket.rooms.forEach((room) => {
                    if (room !== socket.id && room !== data?.id) {
                        socket.leave(room);
                    }
                });

                socket.join(data?._id);
                console.log(`SOCKET ${socket.id} has rooms:`, socket.rooms);
                socket.broadcast.to(data?._id).emit("newjoin", data);
            });

            socket.on("SEND_MESSAGE", async ({ chatId, users, content, status }, returnMsg) => {
                const [receiveMessage, chat] = await handleMessage(chatId, users, content, status);

                returnMsg(receiveMessage);
                socket.broadcast.to(chat?.id).emit(RECEIVE_MSG_EVENT, receiveMessage);
                //  To enable realtime update on sender side, we have to change this
                // TODO: use user id room approach to send events for better security e.x. connected user id to socket, upon JOIN
                socket.broadcast.emit("CHAT_UPDATE", chat);
            });

            socket.on(TYPING_EVENT, ({ chat, isTyping }) => {
                socket.broadcast.to(chat?._id).emit(TYPING_EVENT, { isTyping });
            });

            socket.on("SEEN_MESSAGE", async ({ messageId, chatId }) => {
                console.log("SEEN MESSAGE EVENT SERVER: ", messageId, chatId);
                const updatedMsg = await updateMessageStatus(messageId);
                console.log("updatedMSg: ", updatedMsg);
                socket.broadcast.to(chatId).emit("SEEN_MESSAGE_UPDATE", { updatedMsg });
            });

            // When a user is initiating a call
            socket.on("OUTGOING_CALL", ({ sender, offer, receiver }) => {
                const personToCall = emailToSocket[receiver]; // Get socket id
                console.log("SENDIN CALL TO ", personToCall);
                io.to(personToCall).emit("INCOMING_CALL", { from: sender, offer });
                // }
            });

            // This just for helping transfer incoming call request info
            // socket.on("ACCEPT_INCOMING", ({ from, to }) => {
            //     const toId = emailToSocket[to];
            //     io.to(toId).emit("INCOMING_CALL_ACCEPT", { from });
            // });

            socket.on("CALL_ACCEPTED", ({ to, ans, from }) => {
                const toId = emailToSocket[to];
                io.to(toId).emit("CALL_ACCEPTED", { ans });
            });
        });
    }

    res.end();
};

const updateMessageStatus = async (msgId) => {
    try {
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
    // Also update the unread count
    return await Chat.findByIdAndUpdate(
        chatId,
        {
            $set: {
                lastMessage: messageId,
            },
            $inc: {
                unread: 1,
            },
        },
        { new: true }
    )
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
