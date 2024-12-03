import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsEnvelopePaperHeartFill } from 'react-icons/bs'
import { FaCaretRight, FaClock, FaFacebook, FaInstagram, FaLinkedin, FaPhoneAlt } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { TiLocation } from 'react-icons/ti'

export default function Footer() {
  return (
    <footer id='footer' className='w-full h-full bg-[#090A1D] py-20'>
      <div className="container">
        <div className="w-full flex flex-wrap">
          <div className="w-full md:w-1/2 lg:w-1/4 mt-5 pr-6">
            <div className="w-full mb-4">
              <span className='font-semibold text-white'>Contact Info</span>
            </div>
            <div className="w-full">
              <ul className='flex flex-col gap-3'>
                <li>
                  <Link href={'https://maps.app.goo.gl/u9FnFDpsCbKG1gj29?g_st=com.google.maps.preview.copy'} target={'_blank'} className='flex items-center gap-2 text-white'>
                    <TiLocation color='gold' />
                    <span className='tracking-wide'>1015 Vermont Ave, Pittsburgh, PA 15234</span>
                  </Link>
                </li>
                <li>
                  <Link href={'tel:+1 412-909-9091'} className='flex items-center gap-2 text-white'>
                    <FaPhoneAlt color='gold' />
                    <span className='tracking-wide'>+1 412-909-9091</span>
                  </Link>
                </li>
                <li>
                  <Link href={'mailto:info@yinzerfix.com'} className='flex items-center gap-2 text-white'>
                    <BsEnvelopePaperHeartFill color='gold' />
                    <span className='tracking-wide'>info@yinzerfix.com</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className='w-full mt-10'>
              <Link href={'#contact'} className='bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-5 duration-300 w-full'>Book a Service</Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 mt-5 pr-6">
            <div className="w-full mb-4">
              <span className='font-semibold text-white'>Working hours</span>
            </div>
            <div className="w-full">
              <ul className='flex flex-col gap-3'>
                <li className='flex items-center gap-2 text-white'>
                  <FaClock color='gold' />
                  <span className='tracking-wide'>Mon - Sat: 7:00am - 9:00pm</span>
                </li>
                <li className='flex items-center gap-2 text-white'>
                  <FaClock color='gold' />
                  <span className='tracking-wide'>Sunday: Closed</span>
                </li>
              </ul>
            </div>
            <div className='w-full mt-10'>
              <ul className='flex gap-3'>
                <li>
                  <Link href={'https://www.facebook.com/yinzerfixappliancerepair/'} target={'_blank'}>
                    <FaFacebook color='white' size={24} />
                  </Link>
                </li>
                <li>
                  <Link href={'https://www.instagram.com/yinzerfixappliancerepair/'} target={'_blank'}>
                    <FaInstagram color='white' size={24} />
                  </Link>
                </li>
                <li>
                  <Link href={'#'}>
                    <FaLinkedin color='white' size={24} />
                  </Link>
                </li>
                <li>
                  <Link href={'#'}>
                    <FaXTwitter color='white' size={24} />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 mt-5 pr-6">
            <div className="w-full mb-4">
              <span className='font-semibold text-white'>Information</span>
            </div>
            <div className="w-full">
              <ul className='flex flex-col gap-3'>
                <li>
                  <Link href={'#'} className='flex items-center gap-2 text-white'>
                    <FaCaretRight color='gold' />
                    <span className='text-white'>About Us</span>
                  </Link>
                </li>
                <li>
                  <Link href={'#'} className='flex items-center gap-2 text-white'>
                    <FaCaretRight color='gold' />
                    <span className='text-white'>Services</span>
                  </Link>
                </li>
                <li>
                  <Link href={'#'} className='flex items-center gap-2 text-white'>
                    <FaCaretRight color='gold' />
                    <span className='text-white'>Customer Reviews</span>
                  </Link>
                </li>
                <li>
                  <Link href={'#'} className='flex items-center gap-2 text-white'>
                    <FaCaretRight color='gold' />
                    <span className='text-white'>Contact Us</span>
                  </Link>
                </li>
              </ul>
            </div>

          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 mt-5 pr-6">
            <div className="w-full mb-4">
              <span className='font-semibold text-white'>Instagram</span>
            </div>
            <div className="w-full">
              <div className='grid grid-cols-3 gap-2'>
                <Image src='/images/sections/adult-repairman-holding-screwdriver-and-using-digital-tablet-while-repairing-washing-machine-in-1024x684 (1).jpg'
                  alt='instagram'
                  className='w-full h-full object-cover'
                  width={75}
                  height={75} />
                <Image src='/images/sections/appliance-repair-service-people-in-the-waiting-room.jpg'
                  alt='instagram'
                  className='w-full h-full object-cover'
                  width={75}
                  height={75} />
                <Image src='/images/sections/home-appliances-household-kitchen-technics-in-appartments-.jpg'
                  alt='instagram'
                  className='w-full h-full object-cover'
                  width={75}
                  height={75} />
                <Image src='/images/sections/home-appliances-household-kitchen-technics-isolated-on-white-background.jpg'
                  alt='instagram'
                  className='w-full h-full object-cover'
                  width={75}
                  height={75} />
                <Image src='/images/sections/home-appliances-technician-repair-broken-washer.jpg'
                  alt='instagram'
                  className='w-full h-full object-cover'
                  width={75}
                  height={75} />
                <Image src='/images/sections/man-repairing-broken-microwave-at-home.jpg'
                  alt='instagram'
                  className='w-full h-full object-cover'
                  width={75}
                  height={75} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
