'use client'
import React, { useEffect, useRef, useState } from 'react'
import * as fabric from 'fabric';
import { CiLocationArrow1 } from 'react-icons/ci';
import { GoPencil } from 'react-icons/go';
import { BsPencil, BsSquare, BsPentagon, BsHexagon } from 'react-icons/bs';
import { RxBorderWidth, RxText } from 'react-icons/rx';
import { BiSolidSquareRounded, BiEraser } from 'react-icons/bi';
import { CgColorPicker } from 'react-icons/cg';
import { IoShapesOutline, IoAnalyticsOutline, IoDocumentOutline, IoTriangleOutline, IoArrowRedoOutline, IoArrowUndoOutline } from 'react-icons/io5';
import { TbSquareRounded } from 'react-icons/tb';
import { GiCircle } from "react-icons/gi";
import { PiStarLight, PiImage, PiArrowFatRightLight } from "react-icons/pi";
import { RiDeleteBin5Line } from "react-icons/ri";

const WhiteBoard = () => {
    const canvasRef = useRef(null);
    const [canvas, setCanvas] = useState(null);
    const [activeTool, setActiveTool] = useState('');
    const [activeSubTool, setActiveSubTool] = useState('');
    const [undoStack, setUndoStack] = useState([]);
    const [redoStack, setRedoStack] = useState([]);



    const handleTools = (tool) => {
        setActiveTool(activeTool === tool ? '' : tool);
    };
    const handleSubTools = (parent, value) => {
        setActiveTool(parent);
        setActiveSubTool(value);
    }

    useEffect(() => {
        // Initialize Fabric.js canvas
        const fabricCanvas = new fabric.Canvas(canvasRef.current, {
            isDrawingMode: false,
        });
        console.log('Canvas initialized:', fabricCanvas);
        setCanvas(fabricCanvas);

        // Cleanup function to dispose of the canvas instance
        return () => {
            if (fabricCanvas) {
                fabricCanvas.dispose();
            }
        };
    }, []);

    useEffect(() => {
        if (!canvas) return;

        // Reset canvas drawing mode for each tool
        canvas.isDrawingMode = false;

        console.log('Active tool:', activeTool);
        console.log('Canvas state before tool activation:', canvas);

        switch (activeTool) {
            case 'penTool':
                canvas.isDrawingMode = true;
                if (!canvas.freeDrawingBrush) {
                    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
                }
                canvas.freeDrawingBrush.width = 2;
                canvas.freeDrawingBrush.color = 'black';
                break;

            case 'eraser':
                canvas.isDrawingMode = true;
                if (!canvas.freeDrawingBrush) {
                    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
                }
                canvas.freeDrawingBrush.width = 10;
                canvas.freeDrawingBrush.color = 'white';
                break;

            case 'circle':
                addCircle();
                break;

            case 'square':
                addSquare();
                break;

            case 'triangle':
                addTriangle();
                break;

            case 'arrow':
                addArrow();
                break;

            default:
                break;
        }
    }, [activeTool, canvas]);

    useEffect(() => {
        if (canvas) {
            canvas.on('object:added', () => {
                addActionToUndoStack('add', canvas.getActiveObject());
            });

            canvas.on('object:removed', (e) => {
                addActionToUndoStack('remove', e.target);
            });

            canvas.on('path:created', (e) => {
                addActionToUndoStack('add', e.path);
            });
        }
    }, [canvas]);

    const addCircle = () => {
        const circle = new fabric.Circle({
            radius: 50,
            fill: 'transparent',
            stroke: 'black',
            left: 100,
            top: 100
        });
        canvas.add(circle);
        addActionToUndoStack('add', circle);
    };

    const addSquare = () => {
        const square = new fabric.Rect({
            width: 100,
            height: 100,
            fill: 'transparent',
            stroke: 'black',
            left: 100,
            top: 100
        });
        canvas.add(square);
        addActionToUndoStack('add', square);
    };

    const addTriangle = () => {
        const triangle = new fabric.Triangle({
            width: 100,
            height: 100,
            fill: 'transparent',
            stroke: 'black',
            left: 100,
            top: 100
        });
        canvas.add(triangle);
        addActionToUndoStack('add', triangle);
    };

    const addArrow = () => {
        const points = [ // Define arrow shape points
            { x: 0, y: 0 },
            { x: 100, y: 0 },
            { x: 100, y: -20 },
            { x: 140, y: 20 },
            { x: 100, y: 60 },
            { x: 100, y: 40 },
            { x: 0, y: 40 }
        ];
        const arrow = new fabric.Polyline(points, {
            fill: 'transparent',
            stroke: 'black',
            strokeWidth: 2,
            left: 100,
            top: 100
        });
        canvas.add(arrow);
        addActionToUndoStack('add', arrow);
    };

    const addActionToUndoStack = (action, object) => {
        setUndoStack(prev => [...prev, { action, object }]);
        setRedoStack([]); // Clear redo stack on new action
    };

    const handleUndo = () => {
        setUndoStack(prevUndoStack => {
            const undoStackCopy = [...prevUndoStack];
            const lastAction = undoStackCopy.pop(); // Get the last action from the stack

            if (lastAction) {
                const { action, object } = lastAction;

                // Perform the undo action
                if (action === 'add') {
                    canvas.remove(object);
                } else if (action === 'remove') {
                    canvas.add(object);
                }

                // Update the redo stack
                setRedoStack(prevRedoStack => [...prevRedoStack, lastAction]);
            }

            return undoStackCopy; // Return the updated undo stack
        });
    };

    const handleRedo = () => {
        setRedoStack(prevRedoStack => {
            const redoStackCopy = [...prevRedoStack];
            const lastRedo = redoStackCopy.pop(); // Get the last redo action from the stack

            if (lastRedo) {
                const { action, object } = lastRedo;

                // Perform the redo action
                if (action === 'add') {
                    canvas.add(object);
                } else if (action === 'remove') {
                    canvas.remove(object);
                }

                // Update the undo stack
                setUndoStack(prevUndoStack => [...prevUndoStack, lastRedo]);
            }

            return redoStackCopy; // Return the updated redo stack
        });
    };

    const handleDelete = () => {
        canvas.clear();
        setUndoStack([]);
        setRedoStack([]);
    };

    return (
        <div className="flex">
            <div className="left-tool">
                <ul className="toolbar">
                    <li><button className={`${activeTool === 'locator' ? 'active' : ''}`} onClick={() => handleTools('locator')}><CiLocationArrow1 /></button></li>
                    <li><button className={`${activeTool === 'penTool' ? 'active' : ''}`} onClick={() => handleTools('penTool')}><GoPencil /></button>
                        <ul className={`toolbar-sub ${activeTool === 'penTool' ? 'show' : 'hide'}`}>
                            <li><button className={`${activeSubTool === 'pencil' ? 'active' : ''}`} onClick={() => handleSubTools('penTool', 'pencil')}><GoPencil /></button></li>
                            <li><button className={`${activeSubTool === 'pencil2' ? 'active' : ''}`} onClick={() => handleSubTools('penTool', 'pencil2')}><BsPencil /></button></li>
                            <li><button className={`${activeSubTool === 'eraser' ? 'active' : ''}`} onClick={() => handleSubTools('penTool', 'eraser')}><BiEraser /></button></li>
                            <li><button className={`${activeSubTool === 'border' ? 'active' : ''}`} onClick={() => handleSubTools('penTool', 'border')}><RxBorderWidth /></button></li>
                            <li><button className={`${activeSubTool === 'color' ? 'active' : ''}`} onClick={() => handleSubTools('penTool', 'color')}><BiSolidSquareRounded /></button></li>
                            <li><button className={`${activeSubTool === 'colorpicker' ? 'active' : ''}`} onClick={() => handleSubTools('penTool', 'colorpicker')}><CgColorPicker /></button></li>
                        </ul>
                    </li>
                    <li><button className={`${activeTool === 'shapeTool' ? 'active' : ''}`} onClick={() => handleTools('shapeTool')}><IoShapesOutline /></button>
                        <ul className={`toolbar-sub ${activeTool === 'shapeTool' ? 'show' : 'hide'}`}>
                            <li><button className={`${activeSubTool === 'circle' ? 'active' : ''}`} onClick={() => handleSubTools('shapeTool', 'circle')}><GiCircle /></button></li>
                            <li><button className={`${activeSubTool === 'square' ? 'active' : ''}`} onClick={() => handleSubTools('shapeTool', 'square')}><BsSquare /></button></li>
                            <li><button className={`${activeSubTool === 'arrow2' ? 'active' : ''}`} onClick={() => handleSubTools('shapeTool', 'arrow2')}><PiArrowFatRightLight /></button></li>
                            <li><button className={`${activeSubTool === 'rounded' ? 'active' : ''}`} onClick={() => handleSubTools('shapeTool', 'rounded')}><TbSquareRounded /></button></li>
                            <li><button className={`${activeSubTool === 'triangle' ? 'active' : ''}`} onClick={() => handleSubTools('shapeTool', 'triangle')}><IoTriangleOutline /></button></li>
                            <li><button className={`${activeSubTool === 'pentagon' ? 'active' : ''}`} onClick={() => handleSubTools('shapeTool', 'pentagon')}><BsPentagon /></button></li>
                            <li><button className={`${activeSubTool === 'hexagon' ? 'active' : ''}`} onClick={() => handleSubTools('shapeTool', 'hexagon')}><BsHexagon /></button></li>
                            <li><button className={`${activeSubTool === 'star' ? 'active' : ''}`} onClick={() => handleSubTools('shapeTool', 'star')}><PiStarLight /></button></li>
                        </ul>
                    </li>
                    <li><button className={`${activeTool === 'line' ? 'active' : ''}`} onClick={() => handleTools('line')}><IoAnalyticsOutline /></button></li>
                    <li><button className={`${activeTool === 'text' ? 'active' : ''}`} onClick={() => handleTools('text')}><RxText /></button></li>
                    <li><button className={`${activeTool === 'doc' ? 'active' : ''}`} onClick={() => handleTools('doc')}><IoDocumentOutline /></button></li>
                    <li><button className={`${activeTool === 'img' ? 'active' : ''}`} onClick={() => handleTools('img')}><PiImage /></button></li>
                </ul>

                <div className="backUndo">
                    <ul>
                        <li><button onClick={handleUndo}><IoArrowUndoOutline /></button></li>
                        <li><button onClick={handleRedo}><IoArrowRedoOutline /></button></li>
                        <li><button onClick={handleDelete}><RiDeleteBin5Line /></button></li>
                    </ul>
                </div>
            </div>

            <div className="right-box">
                <canvas ref={canvasRef} width={800} height={690} style={{ background: 'white', border: '4px solid #a9846f' }} />
            </div>
        </div>
    )
}

export default WhiteBoard