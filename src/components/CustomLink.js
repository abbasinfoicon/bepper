'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { RxPaperPlane } from 'react-icons/rx'

const CustomLink = () => {
    const router = useRouter();

    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue) {
            router.push(selectedValue);
        }
    };

    return (
        <div className="custom-link">
            <p>Select Link</p>
            <ul className='d-none'>
                <li className="active"><Link href='/login' className='flex items-center gap-1'><RxPaperPlane /> Login Coach</Link></li>
                <li className=""><Link href='/' className='flex items-center gap-1'><RxPaperPlane /> Enter Access code</Link></li>
                <li className=""><Link href='/' className='flex items-center gap-1'><RxPaperPlane /> More info</Link></li>
                <li className=""><Link href='/register' className='flex items-center gap-1'><RxPaperPlane /> Register as coach</Link></li>
                <li className=""><Link href='/' className='flex items-center gap-1'><RxPaperPlane /> Schedule demo-session</Link></li>
            </ul>
            
            <select name="" id="" className='form-control' onChange={handleSelectChange}>
                <option value="/">Select Link</option>
                <option value="/login">Login Coach</option>
                <option value="/">Enter Access code</option>
                <option value="/">More info</option>
                <option value="/register">Register as coach</option>
                <option value="/">Schedule demo-session</option>
            </select>
        </div>
    )
}

export default CustomLink