import Navbar from "@components/Navbar";

export default function ChatLayout({ children }) {
    return (
        <section className="flex items-center w-full self-stretch  gap-2">
            <Navbar />
            {children}
        </section>
    );
}
