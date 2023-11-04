import "./globals.css";
import Provider from "@providers/Provider";
import { SocketProvider } from "@context/SocketContext";
import { ChatProvider } from "@context/ChatContext";
import { ToasterProvider } from "@providers/toast-provider";
import SocketIndicator from "@components/SocketIndicator";

import { Inter } from "next/font/google";

export const metadata = {
    title: "Chat",
    description: "Chat",
};

const inter = Inter({ weight: ["400", "500", "600", "700"], subsets: ["latin"] });

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body
                className={`min-h-screen transition-colors duration-150 ease-linear ${inter.className}}`}
            >
                <SocketProvider>
                    <Provider>
                        <ChatProvider>
                            <ToasterProvider />
                            <SocketIndicator />
                            <main className="relative h-screen flex-center py-8 px-4 md:p-8 bg-main">
                                {children}
                            </main>
                        </ChatProvider>
                    </Provider>
                </SocketProvider>
            </body>
        </html>
    );
};

export default RootLayout;
