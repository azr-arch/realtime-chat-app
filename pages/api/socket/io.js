import { Server as ServerIO } from "socket.io";
import { TYPING_EVENT } from "@lib/socket-events";

export const config = {
    api: {
        bodyParser: false,
    },
};

const ioHandler = (req, res) => {
    if (!res.socket.server.io) {
        const path = "/api/socket/io";
        const httpServer = res.socket.server;
        const io = new ServerIO(httpServer, {
            path: path,
            addTrailingSlash: false,
        });

        // io.on("connection", (socket) => {
        //     // Work in progress

        //     // socket.on("JOIN", (data) => {
        //     //     console.log("joined: ", data._id);
        //     //     socket.join(data._id);
        //     // });

        //     // socket.on(TYPING_EVENT, ({ chatId, isTyping }) => {
        //     //     console.log("typing event ", chatId, isTyping);
        //     //     socket.broadcast.emit("recieve", { chatId, isTyping });
        //     // });
        // });

        res.socket.server.io = io;
    }
    res.end();
};

export default ioHandler;
