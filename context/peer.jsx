"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const PeerContext = createContext(null);

export const PeerProvider = ({ children }) => {
    const [peer, setPeer] = useState(null);
    // const peer = useMemo(() => new RTCPeerConnection(), []);

    useEffect(() => {
        setPeer(new RTCPeerConnection());
    }, []);

    const createOffer = async () => {
        if (peer) {
            const newOffer = await peer.createOffer();
            await peer.setLocalDescription(newOffer);
            return newOffer;
        }
        return;
    };

    const createAnswer = async (offer) => {
        if (peer) {
            const newAnswer = await peer.createAnswer();
            await peer.setLocalDescription(new RTCSessionDescription(newAnswer));
            return newAnswer;
        }
    };

    if (!peer) return null;

    return (
        <PeerContext.Provider value={{ peer, createOffer, createAnswer }}>
            {children}
        </PeerContext.Provider>
    );
};

export const usePeer = () => useContext(PeerContext);
