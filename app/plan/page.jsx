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
        icon: '/plan/benefit.svg',
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
                <section className="relative overflow-hidden rounded-[20px] h-[460px] lg:h-[600px] bg-[#C47427] mb-8 lg:mb-10">
                    <Image
                        src={HERO_MOBILE}
                        alt="Рассрочка и кредит"
                        fill
                        priority
                        unoptimized
                        sizes="100vw"
                        className="object-cover lg:hidden"
                        quality={100}
                    />
                    <Image
                        src={HERO_DESKTOP}
                        alt="Рассрочка и кредит"
                        fill
                        priority
                        unoptimized
                        sizes="(max-width: 1024px) 100vw, 1440px"
                        className="object-cover hidden lg:block"
                        quality={100}
                    />
                    <div className="relative z-10 h-full flex flex-col max-md:text-center md:justify-center p-6 sm:p-10 lg:p-16 ">
                        <h1 className="text-white font-semibold text-[26px] sm:text-[48px] lg:text-[64px] leading-tight mb-3">
                            Рассрочка и кредит
                        </h1>
                        <p className="text-white/90 text-base lg:text-2xl font-medium ">
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
                            <Image
                                src={b.icon}
                                alt=""
                                width={64}
                                height={64}
                                unoptimized
                                className="w-16 h-16 max-md:w-12 max-md:h-12 object-contain"
                            />

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
                    <div className="flex flex-wrap gap-4">
                        <Image
                            src="/plan/bank1.svg"
                            alt="Банк 1"
                            width={1392}
                            height={120}
                            unoptimized
                            className="w-max h-20 max-md:h-10 object-contain"
                        />
                        <Image
                            src="/plan/bank2.svg"
                            alt="Банк 2"
                            width={1392}
                            height={120}
                            unoptimized
                            className="w-max h-20 max-md:h-10 object-contain"
                        />
                        <Image
                            src="/plan/bank3.svg"
                            alt="Банк 3"
                            width={1392}
                            height={120}
                            unoptimized
                            className="w-max h-20 max-md:h-10 object-contain"
                        />
                        <Image
                            src="/plan/bank4.svg"
                            alt="Банк 4"
                            width={1392}
                            height={120}
                            unoptimized
                            className="w-max h-20 max-md:h-10 object-contain"
                        />
                        <Image
                            src="/plan/bank5.svg"
                            alt="Банк 5"
                            width={1392}
                            height={120}
                            unoptimized
                            className="w-max h-20 max-md:h-10 object-contain"
                        />
                        <Image
                            src="/plan/bank6.svg"
                            alt="Банк 6"
                            width={1392}
                            height={120}
                            unoptimized
                            className="w-max h-20 max-md:h-10 object-contain"
                        />
                        <Image
                            src="/plan/bank7.svg"
                            alt="Банк 7"
                            width={1392}
                            height={120}
                            unoptimized
                            className="w-max h-20 max-md:h-10 object-contain"
                        />
                    </div>
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
