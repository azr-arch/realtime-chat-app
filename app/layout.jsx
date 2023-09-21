import "@styles/globals.css";
import Provider from "@components/Provider";

export const metadata = {
  title: "Auth",
  description: "Devchallenges Challenge",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Provider>
          <main className="min-h-screen flex-center">{children}</main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
