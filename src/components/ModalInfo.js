import React from 'react'

const ModalInfo = (props) => {

    const handleHide = () => {
        document.getElementById('modalInfo').classList.remove("show");
    }

    return (
        <div className={`modalInfo modal fade ${props.show ? 'show' : ''}`} id="modalInfo">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body">
                        <button type="button" className="close" onClick={handleHide}>
                            <img src="/img/close.svg" alt="close" className="img-fluid" />
                        </button>

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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalInfo