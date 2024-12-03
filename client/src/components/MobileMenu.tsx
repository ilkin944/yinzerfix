import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaEnvelopeOpen, FaFacebook, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { IoIosCall, IoMdClose } from 'react-icons/io'

export default function MobileMenu({ showMobileMenu, setShowMobileMenu }: { showMobileMenu: boolean, setShowMobileMenu: (e: boolean) => void }) {
    return (
        <div className={`w-full h-screen flex items-center bg-white z-[99999] flex-col gap-2 duration-500 fixed top-0 inset-0 ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className='w-full flex justify-between items-center gap-8 p-4'>
                <Link onClick={() => setShowMobileMenu(false)} href={'/'}>
                    <Image
                        src={'/images/logo.png'}
                        alt="Logo"
                        className='w-[150px]'
                        width={70}
                        height={70}
                    />
                </Link>
                <button onClick={() => setShowMobileMenu(false)} className='hover:text-red-500 duration-500 p-2 bg-slate-200 rounded-full'>
                    <IoMdClose className='text-black text-2xl' />
                </button>
            </div>
            <div className='w-full mt-6 p-4'>
                <div className="navbar-nav flex items-center justify-start gap-8 bg-white">
                    <div className=''>
                        <ul className='flex flex-col gap-8'>
                            <li onClick={() => setShowMobileMenu(false)} className='px-3 py-4 hover:text-red-500 duration-500 font-medium'>
                                <Link href="#home">Home</Link>
                            </li>
                            <li onClick={() => setShowMobileMenu(false)} className='px-3 py-4 hover:text-red-500 duration-500 font-medium'>
                                <Link href="#aboutus">About</Link>
                            </li>
                            <li onClick={() => setShowMobileMenu(false)} className='px-3 py-4 hover:text-red-500 duration-500 font-medium'>
                                <Link href="#services">Services</Link>
                            </li>
                            <li onClick={() => setShowMobileMenu(false)} className='px-3 py-4 hover:text-red-500 duration-500 font-medium'>
                                <Link href="#projects">Projects</Link>
                            </li>
                            <li onClick={() => setShowMobileMenu(false)} className='px-3 py-4 hover:text-red-500 duration-500 font-medium'>
                                <Link href="#contactus">Contact</Link>
                            </li>
                            <li>
                                <button onClick={() => setShowMobileMenu(false)} className='px-12 py-4 bg-red-500 text-white rounded-sm font-bold hover:bg-yellow-600 duration-300'>Get A Quote</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='w-full flex  items-center gap-4 p-4'>
                <div className='flex justify-center items-center gap-4'>
                    <Link href="tel:+1 412-909-9091" target="_blank" rel="noopener noreferrer" className='flex items-center gap-2 text-xl font-semibold'><IoIosCall />+1 412-909-9091</Link>
                </div>
            </div>
            <div className='w-full flex  items-center gap-4 p-4'>
                <div className='flex justify-center items-center gap-4'>
                    <Link href="mailto:info@yinzerfix.com" target="_blank" rel="noopener noreferrer" className='flex items-center gap-2 text-xl font-semibold'><FaEnvelopeOpen />info@yinzerfix.com</Link>
                </div>
            </div>
            <div className='w-full flex items-center gap-4 p-4'>
                <div className='flex justify-center items-center gap-4'>
                    <Link href="https://www.facebook.com/yinzerfixappliancerepair/" target="_blank" rel="noopener noreferrer"><FaFacebook /></Link>
                    <Link href="#" target="_blank" rel="noopener noreferrer"><FaXTwitter /></Link>
                    <Link href="https://www.instagram.com/yinzerfixappliancerepair/" target="_blank" rel="noopener noreferrer"><FaInstagram /></Link>
                    <Link href="#" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></Link>
                </div>
            </div>

        </div>
    )
}
