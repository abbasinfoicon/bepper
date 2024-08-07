'use client'
import React, { useState } from 'react'
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
    const [activeTool, setActiveTool] = useState('');
    const [activeSubTool, setActiveSubTool] = useState('');

    const handleTools = (value) => {
        setActiveTool(activeTool === value ? '' : value);
        setActiveSubTool('');
    }

    const handleSubTools = (parent, value) => {
        setActiveTool(parent);
        setActiveSubTool(value);
    }

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
                        <li><button><IoArrowUndoOutline /></button></li>
                        <li><button><IoArrowRedoOutline /></button></li>
                        <li><button><RiDeleteBin5Line /></button></li>
                    </ul>
                </div>
            </div>

            <div className="right-box"></div>
        </div>
    )
}

export default WhiteBoard