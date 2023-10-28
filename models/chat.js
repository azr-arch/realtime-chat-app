import { Schema, models, model } from "mongoose";

const chatSchema = new Schema(
    {
        lastMessage: {
            type: Schema.Types.ObjectId,
            ref: "ChatMessage",
        },
        participants: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        unread: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

const Chat = models.Chat || model("Chat", chatSchema);
export default Chat;
