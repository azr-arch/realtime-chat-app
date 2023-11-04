"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import { Cross, Menu, MessageSquare, User, X } from "lucide-react";
import { cn } from "@lib/utils";
import SocketIndicator from "./SocketIndicator";
import { useState } from "react";

const Navbar = () => {
    const pathname = usePathname();

    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const routes = [
        {
            href: "/chat",
            label: <MessageSquare className="h-6 w-6 text-inherit" />,
            labelText: "Chat",
            active: pathname === `/chat`,
        },
        {
            href: "/chat/profile",
            label: <User className="h-10 w-10 p-[10px] rounded-full  text-inherit bg-profile_bg" />,
            labelText: "Account",
            active: pathname === "/chat/profile",
        },
    ];

    const toggleNav = () => {
        setMobileNavOpen((prev) => !prev);
    };

    return (
        <>
            <nav className="hidden sm:flex  min-w-[70px] max-w-[75px] flex-col items-center justify-between py-8 px-4 bg-nav_bg h-full rounded-2xl shadow-sm">
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

            {/* Mobile Nav  */}
            <div
                className="block sm:hidden absolute top-[4rem] left-10 z-50 cursor-pointer"
                onClick={toggleNav}
            >
                <Menu className="w-5 h-5" />
            </div>
            <nav
                aria-expanded={mobileNavOpen}
                className={cn(
                    "flex flex-col items-start pt-[3.7rem] pl-10 sm:hidden transition transform fixed inset-0 w-full h-full  z-50 bg-black/90",
                    mobileNavOpen ? "-translate-x-0" : "-translate-x-full"
                )}
            >
                <div
                    onClick={toggleNav}
                    className=" bg-orange text-accent_1 cursor-pointer p-1 rounded-md"
                >
                    <X className="w-5 h-5" />
                </div>

                <div className="flex flex-col items-start mt-8">
                    {routes.map((route) => {
                        return (
                            <Link
                                onClick={() => setMobileNavOpen(false)}
                                href={route.href}
                                key={route.href}
                                className={cn(
                                    `transition-colors p-3 rounded-full font-medium`,
                                    route.active ? "text-orange" : "text-text_on_navbg"
                                )}
                            >
                                {route.labelText}
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </>
    );
};

export default Navbar;
