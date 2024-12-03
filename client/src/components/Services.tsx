import React from 'react'
import Badge from './Badge'
import Image from 'next/image'
import BookServiceCTA from './BookServiceCTA'


export default function Services() {
  const servicesList = [
    {
      id: 1,
      name: 'Referigator',
      image: '/images/icons/Refrigerator.webp',
    },
    {
      id: 2,
      name: 'Washing Machine',
      image: '/images/icons/Washing Machine.png',
    },
    {
      id: 3,
      name: 'Dryers',
      image: '/images/icons/dryer.webp',
    },
    {
      id: 4,
      name: 'Oven, Range, Stove',
      image: '/images/icons/Oven, Range, Stove.webp',
    },
    {
      id: 5,
      name: 'Cooktop',
      image: '/images/icons/Cooktop.webp',
    },
    {
      id: 6,
      name: 'Dishwasher',
      image: '/images/icons/Dishwasher.webp',
    },
    {
      id: 7,
      name: 'Ice Machine',
      image: '/images/icons/Ice Machine.webp',
    },
    {
      id: 8,
      name: 'Microwave',
      image: '/images/icons/Microwave.webp',
    },
    {
      id: 9,
      name: 'Wine Cooler',
      image: '/images/icons/Wine Cooler.webp',
    },
    {
      id: 10,
      name: 'Freezer',
      image: '/images/icons/Freezer.webp',
    },
    {
      id: 11,
      name: 'Garbage Disposal',
      image: '/images/icons/Garbage Disposal.webp',
    },
    {
      id: 12,
      name: 'Vent Hood',
      image: '/images/icons/Vent Hood.webp',
    }
  ]
  return (
    <section id='services' className='w-full h-full'>
      <div className="container">
        <div className="flex flex-wrap lg:flex-row flex-col">
          <div className="lg:w-2/5 w-full h-full flex flex-col justify-between items-start gap-4">
            <Badge title='Our Services' />
            <div className="w-full pr-5 ">
              <span className='text-3xl font-bold'>Comprehensive Home Appliances Repair Services</span>
            </div>
            <div className="desc">
              <span>We offer a comprehensive range of repair services for all major home appliances. Whether your refrigerator is leaking, your oven is not heating, or your washing machine is making strange noises, we have the solution.</span>
            </div>
            <BookServiceCTA />
            <div className="image">
              <Image src="/images/sections/man-repairing-broken-microwave-at-home.jpg" alt="" width={500} height={500} className='w-full h-full object-cover' />
            </div>
          </div>
          <div className="lg:w-3/5 w-full h-full mt-10 lg:mt-0">
            <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-2 lg:px-12">
              {servicesList.map((service) => (
                <div key={service.id} className='w-full p-4 bg-white text-center hover:-translate-y-1 duration-300 shadow-lg'>
                  <Image src={service.image} alt={service.name} width={100} height={100} className='w-24 object-cover block mx-auto mb-3' />
                  <span className='font-bold text-lg'>{service.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
