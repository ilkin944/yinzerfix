import Image from 'next/image'
import React from 'react'
import Badge from './Badge'
import { FaHeart } from 'react-icons/fa'
import { FiMessageCircle } from 'react-icons/fi'
import { GiFastArrow } from 'react-icons/gi'
export default function About() {
  return (
    <section
      id='about' className='w-full h-full my-20 lg:-mt-32 relative z-40'>
      <div className="container">
        <div className="flex lg:flex-row flex-col-reverse bg-white min-h-[700px] items-stretch">
          <div className='w-full lg:w-1/2 h-full p-3 md:p-8 lg:p-16 flex flex-col justify-start items-start'>
            <Badge title="About us" />
            <div className="mt-5">
              <span className='text-3xl font-bold leading-normal'>Reliable and Experienced Appliance Repair Team</span>
            </div>
            <div className="mt-4">
              <span className='text-base leading-snug'>Welcome to YinzerFix Appliance Repair, we are your trusted family-owned and Pittsburgh-based company for fast, reliable, and expert appliance repair services. We understand how essential your appliances are to your daily life, and our mission is to keep them running smoothly so you can focus on what matters most.
                At YinzerFix Appliance Repair, we value honesty, transparency, and professionalism. We offer upfront pricing, flexible scheduling, and a 100% satisfaction guarantee. Whether a minor fix or a major repair, every job is manageable for us to handle.
                We proudly serve our local community and look forward to helping you enjoy a stress-free, efficient home. Let us show you why we’re the go-to choice for appliance repair!
              </span>
            </div>
            <div className="mt-8">
              <span className='font-semibold text-lg text-purple'>Our Commitment to Excellence:</span>
              <ul className='mt-5'>
                <li className='flex items-center gap-4 leading-loose'>
                  <FaHeart color='#3637a5' />
                  <span>Your satisfaction is our top priority.</span>
                </li>
                <li className='flex items-center gap-4 leading-loose'>
                  <GiFastArrow color='#3637a5' />
                  <span>Fast, efficient, and always dependable.</span>
                </li>
                <li className='flex items-center gap-4 leading-loose'>
                  <FiMessageCircle color='#3637a5' />
                  <span>Preventative maintenance tips and advice.</span>
                </li>
              </ul>
            </div>
            <div className="mt-8 border border-slate-300 w-full flex justify-between items-center gap-4 py-4 px-10 rounded-sm">
              <div className='flex flex-col items-center justify-center gap-4'>
                <span className='text-4xl font-bold text-purple'>1000 +</span>
                <span>Satisfied Customers</span>
              </div>
              <div className='flex flex-col items-center justify-center gap-4'>
                <span className='text-4xl font-bold text-purple'>11 +</span>
                <span>Years of Experience</span>
              </div>
            </div>
          </div>
          <div className='absolute top-1/2 right-1/2 left-1/2 -translate-x-2/3 -translate-y-1/2 w-36 h-36 animate-pulse lg:flex hidden'>
            <Image src={'/images/icons/guaranted.png'} width={100} height={100} alt='guranted' className='w-36 h-36 object-cover' />
          </div>
          <div className='w-full lg:w-1/2 h-full bg-blue-700 min-h-[700px]'>
            <Image src={"/images/sections/joyful-young-man-fixing-fridge-in-kitchen.jpg"} alt="about" width={500} height={500} className='w-full  min-h-[700px] h-full object-cover' />
          </div>
        </div>
      </div>
    </section>
  )
}
