"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import { MessageSquare, User } from "lucide-react";
import { cn } from "@lib/utils";
import SocketIndicator from "./SocketIndicator";

const Navbar = () => {
    const pathname = usePathname();

    const routes = [
        {
            href: "/chat",
            label: <MessageSquare className="h-6 w-6 text-inherit" />,
            active: pathname === `/chat`,
        },
        {
            href: "/chat/profile",
            label: <User className="h-10 w-10 p-[10px] rounded-full  text-inherit bg-profile_bg" />,
            active: pathname === "/chat/profile",
        },
    ];

    return (
        <>
            <nav className="flex  min-w-[70px] max-w-[75px] flex-col items-center justify-between py-8 px-4 bg-nav_bg h-full rounded-2xl shadow-sm">
                {routes.map((route) => {
                    return (
                        <Link
                            href={route.href}
                            key={route.href}
                            className={cn(
                                `transition-colors p-3 rounded-full`,
                                route.active ? "text-orange" : "text-text_on_navbg"
                            )}
                        >
                            {route.label}
                        </Link>
                    );
                })}
            </nav>
        </>
    );
};

export default Navbar;
