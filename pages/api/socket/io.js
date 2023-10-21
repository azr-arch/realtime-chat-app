import { Server } from "http";
import { NextApiResponse } from "next";
import { Server as ServerIO } from "socket.io";
import { updateSeenStatus } from "@utils/messageUtils";

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

        io.on("connection", (socket) => {
            socket.on("MESSAGE_SEEN", async ({ messageId }) => {
                console.log("got message seen event");
                // Update the seen field in Databse
                const newMsg = await updateSeenStatus(messageId);

                // Send back the acknowledgement
                socket.emit("MESSAGE_SEEN_ACK", newMsg);
            });
        });

        res.socket.server.io = io;
    }
    res.end();
};

export default ioHandler;
