import Image from 'next/image'
import React from 'react'
import Breadcrumb from '@/components/breadcrumb'
import Advantages from '@/components/advantages'
import HomeConsultation from '@/components/home/home-consultation'
import RequestButton from '@/components/request-button'
import { IoCheckmark } from "react-icons/io5";
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata('service')

// ─── Hero media: разные картинки для мобилки и ПК (/public/servics) ─────────────
const HERO_MOBILE = '/servics/hero-mobile.png'
const HERO_DESKTOP = '/servics/hero-desktop.png'

const SERVICES = [
    {
        icon: '/servics/icon1.svg',
        title: 'Диагностика устройства',
        text: 'Точная проверка устройства и определение неисправности.',
        tag: 'Бесплатно при ремонте',
    },
    {
        icon: '/servics/icon2.svg',
        title: 'Замена дисплея',
        text: 'Установка оригинальных и качественных дисплеев.',
        tag: 'Гарантия на работу',
    },
    {
        icon: '/servics/icon3.svg',
        title: 'Замена аккумулятора',
        text: 'Вернём устройству автономность и стабильную работу.',
        tag: 'От 30 минут',
    },
    {
        icon: '/servics/icon4.svg',
        title: 'Ремонт после воды',
        text: 'Восстановление устройства после попадания влаги.',
        tag: 'Полная диагностика',
    },
    {
        icon: '/servics/icon5.svg',
        title: 'Ремонт материнских плат',
        text: 'Исправление сложных аппаратных неисправностей.',
        tag: 'Замена контроллеров',
    },
    {
        icon: '/servics/icon6.svg',
        title: 'Установка защитных аксессуаров',
        text: 'Аккуратная установка защитных стекол и пленок без пузырей для защиты экрана.',
        tag: 'Подготовка устройства',
    },
]

export default function ServicsPage() {
    return (
        <>
            <main className="px-4 lg:px-0 lg:w-360 mx-auto ">
                <div className="mb-4">
                    <Breadcrumb
                        items={[{ name: 'Главная', href: '/' }, { name: 'Сервис' }]}
                    />
                </div>

                {/* Hero */}
                <section className="relative overflow-hidden rounded-[20px] h-[460px] lg:h-[600px] bg-[#C47427] mb-8 lg:mb-10">
                    <Image
                        src={HERO_MOBILE}
                        alt="Сервис и ремонт техники"
                        fill
                        priority
                        unoptimized
                        sizes="100vw"
                        className="object-cover lg:hidden"
                        quality={100}
                    />
                    <Image
                        src={HERO_DESKTOP}
                        alt="Сервис и ремонт техники"
                        fill
                        priority
                        unoptimized
                        sizes="(max-width: 1024px) 100vw, 1440px"
                        className="object-cover hidden lg:block"
                        quality={100}
                    />
                    <div className="relative z-10 h-full flex flex-col max-md:text-center md:justify-center p-6 sm:p-10 lg:p-16 ">
                        <h1 className="text-white font-semibold text-[26px] sm:text-[48px] lg:text-[64px] leading-tight mb-3">
                            Сервис и ремонт техники
                        </h1>
                        <p className="text-white/90 text-base lg:text-2xl font-medium md:max-w-[732px]">
                            Ремонтируем смартфоны, планшеты и другую электронику. Наш
                            специалист может приехать к вам, чтобы забрать устройство и
                            передать его в сервис.
                        </p>
                        <RequestButton
                            type="repair"
                            label="Оставить заявку"
                            className="self-start bg-[#fff] max-md:w-full mt-6 max-md:mt-3 text-[#222222] font-semibold px-8 py-3.5 rounded-[20px] hover:brightness-95 active:brightness-90 transition"
                        />
                    </div>
                </section>

                {/* Услуги */}
                <section className="mb-10 lg:mb-14">
                    <h2 className="text-[#222222] font-bold text-[28px] sm:text-[36px] lg:text-[50px] mb-6 lg:mb-8">
                        Услуги сервиса
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                        {SERVICES.map((s) => (
                            <div
                                key={s.title}
                                className="bg-white rounded-[20px] p-6 flex flex-col gap-3 h-full"
                            >
                                <Image
                                    src={s.icon}
                                    alt={s.title}
                                    width={64}
                                    height={64}
                                    unoptimized
                                    className="w-16 h-16 max-md:w-12 max-md:h-12 object-contain"
                                />
                                <h3 className="text-[#222222] font-bold text-lg lg:text-xl">
                                    {s.title}
                                </h3>
                                <p className="text-[#444444] text-sm lg:text-base leading-[130%] grow">
                                    {s.text}
                                </p>
                                <span className="mt-auto inline-flex w-fit items-center px-3 py-1.5 rounded-full text-[#00B04B] border border-[#00B04B] text-xs lg:text-sm font-medium">
                                    <IoCheckmark className="mr-1 text-2xl" />
                                    {s.tag}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Преимущества */}
                <Advantages />
            </main>

            <HomeConsultation />
        </>
    )
}
