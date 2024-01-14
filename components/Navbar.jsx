"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import { MessageSquare, UserIcon } from "lucide-react";
import { cn } from "@lib/utils";
import { MobileMenu } from "./mobile-menu";
import { Logo } from "./logo";

const Navbar = () => {
    const pathname = usePathname();
    const routes = [
        {
            href: "/chat/profile",
            label: <UserIcon className="h-6 w-6  " />,
            labelText: "Account",
            active: pathname === "/chat/profile",
        },
    ];

    return (
        <>
            <nav className="hidden md:flex  min-w-[70px] max-w-[70px] flex-col items-center justify-between py-8 px-4 bg-nav_bg h-full rounded-2xl shadow-sm">
                <Logo />
                {routes.map((route) => {
                    return (
                        <Link
                            href={route.href}
                            key={route.href}
                            className={cn(
                                `transition-colors p-3 rounded-full`,
                                route.active ? "text-white" : "text-text_on_navbg"
                            )}
                        >
                            {route.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Mobile Nav  */}
            <MobileMenu />
        </>
    );
};

export default Navbar;
