import Chat from "@models/chat";
import { SelectedChatHeader } from "./_components/chat-header";

const SelectedChatLayout = async ({ children, params }) => {
    const selectedChat = await Chat.findOne({ id: params.chatId });

    return (
        <div className="w-full min-w-[342px] h-full self-stretch flex flex-col items-start gap-2">
            <SelectedChatHeader data={selectedChat} />
            {children}
        </div>
    );
};

export default SelectedChatLayout;
