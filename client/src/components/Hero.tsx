"use client"
import Image from "next/image";
import React from "react"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { TbMedal } from "react-icons/tb";
import BookServiceCTA from "./BookServiceCTA";
export default function Hero() {

  const images = [
    {
      id: 1,
      src: "/images/sections/adult-repairman-holding-screwdriver-and-using-digital-tablet-while-repairing-washing-machine-in-1024x684.jpg",
      alt: "Image 1",
    },
    {
      id: 2,
      src: "/images/sections/appliance-repair-service-people-in-the-waiting-room.jpg",
      alt: "Image 2",
    },
    {
      id: 3,
      src: "/images/sections/a-man-is-cleaning-the-room-during-repairs-using-a-construction-vacuum-cleaner.jpg",
      alt: "Image 3",
    },
    {
      id: 4,
      src: "/images/sections/man-repairing-broken-microwave-at-home.jpg",
      alt: "Image 4",
    },
    {
      id: 5,
      src: "/images/sections/home-appliances-technician-repair-broken-washer.jpg",
      alt: "Image 5",
    },
    {
      id: 6,
      src: "/images/sections/home-appliances-household-kitchen-technics-in-appartments-.jpg",
      alt: "Image 6",
    },
  ];
  return (
    <section id="home">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay]}
        className=" mySwiper w-full h-screen md:h-[400px] lg:h-[850px]"
        loop
        slidesPerView={1}
      >
        <div className="w-full h-full absolute inset-0 bg-[#0000008a] z-40 flex flex-col gap-5 justify-center items-center">
          <div className="bg-white flex justify-center items-center py-1 px-2 rounded-md">
            <TbMedal size={22} color="red" />
            <span>Your satisfaction is our top priority.</span>
          </div>
          <div className="flex flex-col gap-2 items-center justify-center">
            <h1 className="text-[#FFC752] text-center text-xl md:text-3xl lg:text-5xl font-bold leading-normal">Broken Home Appliance? </h1>
            <h2 className="text-white text-center text-xl md:text-3xl lg:text-5xl font-bold leading-normal">We have Got the Fix</h2>
            <div className="w-2/3">
              <p className="text-white text-center leading-normal">Our certified technicians are dedicated to providing top-notch home appliance service with transparent pricing and a satisfaction guarantee.</p>
            </div>
          </div>
          <BookServiceCTA />
        </div>
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <Image
              src={image.src}
              alt={image.alt}
              width={1920}
              height={1080}
              className={`absolute inset-0 w-full h-full object-cover`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
