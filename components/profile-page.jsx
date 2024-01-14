"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { Button } from "./ui/button";
import ImageUpload from "./ui/image-upload";

import Image from "next/image";
import { toast } from "react-hot-toast";

const ProfilePage = ({ data }) => {
    const [avatar, setAvatar] = useState(data?.avatar);

    const upload = async (result) => {
        try {
            setAvatar(result?.info.secure_url);
            await fetch("/api/updateProfile", {
                method: "POST",
                body: JSON.stringify({ imageUrl: result?.info?.secure_url }),
            });

            toast.success("Image uploaded successfully.");
        } catch (error) {
            console.log(error);
            toast.error("Somthing went wrong.");
            setAvatar(data?.avatar);
        }
    };

    const handleLogout = () => {
        localStorage.clear();

        signOut({ callbackUrl: "/" });
    };

    return (
        <div className="flex flex-col items-center space-y-2 ">
            {/* Image  */}
            <div className="relative w-[150px] h-[150px] bg-pink-200 rounded-full overflow-hidden">
                <Image
                    className="object-cover object-center aspect-square bg-orange"
                    width={150}
                    height={150}
                    alt="user-profile"
                    src={avatar}
                />
            </div>

            {/* TODO: Hide this in image and Appear when Click on image */}
            <ImageUpload onUpload={upload} />

            <p className="text-heading font-semibold text-lg">{data?.name}</p>
            <p className="text-neutral-500">{data?.email}</p>

            <Button
                className="font-semibold mt-4 text-accent_1 hover:bg-zinc-300 ring ring-orange"
                onClick={handleLogout}
            >
                Logout
            </Button>
        </div>
    );
};

export default React.memo(ProfilePage);
