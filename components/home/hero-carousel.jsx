'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

// Один слайд героя. Картинка, заголовок и описание приходят с бэкенда (/api/banner).
// Первый слайд — LCP, поэтому его картинки грузятся eager + fetchPriority=high.
function HeroSlide({ banner, eager }) {
    return (
        <section className="relative overflow-hidden rounded-[20px] h-[460px] lg:h-[600px] bg-[#C47427]">
            {banner.img_mobile && (
                <Image
                    src={banner.img_mobile}
                    alt={banner.title || ''}
                    fill
                    sizes="100vw"
                    loading={eager ? 'eager' : 'lazy'}
                    className="object-cover lg:hidden"
                />
            )}
            {banner.img_pc && (
                <Image
                    src={banner.img_pc}
                    alt={banner.title || ''}
                    fill
                    sizes="(max-width: 1024px) 100vw, 1440px"
                    loading={eager ? 'eager' : 'lazy'}
                    className="object-cover hidden lg:block"
                />
            )}
            <div className="relative z-10 h-full flex flex-col max-md:text-center md:justify-center p-6 sm:p-10 lg:p-16">
                <h1 className="text-white font-semibold text-[26px] sm:text-[48px] lg:text-[64px] leading-tight mb-3">
                    {banner.title}
                </h1>
                {banner.description && (
                    <p className="text-white/90 text-base lg:text-2xl font-medium md:max-w-[732px]">
                        {banner.description}
                    </p>
                )}
                <Link
                    href="/catalog"
                    className="self-start max-md:w-full bg-white mt-6 max-md:mt-3 text-[#222222] font-semibold px-8 py-3.5 rounded-[20px] flex items-center justify-center hover:bg-[#D4A63A] transition-colors duration-200"
                >
                    <span className="text-base lg:text-lg font-semibold">
                        Смотреть каталог
                    </span>
                </Link>
            </div>
        </section>
    )
}

export default function HeroCarousel({ banners }) {
    return (
        <Swiper
            modules={[Pagination, Autoplay]}
            loop={banners.length > 1}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            pagination={{
                clickable: true,
                bulletClass:
                    'inline-block h-2.5 w-2.5 rounded-sm bg-white/60 mx-1 cursor-pointer transition-all duration-200',
                bulletActiveClass: '!w-10 !bg-[#D4A63A]',
            }}
            className="rounded-[20px] !overflow-hidden"
        >
            {banners.map((b, i) => (
                <SwiperSlide key={b.id}>
                    <HeroSlide banner={b} eager={i === 0} />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
