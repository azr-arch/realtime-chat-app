import ChatMessage from "@models/message";

export async function updateSeenStatus(msgId) {
    try {
        const message = await ChatMessage.findById(msgId);
        console.log("message from update: ", message);
        if (!message) {
            throw new Error("Message do not exists");
        }

        message.seen = true;
        return await message.save();
    } catch (error) {
        console.log(error);
        throw error;
    }
}
