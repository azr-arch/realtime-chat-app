import { Schema, models, model } from "mongoose";

const chatMessageSchema = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        content: {
            type: String,
        },
        chat: {
            type: Schema.Types.ObjectId,
            ref: "Chat",
        },
        status: {
            type: String,
        },
        document: {
            type: String,
        },
    },
    { timestamps: true }
);

const ChatMessage = models.ChatMessage || model("ChatMessage", chatMessageSchema);

export default ChatMessage;
