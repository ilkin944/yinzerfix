import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import RequestForm from './RequestForm'

export default function Contact() {
  return (
    <section id='contact' className='w-full relative h-full bg-center bg-no-repeat bg-cover bg-fixed before:bg-[#090a1d] before:mix-blend-darken before:opacity-80 before:absolute before:inset-0'
      style={{ backgroundImage: `url(/images/sections/home-appliances-household-kitchen-technics-isolated-on-white-background.jpg)` }}>
      <div className="container relative z-10 p-10 lg:p-20">
        <div className="w-full flex flex-wrap lg:flex-row flex-col items-center justify-between">
          <div className="w-full lg:w-1/2 flex flex-col items-start justify-center">
            <div className="title">
              <span className='text-yellow-500 text-4xl font-semibold'>One Call Fixes All: </span>
              <span className='text-white text-4xl font-semibold'>We are Your Complete Home Appliance Repair Solution</span>
            </div>
            <ul className='mt-6'>
              <li className='flex items-center gap-1 mb-2'>
                <IoMdCheckmarkCircleOutline color='gold' />
                <span className='text-white'>Satisfaction guaranteed with every repair.</span>
              </li>
              <li className='flex items-center gap-1 mb-2'>
                <IoMdCheckmarkCircleOutline color='gold' />
                <span className='text-white'>Affordable and transparent pricing.</span>
              </li>
              <li className='flex items-center gap-1 mb-2'>
                <IoMdCheckmarkCircleOutline color='gold' />
                <span className='text-white'>Certified and experienced technicians.</span>
              </li>
            </ul>
            <Link href={'tel:+1 412-909-9091'} className='p-2 flex items-center gap-2 bg-yellow-500 text-white rounded-sm w-2/3 mt-4'>
              <div>
                <Image src={'/images/sections/Team-Member.jpg'} alt='Expert' width={60} height={60} className='w-16 h-16 object-cover' />
              </div>
              <div>
                <p className='text-purple font-semibold'>Call Now: +1 412-909-9091</p>
                <p className='text-black'>Consult with an expert</p>
              </div>
            </Link>
          </div>
          <div className="w-full lg:w-1/2 bg-purple p-10 mt-10 lg:mt-0">
            <div className="text-center">
              <span className='text-white text-xl font-semibold'>Request a Service</span>
            </div>
            <div className="text-center mt-3">
              <span className='text-white text-sm'>Schedule your home appliance repair online – 24/7 availability</span>
            </div>
            <RequestForm />
          </div>
        </div>
      </div>
    </section>
  )
}
