'use client'

import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import Breadcrumb from '@/components/breadcrumb'
import HomeConsultation from '@/components/home/home-consultation'

// ─── Media (положите файлы в /public/delivery, имена можно поменять здесь) ──────
// Hero: на мобилке одна картинка, на ПК — другая.
const HERO_MOBILE = '/delivery/hero-mobile.png' // ← мобильный фон героя
const HERO_DESKTOP = '/delivery/hero-desktop.png' // ← десктопный фон героя

const METHODS = [
    {
        image: '/delivery/courier.png',
        title: 'Курьерская доставка по городу',
        items: [
            'Доставим заказ в течение дня или к удобному времени',
            'Возможна передача заказа лично в руки',
            'Проверка товара при получении',
        ],
    },
    {
        image: '/delivery/pickup.png',
        title: 'Самовывоз',
        items: [
            'Забрать заказ можно в нашем магазине или пункте выдачи',
            'Возможность предварительного бронирования товара',
            'Быстрая выдача без ожидания',
        ],
    },
    {
        image: '/delivery/russia.png',
        title: 'Доставка по России',
        items: [
            'Отправляем заказы по всей России',
            'Работаем с СДЭК и другими транспортными компаниями',
            'Отправка в день заказа при наличии товара',
        ],
    },
    {
        image: '/delivery/express.png',
        title: 'Экспресс-доставка',
        items: [
            'Для срочных заказов',
            'Доставка в течение нескольких часов (при наличии товара)',
        ],
    },
]

const PAYMENT = {
    intro: 'Мы предлагаем несколько удобных способов доставки и получения заказа.',
    groups: [
        {
            title: 'Оплата при получении',
            items: [
                'Оплата наличными курьеру',
                'Оплата банковской картой через терминал (если доступно)',
                'Возможность проверить устройство перед оплатой',
            ],
        },
        {
            title: 'Онлайн-оплата',
            items: [
                'Оплата банковской картой на сайте',
                'Быстрые платежи через СБП',
                'Поддержка электронных кошельков',
            ],
        },
        {
            title: 'Безналичная оплата для юридических лиц',
            items: [
                'Работаем с организациями и компаниями',
                'Предоставляем все необходимые закрывающие документы',
            ],
        },
        {
            title: 'Рассрочка и частичная оплата',
            items: [
                'Возможна рассрочка через партнёрские банки',
                'Доступен резерв товара по предоплате',
            ],
        },
    ],
}

const TERMS = {
    intro: 'Краткая информация о доставке и получении заказа',
    subtitle: 'Информация о доставке',
    items: [
        'Доставка по городу: от 1 до 3 часов',
        'Доставка по России: 1–7 дней (в зависимости от региона и транспортной компании)',
        'При получении вы можете проверить устройство',
        'Все устройства проходят предпродажную диагностику',
    ],
}

const GUARANTEE = {
    intro: 'Мы заботимся о безопасности заказа и прозрачности покупки.',
    subtitle: 'Что мы гарантируем',
    items: [
        'Товары надежно упаковываются и запечатываются перед отправкой',
        'Перед отправкой фиксируем состояние устройства',
        'По запросу предоставим фото или видео комплектации',
        'Возможность возврата товара согласно законодательству',
    ],
}

const TABS = [
    { id: 'methods', label: 'Способы доставки' },
    { id: 'payment', label: 'Оплата' },
    { id: 'terms', label: 'Условия и сроки' },
    { id: 'guarantee', label: 'Гарантия и безопасность' },
]

// Заголовок внутри контента (по макету). У гарантии — «Гарантии» (мн. ч.),
// в отличие от пункта меню «Гарантия и безопасность».
const HEADINGS = {
    methods: 'Способы доставки',
    payment: 'Оплата',
    terms: 'Условия и сроки',
    guarantee: 'Гарантии и безопасность',
}

