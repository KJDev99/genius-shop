import Image from 'next/image'
import React from 'react'
import Breadcrumb from '@/components/breadcrumb'
import Advantages from '@/components/advantages'
import HomeConsultation from '@/components/home/home-consultation'

// ─── Hero media: разные картинки для мобилки и ПК (/public/about) ───────────────
const HERO_MOBILE = '/about/hero-mobile.png'
const HERO_DESKTOP = '/about/hero-desktop.png'
const BRANDS_IMG = '/about/brands.png'

const MISSION =
    'Мы делаем современные технологии доступными и понятными для каждого. Genius Store — это место, где можно приобрести оригинальную технику с гарантией, честными ценами и удобным сервисом. Мы стремимся создавать комфортный опыт покупки и помогать клиентам выбирать лучшие устройства для жизни и работы.'

export default function AboutPage() {
    return (
        <>
            <main className="px-4 lg:px-0 lg:w-360 mx-auto mb-12">
                <div className="mb-4">
                    <Breadcrumb
                        items={[{ name: 'Главная', href: '/' }, { name: 'О нас' }]}
                    />
                </div>

                {/* Hero */}
                <section className="relative overflow-hidden rounded-[20px] h-[460px] lg:h-[560px] bg-[#C47427] mb-8 lg:mb-10">
                    <Image
                        src={HERO_MOBILE}
                        alt="Genius Store"
                        fill
                        priority
                        unoptimized
                        sizes="100vw"
                        className="object-cover lg:hidden"
                    />
                    <Image
                        src={HERO_DESKTOP}
                        alt="Genius Store"
                        fill
                        priority
                        unoptimized
                        sizes="(max-width: 1024px) 100vw, 1440px"
                        className="object-cover hidden lg:block"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
                    <div className="relative z-10 h-full flex flex-col justify-end lg:justify-center p-6 sm:p-10 lg:p-16 max-w-[760px]">
                        <h1 className="text-white font-bold text-[32px] sm:text-[44px] lg:text-[56px] leading-tight">
                            Genius Store — магазин оригинальной техники Apple.
                        </h1>
                    </div>
                </section>

                {/* Миссия */}
                <section className="bg-white rounded-[20px] p-6 lg:p-8 mb-10 lg:mb-14">
                    <h2 className="text-[#222222] font-bold text-[24px] sm:text-[32px] lg:text-[40px] mb-4">
                        Наша миссия
                    </h2>
                    <p className="text-[#444444] text-base lg:text-lg leading-[160%] whitespace-pre-line">
                        {MISSION}
                    </p>
                </section>

                {/* Преимущества */}
                <div className="mb-10 lg:mb-14">
                    <Advantages />
                </div>

                {/* Бренды */}
                <section className="bg-white rounded-[20px] p-6 lg:p-8">
                    <h2 className="text-[#222222] font-bold text-[24px] sm:text-[32px] lg:text-[40px] mb-6">
                        Бренды
                    </h2>
                    <Image
                        src={BRANDS_IMG}
                        alt="Бренды"
                        width={1392}
                        height={120}
                        unoptimized
                        className="w-full h-auto object-contain"
                    />
                </section>
            </main>

            <HomeConsultation />
        </>
    )
}
