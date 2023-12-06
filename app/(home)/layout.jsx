import Navbar from "@components/Navbar";
import { ChatProvider } from "@context/ChatContext";
import { WebRTC } from "@context/webrtc-provider";

export default function ChatLayout({ children }) {
    return (
        <ChatProvider>
            {/* <WebRTC> */}
            <section className="h-full max-h-[1200px] flex items-center w-full max-w-screen-2xl self-stretch mx-auto gap-2">
                <Navbar />
                {children}
            </section>
            {/* </WebRTC> */}
        </ChatProvider>
    );
}
