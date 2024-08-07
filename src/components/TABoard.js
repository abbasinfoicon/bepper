import React from 'react'

const TABoard = ({ letter }) => {
    return (
        <div className="col-md-12">
            <div className="Bord_GD-section text-center">
                <div className="img-style">
                    <img src="/img/circle.png" alt="" className="img-fluid m-auto" />
                </div>
                <div className="text-style mt-1">
                    <h3>{letter}</h3>
                </div>
            </div>
        </div>
    )
}

export default TABoard