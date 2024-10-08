'use client';
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';

// Dynamically import Excalidraw with SSR disabled
const Excalidraw = dynamic(() => import('@excalidraw/excalidraw').then(mod => mod.Excalidraw), {
    ssr: false,
    loading: () => <div className="juNRvt"><span className="loader"> </span></div>,
});

const LiveCollaborationTrigger = dynamic(() => import('@excalidraw/excalidraw').then(mod => mod.LiveCollaborationTrigger), {
    ssr: false,
    loading: () => <div className="juNRvt"><span className="loader"> </span></div>,
});

const WhiteBoard = () => {
    const [excalidrawAPI, setExcalidrawAPI] = useState(null);
    const [isCollaborating, setIsCollaborating] = useState(false);

    const UIOptions = {
        canvasActions: {
            loadScene: false,
            export: false,
            saveToActiveFile: false,
            help: false,
            saveFileToDisk: false,
        },
    };

    useEffect(() => {
        if (typeof window !== 'undefined' && excalidrawAPI) {
            if (isCollaborating) {
                const collaborators = new Map();
                collaborators.set("id1", {
                    username: "Doremon",
                    avatarUrl: "../../../../img/doremon.png",
                });
                collaborators.set("id3", {
                    username: "Pika",
                    avatarUrl: "../../../../img/pika.jpeg",
                });
                excalidrawAPI.updateScene({ collaborators });
            } else {
                excalidrawAPI.updateScene({
                    collaborators: new Map(),
                });
            }

            console.log("collaborators:", collaborators);
        }
    }, [isCollaborating, excalidrawAPI]);

    if (typeof window === 'undefined') {
        return null; // Prevent rendering on the server
    }

    console.log("excalidrawAPI:", excalidrawAPI)
    console.log("isCollaborating:", isCollaborating)

    return (
        <div style={{ height: 'calc(100vh - 50px)' }}>
            <label className="checkbox-collaborators">
                <input
                    type="checkbox"
                    checked={isCollaborating}
                    onChange={() => setIsCollaborating(!isCollaborating)}
                />
                Show Collaborators
            </label>

            <Excalidraw
                onChange={(elements, state, appState) => {
                    if (!excalidrawAPI) setExcalidrawAPI(state.api);
                }}
                UIOptions={UIOptions}
                renderTopRightUI={() => (
                    <LiveCollaborationTrigger
                        isCollaborating={isCollaborating}
                        onSelect={() => {
                            window.alert("You clicked on collab button");
                            setIsCollaborating(true);
                        }}
                    />
                )}
            />
        </div>
    );
};

export default WhiteBoard;
