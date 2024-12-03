"use client"
import Image from "next/image"
import React from "react"
import Badge from "./Badge"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaStar } from "react-icons/fa";
export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: "John Doe",
      review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam vel bibendum bibendum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam vel bibendum bibendum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam vel bibendum bibendum.",
      rating: 3,
      date: "2022-01-15",
      avatar: "https://via.placeholder.com/150x150",
    },
    {
      id: 2,
      name: "John Doe",
      review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam vel bibendum bibendum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam vel bibendum bibendum.",
      rating: 4,
      date: "2022-01-15",
      avatar: "https://via.placeholder.com/150x150",
    },
    {
      id: 3,
      name: "John Doe",
      review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam vel bibendum bibendum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam vel bibendum bibendum.",
      rating: 5,
      date: "2022-01-15",
      avatar: "https://via.placeholder.com/150x150",
    },
    {
      id: 4,
      name: "John Doe",
      review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam vel bibendum bibendum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam vel bibendum bibendum.",
      rating: 5,
      date: "2022-01-15",
      avatar: "https://via.placeholder.com/150x150",
    },
    {
      id: 5,
      name: "John Doe",
      review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam vel bibendum bibendum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam vel bibendum bibendum.",
      rating: 5,
      date: "2022-01-15",
      avatar: "https://via.placeholder.com/150x150",
    },
    {
      id: 6,
      name: "John Doe",
      review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam vel bibendum bibendum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam vel bibendum bibendum.",
      rating: 5,
      date: "2022-01-15",
      avatar: "https://via.placeholder.com/150x150",
    }
  ]
  return (
    <section id="testimonials" className="w-full h-full my-20">
      <div className="container">
        <div className="flex lg:flex-row flex-col flex-wrap items-start gap-5 lg:gap-10">
          <div className="w-full lg:w-[55%] flex flex-col items-start gap-5 py-5 lg:py-14">
            <Badge title="Clients Review" />
            <div className="title">
              <h2 className="text-3xl font-bold">Our Clients Satisfaction is Important to Us</h2>
            </div>
            <div className="flex w-full">
              <Swiper
                spaceBetween={20}
                freeMode
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                slidesPerView={1}
                centeredSlides
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                navigation
                modules={[Autoplay, Pagination, Navigation]}
                className="review-carousel gap-2"
              >
                {
                  reviews.map((review, index) => (
                    <SwiperSlide key={index}>
                      <div className="review">
                        <div className="review-header bg-purple flex items-center gap-3 p-5">
                          <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
                            <Image src={review.avatar} alt={review.name} width={70} height={70} className="w-full h-full object-cover" />
                          </div>
                          <div className="w-full">
                            <h3 className="text-xl font-bold text-white">{review.name}</h3>
                            <div className="flex items-center gap-1 mt-1">
                              {Array.from({ length: review.rating }, (_, index) => (
                                <FaStar color="gold" key={index} />
                              ))}
                            </div>
                            <p className="text-sm text-white mt-2">{review.date}</p>
                          </div>
                        </div>
                        <div className="bg-white shadow p-5">
                          <p className="text-base">{review.review}</p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))
                }
              </Swiper>
            </div>
          </div>
          <div className="w-full lg:w-[36%] h-[350px] lg:h-[500px]">
            <Image src={"/images/sections/happy-young-handyman-carpenter-in-workshop-smiling.jpg"} alt="testimonials" width={500} height={500} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
