import Contacts from "@components/contact/Contacts";
import ChatContainer from "@components/chat/ChatContainer";

const ChatPage = async () => {
    return (
        <>
            <div className="w-full h-full self-stretch items-start flex flex-col md:flex-row gap-4  md:gap-2">
                <Contacts />
                <ChatContainer />
            </div>
        </>
    );
};

export default ChatPage;
