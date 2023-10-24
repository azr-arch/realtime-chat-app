import { SEND_MSG_EVENT } from "./socket-events";

// export async function updateSeenStatus(msgId) {
//     try {
//         const message = await ChatMessage.findById(msgId);
//         console.log("message from update: ", message);
//         if (!message) {
//             throw new Error("Message do not exists");
//         }

//         message.seen = true;
//         return await message.save();
//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// }

export default function useChatUtils(socket) {
    function sendMessage(msg) {
        return new Promise((resolve, reject) => {
            if (!socket.connected) {
                reject(null);
                return;
            }

            socket.timeout(30000).emit(SEND_MSG_EVENT, msg, (err, sentMessage) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(sentMessage);
            });
        });
    }

    // function deleteMessage({id, chatId}) {
    //     return new Promise((resolve, reject) => {
    //         if(!socket.connected) {
    //             reject(null)
    //             return
    //         }

    //         socket.emit(

    //         )
    //     })
    // }
    return {
        sendMessage,
    };
}
