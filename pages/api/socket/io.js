import { Server as ServerIO } from "socket.io";
import { TYPING_EVENT } from "@lib/socket-events";

import ChatMessage from "@models/message";
import { connectToDB } from "@lib/db";

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
            pingTimeout: 6000000, // 60 seconds
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

            socket.on("SENDMESSAGE", ({ chat }) => {
                console.log("Send message event: ", chat);
            });

            // socket.on("TYPING", ({ chat, isTyping }) => {
            //     console.log(`SERVER] typing status:${isTyping}, BROADCASTING TO ${chat._id}`);
            //     socket.broadcast.to(chat?._id).emit("TYPING", { chat, isTyping });
            // });
            socket.on(TYPING_EVENT, ({ chat, isTyping }) => {
                socket.broadcast.to(chat?._id).emit(TYPING_EVENT, { isTyping });
            });

            socket.on("SEEN_MESSAGE", async ({ messageId, chatId }) => {
                console.log("SEEN MESSAGE EVENT SERVER", messageId, chatId);
                const updatedMsg = await updateMessageStatus(messageId);
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
            { returnDocument: "after" }
        );
    } catch (error) {
        console.log("error while updating seen", error);
    }
};

export default SocketHandler;
