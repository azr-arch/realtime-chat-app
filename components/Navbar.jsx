"use client";

import Link from "next/link";
import Image from "next/image";

import chatIcon from "@styles/assets/chat.svg";
import profileIcon from "@styles/assets/profile.svg";

import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathname = usePathname();

    return (
        <nav className="flex  min-w-[70px] max-w-[75px] flex-col items-center justify-between py-8 px-4 bg-nav_bg h-full rounded-md shadow-sm">
            <Link
                href={"/chat"}
                className={`p-3 rounded-full ${
                    pathname === "/chat" ? "bg-orange" : "bg-transparent"
                }`}
            >
                <Image src={chatIcon} alt="chat-icon" width={50} height={50} />
            </Link>

            <Link
                href={"/chat/profile"}
                className={`p-3  rounded-full ${
                    pathname === "/chat/profile" ? "bg-orange" : "bg-transparent"
                }`}
            >
                <Image src={profileIcon} alt="profile-icon" width={50} height={50} />
            </Link>
        </nav>
    );
};

export default Navbar;
