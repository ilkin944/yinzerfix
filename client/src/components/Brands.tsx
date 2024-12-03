"use client"
import Image from 'next/image'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
export default function Brands() {
    const brands = [
        {
            id: 1,
            name: 'Admiral',
            image: '/images/brands/admiral.png'
        },
        {
            id: 2,
            name: 'Amana',
            image: '/images/brands/amana.png'
        },
        {
            id: 3,
            name: 'Asko',
            image: '/images/brands/asko.png'
        },
        {
            id: 4,
            name: 'Bosch',
            image: '/images/brands/bosch.png'
        },
        {
            id: 5,
            name: 'Dacor',
            image: '/images/brands/dacor.png'
        },
        {
            id: 6,
            name: 'Electrolux',
            image: '/images/brands/electrolux.png'
        },
        {
            id: 7,
            name: 'Fisher & Paykel',
            image: '/images/brands/fisher&paykel.png'
        },
        {
            id: 8,
            name: 'Frigidaire',
            image: '/images/brands/frigidaire.png'
        },
        {
            id: 9,
            name: 'General Electric',
            image: '/images/brands/ge.png'
        },
        {
            id: 10,
            name: 'Haier',
            image: '/images/brands/haier.png'
        },
        {
            id: 11,
            name: 'Hobart',
            image: '/images/brands/hobart.png'
        },
        {
            id: 12,
            name: 'Hoshizaki',
            image: '/images/brands/hoshizaki.png'
        },
        {
            id: 13,
            name: 'Jenn-Air',
            image: '/images/brands/jennair.png'
        },
        {
            id: 14,
            name: 'Kenmore',
            image: '/images/brands/kenmore.png'
        },
        {
            id: 15,
            name: 'KitchenAid',
            image: '/images/brands/kitchenaid.png'
        },
        {
            id: 16,
            name: 'LG',
            image: '/images/brands/lg.png',
        },
        {
            id: 17,
            name: 'Magic Chef',
            image: '/images/brands/magicchef.png'
        },
        {
            id: 18,
            name: 'Maytag',
            image: '/images/brands/maytag.png'
        },
        {
            id: 20,
            name: 'Samsung',
            image: '/images/brands/samsung.png'
        },
        {
            id: 21,
            name: 'Scotsman',
            image: '/images/brands/scotsman.png'
        },
        {
            id: 22,
            name: 'Speed Queen',
            image: '/images/brands/speedqueen.png'
        },
        {
            id: 23,
            name: 'Sub-Zero',
            image: '/images/brands/subzero.png'
        },
        {
            id: 24,
            name: 'Thermador',
            image: '/images/brands/thermador.png'
        },
        {
            id: 25,
            name: 'ULine',
            image: '/images/brands/uline.png'
        },
        {
            id: 26,
            name: 'Viking',
            image: '/images/brands/viking.png'
        },
        {
            id: 27,
            name: 'Whirlpool',
            image: '/images/brands/whirlpool.png'
        },
        {
            id: 28,
            name: 'Wolf',
            image: '/images/brands/wolf.png'
        }

    ]
    return (
        <section id='brands' className='container  my-20'>
            <div className="mb-10 text-center">
                <span className='text-xl font-semibold'>We Repair All Major Brand Appliances</span>
            </div>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                loop={true}
                breakpoints={{
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 8,
                        spaceBetween: 50,
                    },
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                className="brand-swiper items-center"
            >
                {brands.map((brand) => (
                    <SwiperSlide key={brand.id} className="">
                        <div className='bg-white rounded-md flex justify-center items-center w-full h-full p-2 shadow-md'>
                            <Image
                                src={brand.image}
                                loading='lazy'
                                alt={brand.name}
                                width={130}
                                placeholder='blur'
                                blurDataURL={brand.image}
                                height={50}
                                className='w-full object-contain' />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}
