"use client";

import {
    ControlBar,
    GridLayout,
    ParticipantTile,
    useCreateLayoutContext,
    useTracks,
    LayoutContextProvider,
} from "@livekit/components-react";
import { Track } from "livekit-client";

export const MyVideoConference = () => {
    const layoutContext = useCreateLayoutContext();

    const tracks = useTracks(
        [
            { source: Track.Source.Camera, withPlaceholder: true },
            { source: Track.Source.ScreenShare, withPlaceholder: false },
        ],
        { onlySubscribed: false }
    );

    return (
        <LayoutContextProvider value={layoutContext}>
            <div className="h-full overflow-hidden flex flex-row md:flex-col items-center">
                <GridLayout tracks={tracks} className="h-full min-w-0">
                    <ParticipantTile />
                </GridLayout>
                <ControlBar
                    className="relative flex flex-col items-start md:flex-row"
                    variation="minimal"
                />
            </div>
        </LayoutContextProvider>
    );
};
