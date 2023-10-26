"use client";

import { useEffect, useState } from "react";
import { Button } from "./button";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { ImagePlusIcon, Trash } from "lucide-react";

const ImageUpload = ({ onUpload }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // const onUpload = (result) => {
    //     onChange(result.info.secure_url);
    // };

    if (!isMounted) return null;

    return (
        <div>
            {/* <div className="flex items-center gap-4">
                <div className="relative w-[200px] h-[200px] rounded-full overflow-hidden">
                    <div className="z-10 absolute top-2 right-2">
                        <Button type="button" onClick={() => onRemove(value)}>
                            <Trash className="w-4 h-4" />
                        </Button>
                    </div>
                    <Image fill className="object-cover" alt="profile" src={url} />
                </div>
            </div> */}
            <CldUploadWidget onUpload={onUpload} uploadPreset="wg0slw1v">
                {({ open }) => {
                    const onClick = () => {
                        open();
                    };

                    return (
                        <Button type="button" variant="secondary" onClick={onClick}>
                            <ImagePlusIcon className="w-4 h-4 mr-2" />
                            Upload an Image
                        </Button>
                    );
                }}
            </CldUploadWidget>
        </div>
    );
};

export default ImageUpload;
