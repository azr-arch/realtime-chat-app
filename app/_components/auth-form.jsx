"use client";

import Register from "@components/Register";
import Login from "@components/Login";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const AuthForm = () => {
    const [formVariant, setFormVariant] = useState("LOGIN");

    const session = useSession();
    const router = useRouter();

    const toggleForm = useCallback(() => {
        if (formVariant === "LOGIN") {
            setFormVariant("REGISTER");
        } else {
            setFormVariant("LOGIN");
        }
    }, [formVariant]);

    useEffect(() => {
        if (session.status === "authenticated") {
            router.push("/chat");
        }
    }, [session.status, router]);

    return (
        <>
            {formVariant === "LOGIN" ? <Login /> : <Register />}
            <p className="text-sm text-accent_1 text-center leading-normal text-l-gray mt-8">
                {formVariant === "LOGIN" ? "Don`t have an account yet?" : "Already a member?"}
                <button onClick={toggleForm} className="text-orange ml-2">
                    {formVariant === "LOGIN" ? "register" : "login"}
                </button>
            </p>
        </>
    );
};
