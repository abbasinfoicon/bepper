'use client';
import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import Excalidraw with SSR disabled
const Excalidraw = dynamic(() => import('@excalidraw/excalidraw').then((mod) => mod.Excalidraw), {
    ssr: false,
});

const WhiteBoard = () => {
    const UIOptions = {
        canvasActions: {
            loadScene: false,
            export: false,
            saveToActiveFile: false,
            help: false,
            saveFileToDisk: false,
        },
    };

    return (
        <div style={{ height: 'calc(100vh - 50px)' }}>
            <Excalidraw UIOptions={UIOptions} />
        </div>
    );
};

export default WhiteBoard;
