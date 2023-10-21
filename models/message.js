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
        seen: {
            type: Schema.Types.Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const ChatMessage = models.ChatMessage || model("ChatMessage", chatMessageSchema);

export default ChatMessage;
