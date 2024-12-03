import Link from 'next/link'
import React from 'react'
import { IoIosCall } from 'react-icons/io'

export default function BookServiceCTA() {
    return (
        <div className='flex gap-4 lg:flex-row flex-col'>
            <Link href={'#contact'} className='bg-red-500 hover:bg-red-600 flex justify-center items-center text-white font-bold py-1 px-5 rounded duration-300'>Book Service</Link>
            <Link className='flex items-center gap-2 p-4 text-xl font-semibold text-red-500 hover:text-yellow-600 duration-300' href="tel:+1 412-909-9091">
                <IoIosCall />
                +1 412-909-9091
            </Link>
        </div>
    )
}
