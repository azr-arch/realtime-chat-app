"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Menu, MessageSquare, User } from "lucide-react";
import { Sheet, SheetContent } from "./ui/sheet";
import { useMobileMenu } from "@hooks/use-mobile-menu";
import Link from "next/link";
import { cn } from "@lib/utils";

export const MobileMenu = () => {
    const [isMounted, setIsMounted] = useState(false);
    const pathname = usePathname();

    const { isOpen, onOpen, onClose } = useMobileMenu();

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

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        onClose();
    }, [pathname, onClose]);

    if (!isMounted) return null;

    return (
        <>
            <Button
                onClick={onOpen}
                className="block md:hidden absolute top-[3.9rem] left-10 z-50 text-white"
                variant="ghost"
                size="md"
            >
                <Menu className="w-5 h-5" />
            </Button>
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent side="left" className="p-2 pt-10">
                    <div className="flex flex-col items-start mt-8">
                        {routes.map((route) => {
                            return (
                                <Link
                                    href={route.href}
                                    key={route.href}
                                    className={cn(
                                        `transition-colors p-3 rounded-full font-medium`,
                                        route.active ? "text-orange" : "text-black_accent_2"
                                    )}
                                >
                                    {route.labelText}
                                </Link>
                            );
                        })}
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
};
