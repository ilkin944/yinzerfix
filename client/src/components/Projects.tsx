"use client"
import React from 'react'
import Badge from './Badge'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Link from 'next/link';
import Image from 'next/image';
export default function Projects() {
  const projects = [
    {
      id: 1,
      title: 'Project 1',
      image: 'https://picsum.photos/id/1018/300/200',
      link: '#'
    },
    {
      id: 2,
      title: 'Project 2',
      image: 'https://picsum.photos/id/1015/300/200',
      link: '#'
    },
    {
      id: 3,
      title: 'Project 3',
      image: 'https://picsum.photos/id/1020/300/200',
      link: '#',
    },
    {
      id: 4,
      title: 'Project 4',
      image: 'https://picsum.photos/id/1019/300/200',
      link: '#'
    },
    {
      id: 5,
      title: 'Project 5',
      image: 'https://picsum.photos/id/1014/300/200',
      link: '#'
    },
    {
      id: 6,
      title: 'Project 6',
      image: 'https://picsum.photos/id/1012/300/200',
      link: '#',
    },
    {
      id: 7,
      title: 'Project 7',
      image: 'https://picsum.photos/id/1011/300/200',
      link: '#'
    },
    {
      id: 8,
      title: 'Project 8',
      image: 'https://picsum.photos/id/1010/300/200',
      link: '#'
    },
    {
      id: 9,
      title: 'Project 9',
      image: 'https://picsum.photos/id/1009/300/200',
      link: '#',
    },

  ]
  return (
    <section id='projects' className='w-full h-full bg-purple py-20'>
      <div className="container">
        <div className="flex flex-col items-center justify-center w-full">
          <Badge title='Featured Projects' />
          <div className="lg:w-1/3 mt-5">
            <h2 className='text-3xl font-bold text-white text-center' >Our Featured Showcase of Successful Projects</h2>
          </div>
          <div className="lg:w-2/4 mt-6">
            <p className='text-center text-white'>Discover how Applicare has helped countless households with their appliance repair needs. Browse through our recent projects to see the quality and expertise that define our services.</p>
          </div>
        </div>
        <div className='w-full my-10'>
          <Swiper
            spaceBetween={20}
            slidesPerView={2}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 6,
                spaceBetween: 50,
              },
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay]}
            className="project-carousel gap-2"
          >
            {
              projects.map((project, index) => (
                <SwiperSlide key={index} className='aspect-square'>
                  <Link href={project.link} className="group relative w-full h-full">
                    <div className="w-full h-full">
                      <Image src={project.image} alt={project.title} width={300} height={200} className="w-full h-full object-cover" />
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-0 w-full flex items-end pb-2 bg-gradient-to-t justify-center from-yellow-400 to-transparent h-28">
                      <h3 className='text-base  text-black'>{project.title}</h3>
                    </div>
                  </Link>
                </SwiperSlide>
              ))
            }
          </Swiper>
          <div className='cta flex justify-center items-center gap-5 mt-10'>
            <Link href={'#contact'} className='bg-red-500 hover:bg-yellow-500 hover:text-black text-white font-bold py-2 px-5 duration-300'>Book a Service</Link>
            {/* <Link className='flex items-center gap-2 p-4 text-base font-semibold text-white hover:text-yellow-600 duration-300 group' href={'#'}>See all projects <MdKeyboardDoubleArrowRight className='group-hover:translate-x-2 duration-300'/></Link> */}
          </div>
        </div>
      </div>
    </section>
  )
}
