import Navbar from "@components/Navbar";
import { ChatProvider } from "@context/ChatContext";
import { PeerProvider } from "@context/peer";

export default function ChatLayout({ children }) {
    return (
        <ChatProvider>
            <PeerProvider>
                <section className="h-full flex items-center w-full self-stretch  gap-2">
                    <Navbar />
                    {children}
                </section>
            </PeerProvider>
        </ChatProvider>
    );
}
