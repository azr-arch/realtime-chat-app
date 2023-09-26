import "@styles/globals.css";
import Provider from "@components/Provider";
import GlobalProvider from "@context/GlobalContext";

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
            <main className="relative min-h-screen flex-center">
              {children}
            </main>
          </GlobalProvider>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
