import Chat from "@models/chat";

export default async function handler(req, res) {
    const { chatId } = req.query;
    try {
        const chat = await Chat.findById(chatId);
        chat.unreadCount = 0;
        await chat.save();
        return res.status(201).json(chat);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Error" || error.message });
    }
}
