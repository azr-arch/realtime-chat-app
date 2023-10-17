import "@styles/globals.css";
import Provider from "@components/Provider";
import GlobalProvider from "@context/GlobalContext";
import ThemeProvider from "@context/ThemeContext";
import { SocketProvider } from "@context/SocketContext";
import { ChatProvider } from "@context/ChatContext";
import Chat from "@models/chat";

export const metadata = {
  title: "Auth",
  description: "Devchallenges Challenge",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="min-h-screen bg-main transition-colors duration-150 ease-linear">
        <Provider>
          <GlobalProvider>
            <SocketProvider>
              <ChatProvider>
                <ThemeProvider>
                  <main className="relative min-h-screen flex-center">
                    {children}
                  </main>
                </ThemeProvider>
              </ChatProvider>
            </SocketProvider>
          </GlobalProvider>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
