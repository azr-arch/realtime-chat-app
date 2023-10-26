"use client";

import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import ImageUpload from "./ui/image-upload";

import Image from "next/image";
import { POST } from "@app/api/addContact/route";
import { toast } from "react-hot-toast";
import { getData } from "@lib/utils";

const ProfilePage = ({}) => {
    const [avatar, setAvatar] = useState("");

    // const getData = async () => {
    //     const res = await fetch("api/getCurrentUser");
    //     console.log(res);
    //     return { name: "xyz", value: "onetwothree" };
    // };

    // useEffect(() => {
    //     if (isMounted) {
    //         getData();
    //     }
    // }, []);

    const upload = async (result) => {
        try {
            setAvatar(result?.info.secure_url);

            await fetch("api/updateProfile", {
                method: POST,
                body: { imageUrl: result?.info?.secure_url },
            });
            toast.success("Image uploaded successfully.");
        } catch (error) {
            console.log(error);
            toast.error("Somthing went wron.");
        }
    };

    // Prevents hydration error

    return (
        <div className="flex flex-col items-start space-y-2">
            {/* Image  */}
            <div className="relative w-[150px] h-[150px] bg-pink-200 rounded-full overflow-hidden">
                <Image
                    className="object-cover aspect-square bg-orange"
                    width={150}
                    height={150}
                    alt="user-profile"
                    src={avatar}
                />
            </div>
            <ImageUpload onUpload={upload} />

            <p className="text-black_accent_2 font-semibold text-lg">{data?.name}</p>
            <p className="text-neutral-500">{data?.email}</p>

            <Button className="font-semibold mt-4" onClick={() => signOut({ callbackUrl: "/" })}>
                Logout
            </Button>
        </div>
    );
};

export default ProfilePage;
