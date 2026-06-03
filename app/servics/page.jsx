import Image from 'next/image'
import React from 'react'
import Breadcrumb from '@/components/breadcrumb'
import Advantages from '@/components/advantages'
import HomeConsultation from '@/components/home/home-consultation'
import RequestButton from '@/components/request-button'

// ─── Hero media: разные картинки для мобилки и ПК (/public/servics) ─────────────
const HERO_MOBILE = '/servics/hero-mobile.png'
const HERO_DESKTOP = '/servics/hero-desktop.png'

const SERVICES = [
    {
        title: 'Диагностика устройства',
        text: 'Точная проверка устройства и определение неисправности.',
        tag: 'Бесплатно при ремонте',
    },
    {
        title: 'Замена дисплея',
        text: 'Установка оригинальных и качественных дисплеев.',
        tag: 'Гарантия на работу',
    },
    {
        title: 'Замена аккумулятора',
        text: 'Вернём устройству автономность и стабильную работу.',
        tag: 'От 30 минут',
    },
    {
        title: 'Ремонт после воды',
        text: 'Восстановление устройства после попадания влаги.',
        tag: 'Полная диагностика',
    },
    {
        title: 'Ремонт материнских плат',
        text: 'Исправление сложных аппаратных неисправностей.',
        tag: 'Замена контроллеров',
    },
    {
        title: 'Установка защитных аксессуаров',
        text: 'Аккуратная установка защитных стекол и пленок без пузырей для защиты экрана.',
        tag: 'Подготовка устройства',
    },
]

export default function ServicsPage() {
    return (
        <>
            <main className="px-4 lg:px-0 lg:w-360 mx-auto mb-12">
                <div className="mb-4">
                    <Breadcrumb
                        items={[{ name: 'Главная', href: '/' }, { name: 'Сервис' }]}
                    />
                </div>

                {/* Hero */}
                <section className="relative overflow-hidden rounded-[20px] h-[460px] lg:h-[560px] bg-[#C47427] mb-10 lg:mb-14">
                    <Image
                        src={HERO_MOBILE}
                        alt="Сервис и ремонт техники"
                        fill
                        priority
                        unoptimized
                        sizes="100vw"
                        className="object-cover lg:hidden"
                    />
                    <Image
                        src={HERO_DESKTOP}
                        alt="Сервис и ремонт техники"
                        fill
                        priority
                        unoptimized
                        sizes="(max-width: 1024px) 100vw, 1440px"
                        className="object-cover hidden lg:block"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
                    <div className="relative z-10 h-full flex flex-col justify-end lg:justify-center p-6 sm:p-10 lg:p-16 max-w-[700px]">
                        <h1 className="text-white font-bold text-[32px] sm:text-[44px] lg:text-[56px] leading-tight mb-3">
                            Сервис и ремонт техники
                        </h1>
                        <p className="text-white/90 text-base sm:text-lg lg:text-xl font-medium mb-6 max-w-[520px]">
                            Ремонтируем смартфоны, планшеты и другую электронику. Наш
                            специалист может приехать к вам, чтобы забрать устройство и
                            передать его в сервис.
                        </p>
                        <RequestButton
                            type="repair"
                            label="Оставить заявку"
                            className="self-start bg-[#D4A63A] text-[#222222] font-semibold px-8 py-3.5 rounded-[20px] hover:brightness-95 active:brightness-90 transition"
                        />
                    </div>
                </section>

                {/* Услуги */}
                <section className="mb-10 lg:mb-14">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                        {SERVICES.map((s) => (
                            <div
                                key={s.title}
                                className="bg-white rounded-[20px] p-6 flex flex-col gap-3 h-full"
                            >
                                <h3 className="text-[#222222] font-bold text-lg lg:text-xl">
                                    {s.title}
                                </h3>
                                <p className="text-[#888888] text-sm lg:text-base leading-[150%] grow">
                                    {s.text}
                                </p>
                                <span className="mt-auto inline-flex w-fit items-center px-3 py-1.5 rounded-full bg-[#D4A63A]/15 text-[#B8862B] text-xs lg:text-sm font-medium">
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
