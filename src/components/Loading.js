import React from 'react'
import { RotatingLines } from 'react-loader-spinner'

const Loading = () => {
    return (
        < RotatingLines
            strokeColor="#95df9f"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
        />
    )
}

export default Loading