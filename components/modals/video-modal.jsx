"use client";

import { Button } from "@components/ui/button";
import { useSocket } from "@context/SocketContext";
import { usePeer } from "@context/peer";
import { Mic, PhoneOff } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";

const VideoModal = ({ onClose, loading, session, receiver }) => {
    const [isMounted, setIsMounted] = useState(false);
    const { socket } = useSocket();
    const { createOffer } = usePeer();
    const [onCall, setOnCall] = useState(false);
    const videoRef = useRef(null);
    const [callStatus, setCallStatus] = useState("idle");

    const endCall = () => {
        // send end call event
        // setOnCall(false);
        setCallStatus("notReceived");
        // onClose();
        setTimeout(() => {
            onClose();
        }, 2000);
    };

    const handleAnswer = ({ ans }) => {
        console.log("Call was accepted");
        console.log(ans);
        setCallStatus("onCall");
    };

    const sendOffer = useCallback(async () => {
        // setOnCall(true);
        setCallStatus("ringing");
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            const offer = await createOffer();
            socket.emit("OUTGOING_CALL", { sender: session?.user?.email, offer, receiver });
            videoRef.current.srcObject = stream;

            setTimeout(() => {
                if (callStatus === "ringing") {
                    endCall();
                }
            }, 10000);
        } catch (error) {
            console.log(error);
        }
    }, [socket, receiver]);

    useEffect(() => {
        socket?.on("CALL_ACCEPTED", handleAnswer);

        return () => {
            socket?.off("CALL_ACCEPTED");
        };
    }, [socket]);

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
                <div className="text-white w-full h-full grow flex items-center justify-center">
                    <video ref={videoRef} className="w-full h-full object-cover"></video>
                    {callStatus === "ringing" && (
                        <p className="">
                            {callStatus === "ringing" ? "Calling..." : "Unavailable"}
                        </p>
                    )}
                    {callStatus === "idle" && (
                        <button disabled={callStatus !== "idle"} className="" onClick={sendOffer}>
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
