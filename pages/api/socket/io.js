import { Server as ServerIO } from "socket.io";

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
        //     // socket.on(TYPING_EVENT, ({chat, isTyping}) => {
        //     //     socket.to(chatId)
        //     // })

        //     // socket.on("JOIN_EVENT", ({ chatId }) => {
        //     //     console.log("join event ", chatId);
        //     //     socket.join(chatId);
        //     // });

        //     socket.on("JOIN", (data) => {
        //         console.log("joined: ", data._id);
        //         socket.join(data._id);
        //     });

        //     socket.on(TYPING_EVENT, ({ chatId, isTyping }) => {
        //         console.log("typing event ", chatId, isTyping);
        //         socket.broadcast.to(chatId).emit(TYPING_EVENT, isTyping);
        //     });
        // });

        res.socket.server.io = io;
    }
    res.end();
};

export default ioHandler;
