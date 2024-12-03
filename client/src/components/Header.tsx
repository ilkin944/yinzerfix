"use client"
import { useState } from "react"
import Navbar from "./Navbar"
import Link from "next/link"
import Image from "next/image"
import MobileMenu from "./MobileMenu"

export default function Header() {
    const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

    return (
        <>
            <header className="absolute top-0 z-50 left-0 right-0 container w-full hidden lg:block">
                <Navbar />
            </header>
            <header className="absolute top-0 z-50 left-0 right-0 container w-full shadow-md flex justify-between items-center lg:hidden">
                <Link href="/" className="flex justify-start items-center w-full h-full">
                    <Image
                        src="/images/logo.png"
                        alt="logo"
                        className="w-[150px]"
                        width={70}
                        height={70} />
                </Link>
                <button onClick={() => setShowMobileMenu(true)} className="p-2 bg-slate-200 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </header>
            <MobileMenu showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} />
        </>
    )
}
