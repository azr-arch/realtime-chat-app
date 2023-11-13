"use client";

import { Button } from "@components/ui/button";
import { useSocket } from "@context/SocketContext";
import { Mic, PhoneOff } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";

const VideoModal = ({ onClose, loading, session, receiver, isInitiator }) => {
    const { socket } = useSocket();
    const [callStatus, setCallStatus] = useState("idle");
    const videoRef = useRef(null);
    const remoteVideo = useRef(null);

    // NOTE: Send call-end event with socket first then unmount this component
    return (
        <div
            className={`fixed z-50 inset-0 w-screen h-screen flex items-center justify-center bg-white/20`}
        >
            <div
                aria-label="video-call-tab"
                className="max-w-screen-xl w-full aspect-video bg-black rounded-xl
                    p-3
                "
            >
                <div className="text-white w-full h-full grow flex items-center relative justify-center">
                    <video autoPlay ref={videoRef} className="w-full h-full object-cover" />

                    {remoteVideo.current && (
                        <video autoPlay ref={remoteVideo} className="w-full h-full object-cover" />
                    )}

                    {callStatus === "ringing" && (
                        <p className=" absolute text-green-500 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                            {callStatus === "ringing" ? "Calling..." : "Unavailable"}
                        </p>
                    )}
                    {callStatus === "idle" && (
                        <button
                            disabled={callStatus !== "idle"}
                            className=" absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
                            onClick={sendOffer}
                        >
                            Call
                        </button>
                    )}
                </div>
            </div>

            <footer
                className="rounded-xl mx-auto flex min-w-[250px] items-center absolute bottom-[10vh] left-1/2 -translate-x-1/2
                           px-4 py-3 bg-white/20 text-white justify-center gap-4"
            >
                <p className=" text-sm mr-auto">00: 17: 25</p>
                <Button
                    size="icon"
                    className="hover:bg-orange hover:text-black transition duration-200 rounded-full text-inherit"
                    variant="link"
                >
                    <Mic />
                </Button>
                <Button onClick={endCall} variant="destructive">
                    <PhoneOff />
                </Button>
            </footer>
        </div>
    );
};

export default VideoModal;
