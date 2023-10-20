"use client";

import { signOut } from "next-auth/react";

const page = () => {
    return (
        <div className="w-full h-full self-stretch flex items-center justify-center">
            <button
                onClick={() => signOut({ redirect: "/" })}
                className="bg-orange text-black_accent_2 rounded-md px-5 py-2"
            >
                Logout
            </button>
        </div>
    );
};

export default page;
