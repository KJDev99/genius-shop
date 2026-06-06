'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const API = 'https://admin.geniusstorerf.ru/api'

// Один слайд героя. Картинка, заголовок и описание приходят с бэкенда (/api/banner),
// внешний вид — как у hero на странице сервиса.
function HeroSlide({ banner, priority }) {
    return (
        <section className="relative overflow-hidden rounded-[20px] h-[460px] lg:h-[600px] bg-[#C47427]">
            {banner.img_mobile && (
                <Image
                    src={banner.img_mobile}
                    alt={banner.title || ''}
                    fill
                    priority={priority}
                    unoptimized
                    sizes="100vw"
                    className="object-cover lg:hidden"
                    quality={100}
                />
            )}
            {banner.img_pc && (
                <Image
                    src={banner.img_pc}
                    alt={banner.title || ''}
                    fill
                    priority={priority}
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 1440px"
                    className="object-cover hidden lg:block"
                    quality={100}
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

export default function Hero() {
    const [banners, setBanners] = useState([])

    useEffect(() => {
        let cancelled = false
        fetch(`${API}/banner`)
            .then((res) => res.json())
            .then((data) => {
                if (cancelled) return
                setBanners(Array.isArray(data) ? data : [])
            })
            .catch(() => {})
        return () => {
            cancelled = true
        }
    }, [])

    return (
        <div className="px-4 lg:px-0 lg:w-360 mx-auto my-6">
            {banners.length === 0 ? (
                // Заглушка нужной высоты, пока баннеры грузятся (без прыжка верстки).
                <div className="rounded-[20px] h-[460px] lg:h-[600px] bg-[#C47427]" />
            ) : (
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
                            <HeroSlide banner={b} priority={i === 0} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    )
}
