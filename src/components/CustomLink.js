import Link from 'next/link'
import React from 'react'

const CustomLink = () => {
    return (
        <div className="custom-link">
            <ul>
                <li className="active"><Link href='/'>&#11166; Login Coach</Link></li>
                <li className=""><Link href='/'>&#11166; Enter Access code</Link></li>
                <li className=""><Link href='/'>&#11166; More info</Link></li>
                <li className=""><Link href='/'>&#11166; Register as coach</Link></li>
                <li className=""><Link href='/'>&#11166; Schedule demo-session</Link></li>
            </ul>
        </div>
    )
}

export default CustomLink