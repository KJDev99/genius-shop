import Image from 'next/image'
import React from 'react'
import Breadcrumb from '@/components/breadcrumb'
import HomeConsultation from '@/components/home/home-consultation'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata('guarantee')

// ─── Hero media: разные картинки для мобилки и ПК (/public/guarantee) ───────────
const HERO_MOBILE = '/guarantee/hero-mobile.png' // ← мобильный фон героя
const HERO_DESKTOP = '/guarantee/hero-desktop.png' // ← десктопный фон героя

const INTRO = {
    title: 'Надёжная гарантия на всю технику',
    text: 'Мы уверены в качестве продаваемой техники, поэтому предоставляем официальную гарантию на все устройства. Каждая покупка защищена сервисной поддержкой и возможностью ремонта или замены при обнаружении заводского дефекта.',
}

const OFFICIAL = {
    title: 'Официальная гарантия',
    text: 'На всю технику распространяется гарантия производителя. Срок гарантии зависит от устройства и может составлять от 6 до 12 месяцев.',
    listTitle: 'Гарантия действует на:',
    items: ['смартфоны', 'планшеты', 'ноутбуки', 'аксессуары и другую электронику'],
}

const INCLUDED = {
    title: 'Что входит в гарантию',
    text: 'Если в устройстве обнаружен заводской дефект, мы поможем решить проблему максимально быстро.',
    listTitle: 'Возможные решения:',
    items: [
        'бесплатный ремонт устройства',
        'замена комплектующих',
        'замена устройства при серьёзном дефекте',
    ],
}

const STEPS = [
    {
        num: '01',
        title: 'Обратитесь в магазин',
        text: 'Свяжитесь с нами или посетите магазин, чтобы сообщить о проблеме с устройством.',
    },
    {
        num: '02',
        title: 'Предоставьте подтверждение покупки',
        text: 'Покажите чек или другое подтверждение покупки для проверки гарантии.',
    },
    {
        num: '03',
        title: 'Передайте устройство на диагностику',
        text: 'Специалисты проверят устройство и определят характер неисправности.',
    },
    {
        num: '04',
        title: 'Получите решение',
        text: 'Мы предложим ремонт, замену устройства или другой оптимальный вариант.',
    },
]

const NOT_COVERED = {
    title: 'Когда гарантия не действует',
    listTitle: 'Гарантия не распространяется на случаи:',
    items: [
        'механические повреждения',
        'попадание влаги',
        'повреждения после самостоятельного ремонта',
        'использование неоригинальных аксессуаров',
    ],
}

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

export default function GuaranteePage() {
    return (
        <>
            <main className="px-4 lg:px-0 lg:w-360 mx-auto mb-12">
                {/* Breadcrumb */}
                <div className="mb-4">
                    <Breadcrumb
                        items={[
                            { name: 'Главная', href: '/' },
                            { name: 'Гарантия' },
                        ]}
                    />
                </div>

                {/* Hero — на мобилке h-460, разные фоны для мобилки и ПК */}
                <section className="relative overflow-hidden rounded-[20px] h-[460px] lg:h-[600px] bg-[#C47427] mb-8 lg:mb-10">
                    <Image
                        src={HERO_MOBILE}
                        alt="Гарантия на всю технику"
                        fill
                        priority
                        unoptimized
                        sizes="100vw"
                        className="object-cover lg:hidden"
                        quality={100}
                    />
                    <Image
                        src={HERO_DESKTOP}
                        alt="Гарантия на всю технику"
                        fill
                        priority
                        unoptimized
                        sizes="(max-width: 1024px) 100vw, 1440px"
                        className="object-cover hidden lg:block"
                        quality={100}
                    />
                    <div className="relative z-10 h-full flex flex-col max-md:text-center md:justify-center p-6 sm:p-10 lg:p-16 ">
                        <h1 className="text-white font-semibold text-[26px] sm:text-[48px] lg:text-[64px] leading-tight mb-3">
                            Гарантия на всю технику
                        </h1>
                        <p className="text-white/90 text-base lg:text-2xl font-medium max-w-[620px]">
                            Только оригинальные устройства и официальная проверка перед
                            продажей.
                        </p>
                    </div>
                </section>

                {/* Intro */}
                <section className="bg-white rounded-[20px] p-6 lg:p-8 mb-4 lg:mb-6">
                    <h2 className="text-[#222222] font-bold text-[24px] sm:text-[32px] lg:text-[40px] mb-4">
                        {INTRO.title}
                    </h2>
                    <p className="text-[#444444] text-base lg:text-lg leading-[160%]">
                        {INTRO.text}
                    </p>
                </section>

                {/* Официальная гарантия + Что входит — две карточки */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-4 lg:mb-6">
                    {[OFFICIAL, INCLUDED].map((block) => (
                        <section
                            key={block.title}
                            className="bg-white rounded-[20px] p-6 lg:p-8 flex flex-col gap-4"
                        >
                            <h2 className="text-[#222222] font-bold text-[22px] lg:text-[28px]">
                                {block.title}
                            </h2>
                            <p className="text-[#444444] text-base lg:text-lg leading-[160%]">
                                {block.text}
                            </p>
                            <div>
                                <h3 className="text-[#222222] font-semibold text-base lg:text-lg mb-3">
                                    {block.listTitle}
                                </h3>
                                <Bullets items={block.items} />
                            </div>
                        </section>
                    ))}
                </div>

                {/* Как работает гарантия — шаги */}
                <section className="bg-white rounded-[20px] p-6 lg:p-8 mb-4 lg:mb-6">
                    <h2 className="text-[#222222] font-bold text-[28px] sm:text-[36px] lg:text-[50px] mb-6 lg:mb-8">
                        Как работает гарантия
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
                        {STEPS.map((s) => (
                            <div
                                key={s.num}
                                className="bg-[#F4F4FA] rounded-[20px] p-6 flex flex-col gap-3"
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

                {/* Когда гарантия не действует */}
                <section className="bg-white rounded-[20px] p-6 lg:p-8">
                    <h2 className="text-[#222222] font-bold text-[22px] lg:text-[28px] mb-4">
                        {NOT_COVERED.title}
                    </h2>
                    <h3 className="text-[#222222] font-semibold text-base lg:text-lg mb-3">
                        {NOT_COVERED.listTitle}
                    </h3>
                    <Bullets items={NOT_COVERED.items} />
                </section>
            </main>

            {/* Consultation banner */}
            <HomeConsultation />
        </>
    )
}
