import { useChat } from "@context/ChatContext";

const ChatList = ({ chats, session, contacts, getChat, loading }) => {
    const { currentChat, handleSetCurrChat, loading: currChatLoading } = useChat();

    function getReceiver(item) {
        const receiver = item.filter((itm) => itm.email !== session.user.email);
        return receiver[0];
    }

    function ListItem({ receiver, chat }) {
        return (
            <div
                data-disable={currChatLoading} // True or False --> style to look as disable element
                className={`flex hover:bg-on_white_gray_2 
                            transition-colors ease-in duration-150 
                            ${
                                currentChat && currentChat._id === chat?._id
                                    ? "bg-on_white_gray_2"
                                    : ""
                            }
                            items-center gap-3 py-3 px-5 relative self-stretch 
                            w-full text-black cursor-pointer  rounded-md`}
                onClick={() => {
                    if (currentChat && currentChat._id === chat?._id) return;
                    handleSetCurrChat(chat);
                }}
            >
                <img src={receiver?.avatar} width={40} height={40} className="rounded-full" />

                <div className="flex flex-col items-start gap-[3px]">
                    <p className="text-sm text-black_accent_2 font-medium">{receiver?.name}</p>
                    <p className="text-on_white_gray text-xs font-medium">
                        {chat?.lastMessage?.content}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            id="chat-list"
            className="self-stretch w-full grow flex flex-col items-start  md:max-w-contact bg-secondary_bg p-3 gap-3 shadow-md"
        >
            <span className="text-xs text-on_white_gray">All</span>

            {/* TODO: Separate Chat list and Contact List */}
            {chats?.length > 0 ? (
                chats.map((chat, idx) => {
                    const receiver = getReceiver(chat?.participants);
                    return <ListItem key={idx} receiver={receiver} chat={chat} />;
                })
            ) : (
                <p className="text-on_white_gray">No Chats</p>
            )}

            {/* Contact List  */}

            <p className="font-medium text-lg mt-4 hidden md:block">Contacts</p>
            {contacts.length > 0 &&
                contacts.map((contact, idx) => {
                    return (
                        <div
                            key={idx}
                            onClick={() => getChat(contact?._id)}
                            className="hidden md:flex items-center gap-2 py-3 px-5 relative self-stretch w-full text-black cursor-pointer  rounded-md"
                        >
                            <img
                                src={contact?.avatar}
                                width={40}
                                height={40}
                                className="rounded-full"
                            />

                            <div className="flex flex-col items-start gap-[3px]">
                                <p className="text-sm text-black_accent_2 font-medium">
                                    {contact?.name}
                                </p>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

export default ChatList;
