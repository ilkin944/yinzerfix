import React from 'react'
import Badge from './Badge'
import { FaWpforms } from 'react-icons/fa'
import { BiSolidCalendarStar } from 'react-icons/bi'
import { RiUserLocationLine } from 'react-icons/ri'

export default function Process() {

    return (
        <section id='process' className='w-full h-full my-20 py-20 before:bg-[[#f2f2f2] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:z-[-1]'>
            <div className="container">
                <div className="flex flex-col items-center justify-center">
                    <Badge title='Our Process' />
                    <div className="w-full lg:w-1/2 mx-auto my-5">
                        <h2 className='text-3xl font-bold text-center'>From Booking to Repair, Our Process is Simple and Seamless!</h2>
                    </div>
                    <div className="w-full lg:w-2/3 mx-auto">
                        <p className='text-center'>Repair with our simple and efficient process. We guarantee top-notch service from start to finish, ensuring your appliances are back in working order with minimal disruption.</p>
                    </div>
                </div>
                <div className="steps">
                    <div className="step-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
                        <div className="w-full h-full p-5 bg-purple overflow-hidden relative flex items-center justify-center aspect-square">
                            <div className='absolute top-1/2 -left-[20%] w-full bg-white text-black -rotate-45 text-center font-semibold' style={{ transformOrigin: 'top left' }}>STEP 1</div>
                            <div className='w-full h-full flex flex-col items-center justify-center gap-5'>
                                <FaWpforms color='gold' size={45} />
                                <span className='text-white text-lg font-bold'>Fill the Form</span>
                                <span className='text-white text-sm text-center'>Provide us with your appliance details and repair needs quickly through our easy online form.</span>
                            </div>
                        </div>
                        <div className="w-full h-full p-5 bg-purple overflow-hidden relative flex items-center justify-center aspect-square">
                            <div className='absolute top-1/2 -left-[20%] w-full bg-white text-black -rotate-45 text-center font-semibold' style={{ transformOrigin: 'top left' }}>STEP 2</div>
                            <div className='w-full h-full flex flex-col items-center justify-center gap-5'>
                                <FaWpforms color='gold' size={45} />
                                <span className='text-white text-lg font-bold'>Get Estimate</span>
                                <span className='text-white text-sm text-center'>Receive a transparent and accurate estimate for your appliance repair, with no hidden fees.</span>
                            </div>
                        </div>
                        <div className="w-full h-full p-5 bg-purple overflow-hidden relative flex items-center justify-center aspect-square">
                            <div className='absolute top-1/2 -left-[20%] w-full bg-white text-black -rotate-45 text-center font-semibold' style={{ transformOrigin: 'top left' }}>STEP 3</div>
                            <div className='w-full h-full flex flex-col items-center justify-center gap-5'>
                                <BiSolidCalendarStar color='gold' size={45} />
                                <span className='text-white text-lg font-bold'>Pick Service Time</span>
                                <span className='text-white text-sm text-center'>Choose a convenient time for your repair service that fits your busy schedule effortlessly.</span>
                            </div>
                        </div>
                        <div className="w-full h-full p-5 bg-purple overflow-hidden relative flex items-center justify-center aspect-square">
                            <div className='absolute top-1/2 -left-[20%] w-full bg-white text-black -rotate-45 text-center font-semibold' style={{ transformOrigin: 'top left' }}>STEP 4</div>
                            <div className='w-full h-full flex flex-col items-center justify-center gap-5'>
                                <RiUserLocationLine color='gold' size={45}/>
                                <span className='text-white text-lg font-bold'>Your Pro Arrives!</span>
                                <span className='text-white text-sm text-center'>Our certified technician arrives on time, ready to fix your appliance efficiently and professionally.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
