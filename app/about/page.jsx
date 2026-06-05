import Image from 'next/image'
import React from 'react'
import Breadcrumb from '@/components/breadcrumb'
import Advantages from '@/components/advantages'
import HomeConsultation from '@/components/home/home-consultation'

// ─── Hero media: разные картинки для мобилки и ПК (/public/about) ───────────────
const HERO_MOBILE = '/about/hero-mobile.png'
const HERO_DESKTOP = '/about/hero-desktop.png'

export default function AboutPage() {
    return (
        <>
            <main className="px-4 lg:px-0 lg:w-360 mx-auto mb-10 md:mb-20 ">
                <div className="mb-4">
                    <Breadcrumb
                        items={[{ name: 'Главная', href: '/' }, { name: 'О нас' }]}
                    />
                </div>

                {/* Hero */}
                <section className="relative overflow-hidden rounded-[20px] h-[460px] lg:h-[600px] bg-[#C47427] mb-8 lg:mb-10">
                    <Image
                        src={HERO_MOBILE}
                        alt="Genius Store"
                        fill
                        priority
                        unoptimized
                        sizes="100vw"
                        className="object-cover lg:hidden"
                        quality={100}
                    />
                    <Image
                        src={HERO_DESKTOP}
                        alt="Genius Store"
                        fill
                        priority
                        unoptimized
                        sizes="(max-width: 1024px) 100vw, 1440px"
                        className="object-cover hidden lg:block"
                        quality={100}
                    />
                    <div className="relative z-10 h-full flex flex-col max-md:text-center md:justify-center p-6 sm:p-10 lg:p-16 max-w-[866px] md:ml-auto text-center">
                        <h1 className="text-white font-semibold text-[26px] sm:text-[48px] lg:text-[60px] leading-tight mb-3">
                            Genius Store — магазин оригинальной техники Apple.
                        </h1>
                    </div>
                </section>

                {/* Миссия */}


                <div className=" lg:px-0 lg:w-360 mx-auto my-20 max-md:my-10">
                    <div
                        className="rounded-[20px] bg-white flex items-center bg-cover bg-center h-auto lg:h-100 py-4 lg:py-0 bg-[url('/about/about-mobile.png')] lg:bg-[url('/about/about-pc.png')]"
                    >
                        <div className="flex flex-col items-start w-full px-4 lg:pl-6 gap-6">
                            <div className="lg:max-w-[638px] px-6 py-4  rounded-[20px] bg-white/10 backdrop-blur-md text-white">
                                <h2 className="text-[32px] sm:text-[40px] lg:text-[50px] font-bold mb-6">Наша миссия</h2>
                                <p className="text-base lg:text-lg font-medium leading-[120%]">
                                    Мы делаем современные технологии доступными и понятными для каждого.
                                    Genius Store — это место, где можно приобрести оригинальную технику с гарантией, честными ценами и удобным сервисом.
                                    Мы стремимся создавать комфортный опыт покупки и помогать клиентам выбирать лучшие устройства для жизни и работы.
                                </p>

                            </div>

                        </div>
                    </div>
                </div>

                {/* Преимущества */}
                <div >
                    <Advantages />
                </div>

                {/* Бренды */}
                <section className="">
                    <h2 className="text-[#222222] font-bold text-[24px] sm:text-[32px] lg:text-[40px] mb-6">
                        Бренды
                    </h2>
                    <div className="grid grid-cols-3 gap-6 max-md:gap-3 max-md:flex max-md:overflow-x-auto max-md:scrollbar-hide">
                        <div className="bg-white rounded-2xl flex items-center justify-center p-4 h-[166px] max-md:shrink-0 max-md:px-7.5 max-md:py-3 max-md:h-25">
                            <Image
                                src="/about/brand1.png"
                                alt="Apple"
                                width={200}
                                height={100}
                                className="object-contain max-md:w-full "
                            />
                        </div>
                        <div className="bg-white rounded-2xl flex items-center justify-center p-4 h-[166px] max-md:shrink-0 max-md:px-7.5 max-md:py-3 max-md:h-25">
                            <Image
                                src="/about/brand2.png"
                                alt="Apple"
                                width={200}
                                height={100}
                                className="object-contain max-md:w-full "
                            />
                        </div>
                        <div className="bg-white rounded-2xl flex items-center justify-center p-4 h-[166px] max-md:shrink-0 max-md:px-7.5 max-md:py-3 max-md:h-25">
                            <Image
                                src="/about/brnad3.png"
                                alt="Apple"
                                width={200}
                                height={100}
                                className="object-contain max-md:w-full "
                            />
                        </div>
                    </div>
                </section>
            </main>

            <HomeConsultation />
        </>
    )
}
