"use client";

import "@livekit/components-styles";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import { useEffect, useState } from "react";
import { MyVideoConference } from "./video-conference";

export const MediaRoom = ({ callId, currUser }) => {
    const name = currUser.name;
    const [token, setToken] = useState("");

    useEffect(() => {
        if (!callId || !name) return;

        (async () => {
            try {
                const res = await fetch(
                    `/api/get-participant-token?room=${callId}&username=${name}`
                );

                console.log(res);
                const data = await res.json();
                console.log({ data });
                setToken(data.token);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [callId, name]);

    if (token === "") {
        return <p>Loading...</p>;
    }

    return (
        <LiveKitRoom
            video={true}
            audio={true}
            token={token}
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            data-lk-theme="default"
            className="max-h-[350px] md:max-h-[570px] h-full"
        >
            <MyVideoConference />
        </LiveKitRoom>
    );
};
