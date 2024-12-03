import Image from 'next/image'
import React from 'react'

export default function InfoSection() {
    const infos = [
        {
            id: 1,
            title: 'From refrigerators to ovens, we repair all your home appliances.',
            image: '/images/sections/repair_2.png',
            bg: '#FFC7523a'
        },
        {
            id: 2,
            title: 'Affordable and professional home appliance repair at your doorstep.',
            image: '/images/sections/repair_3.png',
            bg: '#3637A53e'
        },
        {
            id: 3,
            title: 'Breathe new life into your appliances with our expert touch.',
            image: '/images/sections/gas_1.png',
            bg: '#FF57223e'
        }
    ]
    return (
        <section id='info' className='container my-20'>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch">
                {infos.map(info => (
                    <div key={info.id} className="w-full h-[380px] p-5 flex flex-col justify-between items-center" style={{ backgroundColor: info.bg }}>
                        <h3 className="text-xl font-medium text-center mt-5">{info.title}</h3>
                        <Image src={info.image} alt={info.title} width={300} height={300} className='w-full' />
                    </div>
                ))}
            </div>
        </section>
    )
}
