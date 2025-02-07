export const dynamic = "force-dynamic";

import "./globals.css";
import Provider from "@providers/Provider";
import { SocketProvider } from "@context/SocketContext";
import { ToasterProvider } from "@providers/toast-provider";
import SocketIndicator from "@components/SocketIndicator";

import localFont from "next/font/local";
import { EdgeStoreProvider } from "@lib/edgestore";
import { siteConfig } from "@config/site";
import { FreeTierNotice } from "@components/free-tier-notice";

export const metadata = {
    title: {
        default: siteConfig.name,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: [
        {
            url: "/logo.svg",
            href: "/logo.svg",
        },
    ],
};

const font = localFont({
    src: "../public/fonts/charlie-display-3.ttf",
});

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body
                className={`min-h-screen transition-colors duration-150 ease-linear ${font.className}}`}
            >
                <EdgeStoreProvider>
                    <Provider>
                        <SocketProvider>
                            <ToasterProvider />
                            <SocketIndicator />

                            {/* This is just to showcase that project is hosted on free tiers and may take time to wake up */}
                            <FreeTierNotice />

                            <main className="relative h-screen flex-center py-8 px-4 md:p-8 bg-main">
                                {children}
                            </main>
                        </SocketProvider>
                    </Provider>
                </EdgeStoreProvider>
            </body>
        </html>
    );
};

export default RootLayout;