function Bullets({ items }) {
    return (
        <ul className="flex flex-col gap-2">
            {items.map((item) => (
                <li
                    key={item}
                    className="text-[#444444] text-sm lg:text-base flex gap-2 leading-[150%]"
                >
                    <span className="text-[#888888] leading-[150%]">•</span>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    )
}

// Inner content for a tab (без внешней карточки — её добавляет обёртка).
function TabContent({ id }) {
    return (
        <div>
            {/* Заголовок раздела (по макету) */}
            <h2 className="text-[#222222] font-bold text-2xl lg:text-[40px] leading-tight mb-3 lg:mb-4">
                {HEADINGS[id]}
            </h2>

            {id === 'methods' && (
                <div className="flex flex-col gap-6">
                    <p className="text-[#444444] text-base lg:text-lg">
                        Мы предлагаем несколько удобных способов доставки и получения
                        заказа.
                    </p>
                    {METHODS.map((m, indx) => (
                        <div
                            key={m.title}
                            className="flex flex-col gap-2 border-b border-[#F4F4FA] pb-6 last:border-0 last:pb-0"
                        >
                            <h3 className="text-[#222222] font-semibold text-lg lg:text-xl">
                                {indx + 1}. {m.title}
                            </h3>
                            <Bullets items={m.items} />
                        </div>
                    ))}
                </div>
            )}

            {id === 'payment' && (
                <div className="flex flex-col gap-6">
                    <p className="text-[#444444] text-base lg:text-lg">
                        {PAYMENT.intro}
                    </p>
                    {PAYMENT.groups.map((g, indx) => (
                        <div key={g.title} className="flex flex-col gap-2">
                            <h3 className="text-[#222222] font-semibold text-lg lg:text-xl">
                                {indx + 1}. {g.title}
                            </h3>
                            <Bullets items={g.items} />
                        </div>
                    ))}
                </div>
            )}

            {id === 'terms' && (
                <>
                    <p className="text-[#444444] text-base lg:text-lg mb-6">
                        {TERMS.intro}
                    </p>
                    <h3 className="text-[#222222] font-semibold text-lg lg:text-xl mb-3">
                        {TERMS.subtitle}
                    </h3>
                    <Bullets items={TERMS.items} />
                </>
            )}

            {id === 'guarantee' && (
                <>
                    <p className="text-[#444444] text-base lg:text-lg mb-6">
                        {GUARANTEE.intro}
                    </p>
                    <h3 className="text-[#222222] font-semibold text-lg lg:text-xl mb-3">
                        {GUARANTEE.subtitle}
                    </h3>
                    <Bullets items={GUARANTEE.items} />
                </>
            )}
        </div>
    )
}

export default function DeliveryPage() {
    const [activeTab, setActiveTab] = useState('methods') // desktop sidebar
    const [mobileTab, setMobileTab] = useState('methods') // mobile selected tab
    const [dropdownOpen, setDropdownOpen] = useState(false) // mobile dropdown
    const dropdownRef = useRef(null)

    // Close mobile dropdown on outside click
    useEffect(() => {
        function handleClick(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [])

    return (
        <>
            <main className="px-4 lg:px-0 lg:w-360 mx-auto mb-12">
                {/* Breadcrumb */}
                <div className="mb-4">
                    <Breadcrumb
                        items={[
                            { name: 'Главная', href: '/' },
                            { name: 'Доставка' },
                        ]}
                    />
                </div>

                {/* Hero banner — 600px, разные фоны для мобилки и ПК */}
                <section className="relative overflow-hidden rounded-[20px] h-[460px] lg:h-[600px] bg-[#C47427] mb-8 lg:mb-10">
                    <Image
                        src={HERO_MOBILE}
                        alt="Быстрая доставка техники"
                        fill
                        priority
                        unoptimized
                        sizes="100vw"
                        className="object-cover lg:hidden"
                        quality={100}
                    />
                    <Image
                        src={HERO_DESKTOP}
                        alt="Быстрая доставка техники"
                        fill
                        priority
                        unoptimized
                        sizes="(max-width: 1024px) 100vw, 1440px"
                        className="object-cover hidden lg:block"
                        quality={100}
                    />
                    {/* градиент 90deg как в макете: слева насыщенный, справа прозрачный */}
                    <div className="relative z-10 h-full flex flex-col max-md:text-center md:justify-center p-6 sm:p-10 lg:p-16 ">
                        <h1 className="text-white font-semibold text-[26px] sm:text-[48px] lg:text-[64px] leading-tight mb-3">
                            Быстрая доставка техники
                        </h1>
                        <p className="text-white/90 text-base lg:text-2xl font-medium ">
                            Привезём ваш заказ в удобное время прямо к двери.
                        </p>
                    </div>
                </section>

                {/* ── DESKTOP: sidebar (282px) + контент ── */}
                <div className="hidden lg:flex gap-6 items-start">
                    <div className="w-[282px] shrink-0">
                        <div className="bg-white rounded-[20px] p-4 flex flex-col gap-2">
                            {TABS.map((tab) => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`text-left px-4 py-3.5 rounded-[16px] text-base font-medium transition-colors duration-150 ${activeTab === tab.id
                                        ? 'bg-[#D4A63A] text-[#222222] font-semibold'
                                        : 'text-[#444444] hover:bg-[#F4F4FA]'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="bg-white rounded-[20px] p-8">
                            <TabContent id={activeTab} />
                        </div>
                    </div>
                </div>

                {/* ── MOBILE: выпадающий список (выбор из 4) + контент ── */}
                <div className="lg:hidden flex flex-col gap-4">
                    {/* Dropdown selector */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            type="button"
                            onClick={() => setDropdownOpen((v) => !v)}
                            className="w-full flex items-center justify-between gap-3 bg-white rounded-[20px] p-4 text-left"
                        >
                            <span className="font-semibold text-base text-[#222222]">
                                {TABS.find((t) => t.id === mobileTab)?.label}
                            </span>
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                className={`shrink-0 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''
                                    }`}
                            >
                                <path
                                    d="M5 7.5l5 5 5-5"
                                    stroke="#888888"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                        {dropdownOpen && (
                            <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-[20px] shadow-[0_4px_15.8px_0_rgba(0,0,0,0.12)] py-2 z-20 overflow-hidden">
                                {TABS.map((tab) => (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => {
                                            setMobileTab(tab.id)
                                            setDropdownOpen(false)
                                        }}
                                        className={`w-full text-left px-4 py-3 text-base transition-colors duration-150 ${mobileTab === tab.id
                                            ? 'text-[#D4A63A] font-semibold bg-[#F4F4FA]'
                                            : 'text-[#444444] hover:bg-[#F4F4FA]'
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Selected tab content */}
                    <div className="bg-white rounded-[20px] p-5">
                        <TabContent id={mobileTab} />
                    </div>
                </div>
            </main>

            {/* Consultation banner */}
            <HomeConsultation />
        </>
    )
}
