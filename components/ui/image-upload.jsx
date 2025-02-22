"use client";

import { useEffect, useState } from "react";
import { Button } from "./button";
import { CldUploadWidget } from "next-cloudinary";
import { ImagePlusIcon } from "lucide-react";

const PRESET_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET_NAME;

const ImageUpload = ({ onUpload }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

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
            <CldUploadWidget onUpload={onUpload} uploadPreset={PRESET_NAME}>
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
