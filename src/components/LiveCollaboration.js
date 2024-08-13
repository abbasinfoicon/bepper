import React, { Suspense } from "react";
import { LiveCollaborationTrigger } from '@excalidraw/excalidraw';
import dynamic from "next/dynamic";

const Timesheet = dynamic(() => import("./Timesheet"), {
    suspense: true,
    ssr: false,
});

const LiveCollaboration = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Timesheet />
        </Suspense>
    );
};


export default LiveCollaboration