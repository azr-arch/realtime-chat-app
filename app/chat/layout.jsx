import Navbar from "@components/Navbar";
import { ChatProvider } from "@context/ChatContext";
import { WebRTC } from "@context/webrtc-provider";

export default function ChatLayout({ children }) {
    return (
        <ChatProvider>
            {/* <WebRTC> */}
            <section className="h-full flex items-center w-full self-stretch  gap-2">
                <Navbar />
                {children}
            </section>
            {/* </WebRTC> */}
        </ChatProvider>
    );
}
