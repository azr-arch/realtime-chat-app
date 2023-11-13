"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { useSocket } from "./SocketContext";

const WebRTCContext = createContext(null);

const configuration = {
    iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        {
            urls: "turn:openrelay.metered.ca:80",
            username: "openrelayproject",
            credential: "openrelayproject",
        },
    ],
};

export const WebRTC = ({ children }) => {
    const [pc, setPc] = useState(null);
    const { socket } = useSocket();

    const remoteVideoRef = useRef();
    const selfVideoRef = useRef();

    useEffect(() => {
        if (typeof window !== "undefined" && RTCPeerConnection) {
            const PC = new RTCPeerConnection(configuration);

            PC.ontrack = (event) => {
                if (remoteVideoRef.current && event.streams[0]) {
                    remoteVideoRef.current.srcObject = event.streams[0];
                }
            };

            socket?.on("ICE_CANDIDATE", async (candidate) => {
                if (candidate) {
                    try {
                        const newCandidate = new RTCIceCandidate(candidate);
                        await PC.addIceCandidate(newCandidate);
                    } catch (error) {
                        console.log("handleIceCandidate: ", error);
                    }
                }
            });
            setPc(PC);

            return () => {
                socket?.off("ICE_CANDIDATE");
            };
        }
    }, []);

    const initiateCall = async (sender, receiver) => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });

        if (selfVideoRef.current) selfVideoRef.current.srcObject = stream;
        stream.getTracks().forEach((track) => {
            pc.addTrack(track, stream);
        });

        // Adding ice candidates
        pc.onicecandidate = (event) => {
            if (event.candidate) {
                socket?.emit("ICE_CANDIDATE", { candidate, to: receiver });
            }
        };

        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socket?.emit("OUTGOING_CALL", { sender, receiver, offer });
    };

    const handleCall = async (offer, from) => {
        await pc.setRemoteDescription(new RTCSessionDescription(offer));

        const ans = await pc.createAnswer();
        await pc.setLocalDescription(ans);
        socket?.emit("CALL_ACCEPTED", { ans, to: from });
    };

    if (!pc) return null;

    return (
        <WebRTC.Provider value={{ pc, initiateCall, handleCall, remoteVideoRef, selfVideoRef }}>
            {children}
        </WebRTC.Provider>
    );
};

export const useWebRTC = () => useContext(WebRTCContext);
