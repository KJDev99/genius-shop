import React from 'react'
import HeroServices from './home/hero-services'
import Link from 'next/link'
import Image from 'next/image'
const SERVICES = [
    {
        title: 'Гарантия магазина',
        text: 'Предоставляем гарантию до 365 дней на технику.',
        img: '/imgs/heroservices1.png',
        href: '/guarantee',
    },
    {
        title: 'Выездной сервис',
        text: 'Наш специалист приедет в удобное время и место.',
        img: '/imgs/heroservices2.png',
        href: '/servics',
    },
    {
        title: 'Быстрая доставка',
        text: 'Доставка по Санкт-Петербургу в день заказа или самовывоз.',
        img: '/imgs/heroservices3.png',
        href: '/delivery',
    },
    {
        title: 'Trade-in техники',
        text: 'Обменяйте старое устройство на новое с выгодой.',
        img: '/imgs/heroservices4.png',
        href: '/trade-in',
    },
]

export default function Advantages() {
    return (
        <section>
            <h2 className="text-[#222222] font-bold text-[28px] sm:text-[36px] lg:text-[50px] mb-6 lg:mb-8">
                Наши преимущества
            </h2>
            <div className="lg:w-360 mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-x-6 max-md:mb-10 mb-20">
                {SERVICES.map((s) => (
                    <Link
                        key={s.title}
                        href={s.href}
                        className="group flex flex-col rounded-[20px] bg-white p-4 transition-shadow duration-200 hover:shadow-[0_4px_15.8px_0_rgba(0,0,0,0.10)]"
                    >
                        <Image
                            src={s.img}
                            alt={s.title}
                            width={82}
                            height={82}
                            className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                        />
                        <h2 className="my-4 text-[#222222] text-[18px] lg:text-[20px] font-semibold group-hover:text-[#D4A63A] transition-colors duration-150">
                            {s.title}
                        </h2>
                        <p className="text-[#444444] text-base lg:text-lg leading-[120%]">{s.text}</p>
                    </Link>
                ))}
            </div>
        </section>
    )
}
