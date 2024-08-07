import React from 'react'

const CircleTextArea = ({ index, textareaRef, setTextarea }) => {
    return (
        <div className="col-md-4 relative">
            <div className="Bord_GD-section text-center">
                <div className="img-style">
                    <img src="/img/circle.png" alt="" className="img-fluid m-auto" />
                </div>
                <div className="text-style mt-1 ttxx">
                    <textarea ref={textareaRef} onChange={(e) => setTextarea(e.target.value)} placeholder={`type A${index + 1}`}></textarea>
                </div>
            </div>
        </div>
    )
}

export default CircleTextArea