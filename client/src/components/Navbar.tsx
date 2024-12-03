import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { IoIosCall } from 'react-icons/io'

export default function Navbar() {
    return (
        <div className="navbar w-full flex flex-col gap-2 mt-4">
            <div className="w-full flex justify-between items-center gap-8">
                <div className='socials'>
                    <ul className='flex items-center gap-3'>
                        <li className='p-3'>
                            <Link href="https://www.facebook.com/yinzerfixappliancerepair/" target='_blank'>
                                <FaFacebook color='white' />
                            </Link>
                        </li>
                        <li className='p-3'>
                            <Link href="https://www.instagram.com/yinzerfixappliancerepair/" target='_blank'>
                                <FaInstagram color='white' />
                            </Link>
                        </li>
                        <li className='p-3'>
                            <Link href="#">
                                <FaXTwitter color='white' />
                            </Link>
                        </li>
                        <li className='p-3'>
                            <Link href="#">
                                <FaLinkedinIn color='white' />
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className='phone'>
                    <Link
                        className='flex items-center gap-2 p-4 text-xl font-semibold text-red-500 hover:text-yellow-600 duration-300'
                        href="tel:+1 412-909-9091">
                        <IoIosCall />
                        +1 412-909-9091
                    </Link>
                </div>
            </div>
            <div className="navbar-nav flex items-center justify-between gap-8 bg-white">
                <div className="logo">
                    <Link href="/">
                        <Image
                            src="/images/logo.png"
                            alt="logo"
                            loading='lazy'
                            placeholder='blur'
                            blurDataURL='/images/logo.png'
                            className="w-full"
                            width={70}
                            height={70} />
                    </Link>
                </div>
                <div className=''>
                    <ul className='flex gap-8'>
                        <li className='px-3 py-4 hover:text-red-500 duration-500 font-medium'>
                            <Link href="#home">Home</Link>
                        </li>
                        <li className='px-3 py-4 hover:text-red-500 duration-500 font-medium'>
                            <Link href="#about">About</Link>
                        </li>
                        <li className='px-3 py-4 hover:text-red-500 duration-500 font-medium'>
                            <Link href="#services">Services</Link>
                        </li>
                        <li className='px-3 py-4 hover:text-red-500 duration-500 font-medium'>
                            <Link href="#projects">Projects</Link>
                        </li>
                        <li className='px-3 py-4 hover:text-red-500 duration-500 font-medium'>
                            <Link href="#contact">Contact</Link>
                        </li>
                    </ul>
                </div>
                <div className=''>
                    <Link href={'#contact'} className='px-12 py-4 bg-red-500 text-white rounded-sm font-bold hover:bg-yellow-600 duration-300'>Get A Quote</Link>
                </div>
            </div>
        </div>
    )
}
