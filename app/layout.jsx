import "./globals.css";
import Provider from "@components/Provider";
import GlobalProvider from "@context/GlobalContext";
import { SocketProvider } from "@context/SocketContext";
import { ChatProvider } from "@context/ChatContext";
import { ToasterProvider } from "@providers/toast-provider";
import SocketIndicator from "@components/SocketIndicator";

export const metadata = {
    title: "Chat",
    description: "Chat",
};

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body className="min-h-screen bg-main transition-colors duration-150 ease-linear">
                <Provider>
                    <GlobalProvider>
                        <SocketProvider>
                            <ChatProvider>
                                <ToasterProvider />
                                <SocketIndicator />
                                <main className="relative h-screen flex-center p-8 bg-primary_bg">
                                    {children}
                                </main>
                            </ChatProvider>
                        </SocketProvider>
                    </GlobalProvider>
                </Provider>
            </body>
        </html>
    );
};

export default RootLayout;
