'use client'

import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const Testimonials = ({data}) => {
  return (
    <section className="w-full bg-white py-8 sm:py-10 md:py-12 px-4 md:px-10 2xl:px-20 overflow-hidden">
      <div className=" mb-8 sm:mb-10 md:mb-12 lg:mb-14">
        <h2 className="text-[20px] sm:text-[22px] md:text-[25px] lg:text-[30px] font-semibold">
          <span className="font-bold text-black">Client Testimonials: </span>
          <span className="font-normal text-[#676767]"> Our Success Stories</span>
        </h2>
      </div>

      <div className="">
        <Swiper
            className="testimonials-carousel !pb-12"
            modules={[Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active'
            }}
            grabCursor={true}
            draggable={true}
            resistance={true}
            resistanceRatio={0.85}
          >
            {data?.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-white border border-[#777777] rounded-xl p-5 sm:p-6 md:p-7 lg:p-8 flex flex-col shadow-sm md:min-h-[350px] lg:min-h-[380px]  xl:min-h-[370px]  2xl:min-h-[280px]">
                  <div className="flex gap-1 mb-4 sm:mb-5">
                    {[...Array(testimonial.rating)].map((_, index) => (
                      <Image key={index} src="/icons/review-star.svg" alt="star" width={20} height={20} className="w-5 h-5" />
                    ))}
                  </div>
                  <p className="text-base sm:text-lg md:text-xl font-bold text-black mb-3 sm:mb-4 leading-snug">
                    {testimonial.title}
                  </p>
                  <p className="text-xs sm:text-sm md:text-base text-[#676767] mb-10 lg:mb-0 leading-relaxed  break-words whitespace-normal flex-grow">
                    {testimonial.review}
                  </p>
                  {testimonial.verified && (
                    <div className="flex items-center gap-2 mt-auto">
                      <Image src="/icons/verified-buyer.png" alt="Verified Buyer" width={120} height={24} />
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
      </div>
    </section>
  )
}

export default Testimonials
