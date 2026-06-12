import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function HomeAbout() {
    return (
        <div className="px-4 lg:px-0 lg:w-360 mx-auto mt-20">
            <div
                className="rounded-[20px] bg-white flex items-center bg-cover bg-center h-auto lg:h-[734px] py-10 lg:py-0 bg-[url('/imgs/homeaboutmobile.webp')] lg:bg-[url('/imgs/homeabout.webp')]"
            >
                <div className="flex flex-col items-end w-full px-4 lg:pr-10 gap-6">
                    <div className="lg:max-w-[638px] px-6 py-4 rounded-[20px] bg-white/10 backdrop-blur-md text-white">
                        <h2 className="text-[32px] sm:text-[40px] lg:text-[50px] font-bold mb-6">О компании</h2>
                        <p className="text-base lg:text-lg font-medium mb-6">
                            Genius Store — магазин оригинальной техники Apple. Мы предлагаем только проверенные устройства: iPhone, AirPods, Apple Watch и другую технику Apple. Каждое устройство проходит диагностику перед продажей, поэтому вы получаете полностью исправную и качественную технику.
                        </p>
                        <Link
                            href="/about"
                            className="bg-white w-[228px] max-md:w-full h-[56px] rounded-[20px] text-[#222222] flex items-center justify-center hover:bg-[#D4A63A] transition-colors duration-200 group"
                        >
                            <p className="text-lg font-semibold">Подробнее</p>
                            <Image
                                src="/icons/arrow-narrow-right.svg"
                                alt=""
                                width={24}
                                height={24}
                                className="ml-4 transition-transform duration-200 group-hover:translate-x-1"
                            />
                        </Link>
                    </div>
                    <div className="lg:max-w-[638px] px-6 py-4 rounded-[20px] bg-white text-black">
                        <h2 className="text-[28px] sm:text-[40px] lg:text-[50px] font-bold mb-6 text-nowrap">Сервис и гарантия</h2>
                        <p className="text-base lg:text-lg font-medium mb-6">
                            Мы не только продаём технику, но и занимаемся её ремонтом. Наш специалист может приехать к вам в удобное время и место, чтобы забрать устройство.
                        </p>
                        <Link
                            href="/servics"
                            className="bg-[#D4A63A] w-[228px] max-md:w-full h-[56px] rounded-[20px] text-[#222222] flex items-center justify-center hover:brightness-95 active:brightness-90 transition group"
                        >
                            <p className="text-lg font-semibold">Подробнее</p>
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
            </div>
        </div>
    )
}
