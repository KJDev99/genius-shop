import Image from 'next/image'
import React from 'react'
import Breadcrumb from '@/components/breadcrumb'
import HomeConsultation from '@/components/home/home-consultation'

// ─── Media: положите файлы в /public/plan и при необходимости поменяйте имена ───
// Hero: на мобилке одна картинка, на ПК — другая.
const HERO_MOBILE = '/plan/hero-mobile.png' // ← мобильная картинка героя
const HERO_DESKTOP = '/plan/hero-desktop.png' // ← десктопная картинка героя
// Логотипы банков-партнёров одной полосой
const BANKS_IMG = '/plan/banks.png'

// Преимущества (иконки из /public/plan)
const BENEFITS = [
    {
        icon: '/plan/benefit-money.svg',
        title: 'Без больших затрат',
        text: 'Не нужно сразу оплачивать полную стоимость устройства.',
    },
    {
        icon: '/plan/benefit-clipboard.svg',
        title: 'Быстрое оформление',
        text: 'Решение по заявке принимается за несколько минут.',
    },
    {
        icon: '/plan/benefit-smartphone.svg',
        title: 'Доступность техники',
        text: 'Можно купить нужное устройство уже сегодня.',
    },
    {
        icon: '/plan/benefit-graph.svg',
        title: 'Прозрачные условия',
        text: 'Без скрытых комиссий и неожиданных платежей.',
    },
]

const STEPS = [
    {
        num: '01',
        title: 'Выберите устройство',
        text: 'Выберите нужную технику в каталоге или в магазине.',
    },
    {
        num: '02',
        title: 'Оформите заявку',
        text: 'Наш менеджер поможет оформить рассрочку или кредит.',
    },
    {
        num: '03',
        title: 'Получите одобрение',
        text: 'Банк рассматривает заявку в течение нескольких минут.',
    },
    {
        num: '04',
        title: 'Заберите устройство',
        text: 'Получите технику сразу после одобрения.',
    },
]

export default function PlanPage() {
    return (
        <>
            <main className="px-4 lg:px-0 lg:w-360 mx-auto mb-12">
                {/* Breadcrumb */}
                <div className="mb-4">
                    <Breadcrumb
                        items={[
                            { name: 'Главная', href: '/' },
                            { name: 'Рассрочка и кредит' },
                        ]}
                    />
                </div>

                {/* Hero — разные изображения для мобилки и ПК */}
                <section className="relative rounded-[20px] overflow-hidden h-[460px] lg:h-[440px] bg-[#222222] mb-10 lg:mb-14">
                    <Image
                        src={HERO_MOBILE}
                        alt="Рассрочка и кредит"
                        fill
                        priority
                        unoptimized
                        sizes="100vw"
                        className="object-cover lg:hidden"
                    />
                    <Image
                        src={HERO_DESKTOP}
                        alt="Рассрочка и кредит"
                        fill
                        priority
                        unoptimized
                        sizes="(max-width: 1024px) 100vw, 1440px"
                        className="object-cover hidden lg:block"
                    />
                    {/* затемнение для читаемости текста */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
                    <div className="relative z-10 h-full flex flex-col justify-center p-6 sm:p-10 lg:p-16 max-w-[640px]">
                        <h1 className="text-white font-bold text-[32px] sm:text-[44px] lg:text-[56px] leading-tight mb-3">
                            Рассрочка и кредит
                        </h1>
                        <p className="text-white/90 text-lg lg:text-2xl font-medium">
                            Покупайте технику сейчас — платите позже.
                        </p>
                    </div>
                </section>

                {/* Преимущества */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mb-10 lg:mb-14">
                    {BENEFITS.map((b) => (
                        <div
                            key={b.title}
                            className="bg-white rounded-[20px] p-6 flex flex-col gap-4"
                        >
                            <span className="w-14 h-14 rounded-[16px] bg-[#D4A63A]/15 flex items-center justify-center">
                                <Image
                                    src={b.icon}
                                    alt=""
                                    width={32}
                                    height={32}
                                    unoptimized
                                />
                            </span>
                            <h3 className="text-[#222222] font-bold text-lg lg:text-xl">
                                {b.title}
                            </h3>
                            <p className="text-[#888888] text-sm lg:text-base leading-[150%]">
                                {b.text}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Банки партнёры */}
                <section className="bg-white rounded-[20px] p-6 lg:p-8 mb-10 lg:mb-14">
                    <h2 className="text-[#222222] font-bold text-[28px] sm:text-[36px] lg:text-[44px] mb-6">
                        Банки партнеры
                    </h2>
                    <Image
                        src={BANKS_IMG}
                        alt="Банки партнёры"
                        width={1392}
                        height={120}
                        unoptimized
                        className="w-full h-auto object-contain"
                    />
                </section>

                {/* Как оформить рассрочку */}
                <section>
                    <h2 className="text-[#222222] font-bold text-[28px] sm:text-[36px] lg:text-[50px] mb-6 lg:mb-8">
                        Как оформить рассрочку
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
                        {STEPS.map((s) => (
                            <div
                                key={s.num}
                                className="bg-white rounded-[20px] p-6 flex flex-col gap-3"
                            >
                                <span className="text-[#D4A63A] font-bold text-[40px] lg:text-[48px] leading-none">
                                    {s.num}
                                </span>
                                <h3 className="text-[#222222] font-bold text-lg lg:text-xl">
                                    {s.title}
                                </h3>
                                <p className="text-[#888888] text-sm lg:text-base leading-[150%]">
                                    {s.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Consultation banner */}
            <HomeConsultation />
        </>
    )
}
