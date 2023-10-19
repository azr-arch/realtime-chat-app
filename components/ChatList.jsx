import { useChat } from "@context/ChatContext";

const ChatList = ({ chats, session }) => {
    const { setCurrentChat } = useChat();

    function getReceiver(item) {
        const receiver = item.filter((itm) => itm.email !== session.user.email);
        return receiver[0];
    }

    return (
        <div
            id="chat-list"
            className="self-stretch w-full grow flex flex-col items-start max-w-contact bg-secondary_bg p-3 gap-3 shadow-sm"
        >
            <span className="text-xs text-on_white_gray">All</span>
            {chats?.length > 0 ? (
                chats.map((chat, idx) => {
                    const receiver = getReceiver(chat?.participants);

                    return (
                        <div
                            key={idx}
                            className="flex items-center gap-3 py-3 px-5 relative self-stretch w-full text-black cursor-pointer  rounded-md"
                            onClick={() => setCurrentChat(chat)}
                        >
                            <img
                                src={receiver?.avatar}
                                width={40}
                                height={40}
                                className="rounded-full"
                            />

                            <div className="flex flex-col items-start gap-[3px]">
                                <p className="text-sm text-black_accent_2 font-medium">
                                    {receiver?.name}
                                </p>
                                <p className="text-on_white_gray text-xs font-medium">
                                    {chat?.lastMessage?.content}
                                </p>
                            </div>
                        </div>
                    );
                })
            ) : (
                <p className="text-on_white_gray">No Chats</p>
            )}
        </div>
    );
};

export default ChatList;
