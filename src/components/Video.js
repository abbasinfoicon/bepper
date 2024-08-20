import React from 'react'


const Video = () => {
    return (
        <div className="video">
            <video className="w-full" controls autoPlay muted loop>
                <source src="/video.mp4" type="video/mp4" />
            </video>
        </div>
    )
}

export default Video