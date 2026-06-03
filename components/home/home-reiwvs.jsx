'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { ReviewCard } from '@/components/review-card'

const API = 'https://admin.geniusstorerf.ru/api'

export default function HomeReiwvs() {
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        let cancelled = false
        async function load() {
            try {
                const res = await fetch(`${API}/reviews`)
                const data = res.ok ? await res.json() : {}
                if (!cancelled) setReviews(data.data || [])
            } catch {
                if (!cancelled) setReviews([])
            }
        }
        load()
        return () => {
            cancelled = true
        }
    }, [])

    if (reviews.length === 0) return null

    return (
        <div className="px-4 lg:px-0 lg:w-360 mx-auto mb-20 max-md:w-full">
            <div className="flex flex-wrap gap-4 justify-between items-center mb-6 lg:mb-8">
                <h2 className="text-[#222222] font-bold text-[32px] sm:text-[40px] lg:text-[50px]">
                    Отзывы о нас
                </h2>
                <Link
                    href="/review"
                    className="bg-[#D4A63A] px-6 h-12 lg:h-15 rounded-[20px] text-[#222222] flex items-center justify-center hover:brightness-95 active:brightness-90 transition"
                >
                    <p className="text-base lg:text-lg font-semibold">Все отзывы</p>
                    <Image
                        src="/icons/arrow-narrow-right.svg"
                        alt=""
                        width={24}
                        height={24}
                        className="ml-2.5"
                    />
                </Link>
            </div>

            <Swiper
                modules={[Pagination]}
                spaceBetween={24}
                slidesPerView={1.1}
                breakpoints={{
                    640: { slidesPerView: 2, spaceBetween: 16 },
                    1024: { slidesPerView: 3, spaceBetween: 24 },
                }}
                pagination={{
                    clickable: true,
                    bulletClass:
                        'inline-block h-2.5 w-2.5 rounded-sm bg-white mx-1 cursor-pointer transition-all duration-200',
                    bulletActiveClass: '!w-10 !bg-[#D4A63A]',
                }}
                className="!pb-12"
            >
                {reviews.map((review) => (
                    <SwiperSlide key={review.id} className="h-auto">
                        <ReviewCard review={review} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
