"use client";

import Link from "next/link";
import Image from "next/image";

import chatIcon from "@styles/assets/chat.svg";
import profileIcon from "@styles/assets/profile.svg";

import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathname = usePathname();

    return (
        <nav className="flex flex-col items-center justify-between py-8 px-4 bg-nav_bg h-full rounded-md">
            <Link
                href={"/chat"}
                className={`p-3 rounded-full ${
                    pathname === "/chat" ? "bg-orange" : "bg-transparent"
                }`}
            >
                <Image src={chatIcon} alt="chat-icon" width={20} height={20} />
            </Link>

            <Link
                href={"/chat/profile"}
                className={`p-4 rounded-full ${
                    pathname === "/chat/profile" ? "bg-orange" : "bg-transparent"
                }`}
            >
                <Image src={profileIcon} alt="profile-icon" width={30} height={30} />
            </Link>
        </nav>
    );
};

export default Navbar;
