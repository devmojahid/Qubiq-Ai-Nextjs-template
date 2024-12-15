"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"

const testimonials = [
  {
    content: "This AI platform has revolutionized our content creation process. We're now 10x more efficient.",
    author: "Sarah Johnson",
    role: "Content Director",
    company: "TechCorp",
    image: "/testimonials/sarah.jpg"
  },
  {
    content: "The code generation feature is incredibly accurate and has significantly sped up our development cycle.",
    author: "Michael Chen",
    role: "Lead Developer",
    company: "DevStack",
    image: "/testimonials/michael.jpg"
  },
  {
    content: "The image generation capabilities are mind-blowing. It's like having a professional designer on demand.",
    author: "Emma Davis",
    role: "Creative Director",
    company: "ArtStudio",
    image: "/testimonials/emma.jpg"
  }
]

export function Testimonials() {
  const swiperRef = useRef(null)

  useEffect(() => {
    const swiper = swiperRef.current?.swiper
    if (swiper) {
      swiper.update()
    }
  }, [])

  return (
    <section className="bg-secondary/30 py-20 sm:py-32">
      <div className="container">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Trusted by Innovators Worldwide
        </h2>
        <Swiper
          ref={swiperRef}
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          className="mt-16"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="relative rounded-2xl border bg-background p-6 shadow-lg">
                <div className="relative z-20">
                  <div className="text-muted-foreground">
                    "{testimonial.content}"
                  </div>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
} 