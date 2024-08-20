'use client'
import React, { useEffect, useState } from 'react'

const ModalInfo = ({ open, setOpen, path }) => {
    const [fullName, setFullName] = useState();
    const [roomID, setRoomID] = useState();

    useEffect(() => {
        setFullName("");
    }, [])

    const handleHide = () => {
        setOpen(false);
    }
    const handleRoom = () => {

    }

    return (
        <div className={`modalInfo modal fade ${open ? 'show' : ''}`}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body">
                        <button type="button" className="close" onClick={handleHide}>
                            <img src="/img/close.svg" alt="close" className="img-fluid" />
                        </button>

                        {path === 'info' &&
                            <div className="content">
                                <h3>How it works:</h3>
                                <ul>
                                    <li>
                                        <img src="/img/move.svg" alt="move" className="img-fluid" />
                                        <p><span>Move and scale text:</span> Simply click on the respective word</p>
                                    </li>
                                    <li>
                                        <img src="/img/edit.svg" alt="edit" className="img-fluid" />
                                        <p><span>Edit text:</span> Double click on the respective word</p>
                                    </li>
                                </ul>
                            </div>
                        }
                        {path === 'video' &&
                            <div className="content">
                                <h3>live collaboration</h3>
                                <input type="text" id="name" onChange={(e) => setFullName(e.target.value)} className="form-control mb-2" placeholder='Enter Your Name' />

                                {fullName && fullName.length >= 3 &&
                                    (
                                        <>
                                            <div className="join_team">
                                                <input type="text" id="roomid" value={roomID} onChange={(e) => setRoomID(e.target.value)} className="form-control" placeholder='Enter RoomId to join a meeting' />
                                                <button className='form-control' disabled={!roomID}>Join</button>
                                            </div>
                                            <button className='create_meeting' onClick={() => handleRoom("bAcd123xYz000Sbi")}>Or Create a new meeting</button>
                                        </>
                                    )
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalInfo