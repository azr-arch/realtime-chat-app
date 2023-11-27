"use client";

import Register from "@components/Register";
import Login from "@components/Login";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { DownloadCloud } from "lucide-react";

const Page = () => {
    const [isLoginPage, setIsLoginPage] = useState(true);
    const router = useRouter();
    const { status } = useSession();
    console.log(status);
    useEffect(() => {
        if (status === "authenticated") {
            router.replace("/chat");
        }
    }, [status, router]);

    if (status === "loading") {
        return <h1 className="text-text">Please wait...</h1>;
    }

    return (
        <div className="relative overflow-hidden rounded-3xl">
            {isLoginPage ? (
                <Login setIsLoginPage={setIsLoginPage} />
            ) : (
                <Register setIsLoginPage={setIsLoginPage} />
            )}
        </div>
    );
};

export default Page;
