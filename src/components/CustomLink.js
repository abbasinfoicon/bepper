import Link from 'next/link'
import React from 'react'
import { RxPaperPlane } from 'react-icons/rx'

const CustomLink = () => {
    return (
        <div className="custom-link">
            <ul>
                <li className="active"><Link href='/' className='flex items-center gap-1'><RxPaperPlane /> Login Coach</Link></li>
                <li className=""><Link href='/' className='flex items-center gap-1'><RxPaperPlane /> Enter Access code</Link></li>
                <li className=""><Link href='/' className='flex items-center gap-1'><RxPaperPlane /> More info</Link></li>
                <li className=""><Link href='/' className='flex items-center gap-1'><RxPaperPlane /> Register as coach</Link></li>
                <li className=""><Link href='/' className='flex items-center gap-1'><RxPaperPlane /> Schedule demo-session</Link></li>
            </ul>
        </div>
    )
}

export default CustomLink