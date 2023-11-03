import { Server as ServerIO } from "socket.io";
import { TYPING_EVENT } from "@lib/socket-events";

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
        });
    }

    res.end();
};

export default SocketHandler;
