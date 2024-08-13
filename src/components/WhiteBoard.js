'use client'
import React from 'react';
import { Excalidraw } from "@excalidraw/excalidraw";

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
        <div style={{ height: "calc(100vh - 50px)" }}>
            <Excalidraw UIOptions={UIOptions} />
        </div>
    );
};

export default WhiteBoard;
