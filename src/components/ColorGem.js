'use client'
import React from 'react'

const colors = [
    "gem_orange",
    "gem_beige",
    "gem_geel",
    "gem_groen",
    "gem_donkerblauw",
    "gem_lichtblauw",
    "gem_wit",
    "gem_black",
];

const ColorGem = ({ setColor, setShowGem }) => {

    const ChangeGem = (e, value) => {
        e.preventDefault();
        setColor(value);
        setShowGem(true)
    };

    return (
        <div className="select-color">
            <p>Select color</p>
            <ul>
                {colors.map(color => (
                    <li key={color}>
                        <button onClick={(e) => ChangeGem(e, color)}>
                            <img src={`/img/${color}.png`} alt="" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ColorGem