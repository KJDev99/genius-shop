'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const BANNERS = [
    {
        id: 1,
        title: 'IPHONE 17 PRO MAX',
        subtitle: 'Новый уровень мощности, камеры и скорости.',
        img: '/imgs/hero.png',
        href: '/catalog',
        cta: 'Смотреть каталог',
        textColor: 'text-white',
    },
    {
        id: 2,
        title: 'MACBOOK AIR M4',
        subtitle: 'Лёгкий, быстрый, бесшумный.',
        img: '/imgs/hero.png',
        href: '/catalog',
        cta: 'Подробнее',
        textColor: 'text-white',
    },
    {
        id: 3,
        title: 'APPLE WATCH ULTRA 3',
        subtitle: 'Для тех, кто живёт на максимуме.',
        img: '/imgs/hero.png',
        href: '/catalog',
        cta: 'Подробнее',
        textColor: 'text-white',
    },
]

export default function Hero() {
    return (
        <div className="px-4 lg:px-0 lg:w-360 mx-auto my-6">
            <Swiper
                modules={[Pagination, Autoplay]}
                loop
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                pagination={{
                    clickable: true,
                    bulletClass: 'inline-block h-2.5 w-2.5 rounded-sm bg-white/60 mx-1 cursor-pointer transition-all duration-200',
                    bulletActiveClass: '!w-10 !bg-[#D4A63A]',
                }}
                className="rounded-[20px] !overflow-hidden"
            >
                {BANNERS.map((b) => (
                    <SwiperSlide key={b.id}>
                        <div
                            className="relative flex items-center bg-cover bg-center h-[420px] sm:h-[500px] lg:h-[600px] rounded-[20px]"
                            style={{ backgroundImage: `url(${b.img})` }}
                        >
                            <div className="flex flex-col pl-6 lg:pl-10 max-w-[680px]">
                                <h1
                                    className={`text-[36px] sm:text-[48px] lg:text-[64px] font-semibold leading-[1.05] ${b.textColor}`}
                                >
                                    {b.title}
                                </h1>
                                <p className={`text-base sm:text-lg lg:text-[24px] mt-4 mb-6 ${b.textColor}`}>
                                    {b.subtitle}
                                </p>
                                <Link
                                    href={b.href}
                                    className="bg-white w-[260px] lg:w-[300px] h-[52px] lg:h-[60px] rounded-[20px] text-[#222222] flex items-center justify-center hover:bg-[#D4A63A] transition-colors duration-200 group"
                                >
                                    <p className="text-base lg:text-lg font-semibold">{b.cta}</p>
                                    <Image
                                        src="/icons/arrow-narrow-right.svg"
                                        alt=""
                                        width={24}
                                        height={24}
                                        className="ml-4 transition-transform duration-200 group-hover:translate-x-1"
                                    />
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
