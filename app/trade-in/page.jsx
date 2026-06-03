import Image from 'next/image'
import React from 'react'
import Breadcrumb from '@/components/breadcrumb'
import HomeConsultation from '@/components/home/home-consultation'
import RequestButton from '@/components/request-button'

// ─── Hero media: разные картинки для мобилки и ПК (/public/trade-in) ────────────
const HERO_MOBILE = '/trade-in/hero-mobile.png'
const HERO_DESKTOP = '/trade-in/hero-desktop.png'

const STEPS = [
    {
        num: '01',
        title: 'Оставьте заявку',
        text: 'Укажите модель вашего iPhone и его состояние, чтобы получить предварительную оценку.',
    },
    {
        num: '02',
        title: 'Узнайте стоимость',
        text: 'Мы быстро проверим устройство и назовём точную сумму, которую можно использовать как скидку.',
    },
    {
        num: '03',
        title: 'Передайте старый iPhone',
        text: 'Принесите устройство в магазин или передайте его при покупке нового.',
    },
    {
        num: '04',
        title: 'Новый iPhone со скидкой',
        text: 'Стоимость старого устройства будет учтена при покупке нового iPhone.',
    },
]

function Bullets({ items }) {
    return (
        <ul className="flex flex-col gap-2">
            {items.map((item) => (
                <li
                    key={item}
                    className="text-[#444444] text-sm lg:text-base flex gap-2 leading-[150%]"
                >
                    <span className="text-[#D4A63A]">—</span>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    )
}

export default function TradeInPage() {
    return (
        <>
            <main className="px-4 lg:px-0 lg:w-360 mx-auto mb-12">
                <div className="mb-4">
                    <Breadcrumb
                        items={[{ name: 'Главная', href: '/' }, { name: 'Трейд-ин' }]}
                    />
                </div>

                {/* Hero */}
                <section className="relative overflow-hidden rounded-[20px] h-[460px] lg:h-[560px] bg-[#C47427] mb-10 lg:mb-14">
                    <Image
                        src={HERO_MOBILE}
                        alt="Трейд-ин"
                        fill
                        priority
                        unoptimized
                        sizes="100vw"
                        className="object-cover lg:hidden"
                    />
                    <Image
                        src={HERO_DESKTOP}
                        alt="Трейд-ин"
                        fill
                        priority
                        unoptimized
                        sizes="(max-width: 1024px) 100vw, 1440px"
                        className="object-cover hidden lg:block"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
                    <div className="relative z-10 h-full flex flex-col justify-end lg:justify-center p-6 sm:p-10 lg:p-16 max-w-[680px]">
                        <h1 className="text-white font-bold text-[30px] sm:text-[40px] lg:text-[52px] leading-tight mb-3">
                            Обменяйте старый iPhone на новый по выгодной цене
                        </h1>
                        <p className="text-white/90 text-base sm:text-lg lg:text-xl font-medium mb-6 max-w-[480px]">
                            Оценим ваш iPhone за несколько минут и предложим выгодную
                            скидку на новый.
                        </p>
                        <RequestButton
                            type="tradein"
                            label="Узнать стоимость"
                            className="self-start bg-[#D4A63A] text-[#222222] font-semibold px-8 py-3.5 rounded-[20px] hover:brightness-95 active:brightness-90 transition"
                        />
                    </div>
                </section>

                {/* Как работает трейд-ин */}
                <section className="mb-10 lg:mb-14">
                    <h2 className="text-[#222222] font-bold text-[28px] sm:text-[36px] lg:text-[50px] mb-6 lg:mb-8">
                        Как работает трейд-ин
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

                {/* Что важно знать перед оценкой */}
                <section>
                    <h2 className="text-[#222222] font-bold text-[24px] sm:text-[32px] lg:text-[40px] mb-6">
                        Что важно знать перед оценкой устройства
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                        {/* Какие устройства принимаем */}
                        <div className="bg-white rounded-[20px] p-6 lg:p-8 flex flex-col gap-4 lg:col-span-3">
                            <h3 className="text-[#222222] font-bold text-xl lg:text-2xl">
                                Какие устройства мы принимаем
                            </h3>
                            <Bullets
                                items={[
                                    'Apple — iPhone, iPad, Apple Watch',
                                    'Samsung — смартфоны серии Galaxy',
                                ]}
                            />
                            <p className="text-[#888888] text-sm lg:text-base">
                                Также возможна оценка устройств других брендов —
                                условия уточняются индивидуально.
                            </p>
                            <p className="text-[#444444] text-sm lg:text-base leading-[150%] whitespace-pre-line">
                                {
                                    'Мы принимаем устройства с небольшими следами использования: царапины, потертости, сниженная ёмкость аккумулятора.\nГлавное условие — устройство должно включаться и работать.'
                                }
                            </p>
                            <div>
                                <h4 className="text-[#222222] font-semibold text-base lg:text-lg mb-3">
                                    Не принимаем устройства:
                                </h4>
                                <Bullets
                                    items={[
                                        'полностью нерабочие',
                                        'после серьёзного попадания влаги',
                                        'с заблокированными аккаунтами',
                                    ]}
                                />
                            </div>
                        </div>

                        {/* Что влияет на стоимость */}
                        <div className="bg-white rounded-[20px] p-6 lg:p-8 flex flex-col gap-4 lg:col-span-2">
                            <h3 className="text-[#222222] font-bold text-xl lg:text-2xl">
                                Что влияет на стоимость
                            </h3>
                            <Bullets
                                items={[
                                    'Техническое состояние устройства',
                                    'Ёмкость аккумулятора',
                                    'Наличие коробки и аксессуаров',
                                    'Объём памяти',
                                    'Год выпуска модели',
                                ]}
                            />
                            <p className="text-[#888888] text-sm lg:text-base">
                                Оценка проводится по актуальным рыночным данным и
                                результатам диагностики устройства.
                            </p>
                        </div>

                        {/* Что взять с собой */}
                        <div className="bg-white rounded-[20px] p-6 lg:p-8 flex flex-col gap-4">
                            <h3 className="text-[#222222] font-bold text-xl lg:text-2xl">
                                Что нужно взять с собой
                            </h3>
                            <Bullets
                                items={[
                                    'Само устройство',
                                    'Документы (если есть)',
                                    'Коробку и комплектующие (если сохранились)',
                                    'Код разблокировки устройства',
                                ]}
                            />
                            <p className="text-[#888888] text-sm lg:text-base">
                                Без кода доступа провести диагностику устройства
                                невозможно.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <HomeConsultation />
        </>
    )
}
