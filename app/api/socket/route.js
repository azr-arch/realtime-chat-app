import { Server } from "socket.io";

// const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export default async function handler(req, res) {
  if (!res.socket.server.io) {
    console.log("New Socket.IO server");
    const io = new Server(res.socket.server, {
      path: "/api/socket",
    });

    io.on("connection", (socket) => {
      console.log("Client connected", socket.id);
      // Handle socket events here
    });

    res.socket.server.io = io;
  } else {
    console.log("Socket.IO is already running");
  }
  console.log("from socketroute: ", res);

  res.end();
}
