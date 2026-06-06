'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const CATALOG_LINKS = [
    { name: 'Смартфоны', href: '/catalog/smartfony' },
    { name: 'Планшеты', href: '/catalog/planshety' },
    { name: 'Ноутбуки', href: '/catalog/noutbuki' },
    { name: 'Смарт-часы', href: '/catalog/smart-chasy' },
    { name: 'Dyson', href: '/catalog/dyson' },
    { name: 'БУ техника', href: '/catalog/bu-tehnika' },
    { name: 'Прочее', href: '/catalog' },
]

const SERVICE_LINKS = [
    { name: 'Трейд-ин', href: '/trade-in' },
    { name: 'Сервис', href: '/servics' },
]

const INFO_LINKS = [
    { name: 'О нас', href: '/about' },
    { name: 'Сервис', href: '/servics' },
    { name: 'Доставка', href: '/delivery' },
    { name: 'Новости', href: '/news' },
    { name: 'Отзывы', href: '/review' },
    { name: 'Гарантия', href: '/guarantee' },
    { name: 'Рассрочка и кредит', href: '/plan' },
    { name: 'Контакты', href: '/contact' },
]

function FooterColumn({ title, links }) {
    return (
        <div className="flex flex-col">
            <h3 className="text-[#222222] font-bold mb-3">{title}</h3>
            {links.map((l) => (
                <Link
                    key={l.name}
                    href={l.href}
                    className="text-[#666666] mb-3 hover:text-[#D4A63A] transition-colors duration-150"
                >
                    {l.name}
                </Link>
            ))}
        </div>
    )
}

function MobileAccordion({ title, links }) {
    const [open, setOpen] = useState(false)
    return (
        <div className="border-b border-[#F4F4FA] last:border-b-0">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="flex items-center justify-between w-full py-4 text-[#222222] font-bold text-lg"
            >
                {title}
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className={`transition-transform duration-200 ${open ? 'rotate-180' : ''
                        }`}
                >
                    <path
                        d="M5 7l5 5 5-5"
                        stroke="#222222"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
            {open && (
                <ul className="pb-4 flex flex-col gap-3">
                    {links.map((l) => (
                        <li key={l.name}>
                            <Link
                                href={l.href}
                                className="text-[#666666] hover:text-[#D4A63A] transition-colors duration-150"
                            >
                                {l.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default function Footer() {
    return (
        <div className="px-4 lg:px-0 lg:w-360 mx-auto max-md:w-full">
            <div className="bg-white rounded-[20px] mb-6 p-6 lg:p-6">
                {/* === DESKTOP === */}
                <div className="hidden lg:grid grid-cols-[320px_1fr_1fr_1fr_320px] gap-x-10">
                    <div className="flex flex-col items-start">
                        <Link href="/">
                            <Image
                                src="/icons/logo.svg"
                                alt="Logo"
                                width={247}
                                height={103}
                                className="mb-6"
                            />
                        </Link>
                        <Link
                            href="/privacy"
                            className="mb-3 text-[#888888] text-sm hover:text-[#222222] transition-colors duration-150"
                        >
                            Политика конфиденциальности
                        </Link>
                        <Link
                            href="/terms"
                            className="mb-3 text-[#888888] text-sm hover:text-[#222222] transition-colors duration-150"
                        >
                            Пользовательское соглашение
                        </Link>
                        <p className="mb-3 text-[#888888] text-sm">© Все права защищены</p>
                        <p className="mb-3 text-[#888888] text-sm">Разработано в Usertech</p>
                    </div>

                    <FooterColumn title="Каталог" links={CATALOG_LINKS} />
                    <FooterColumn title="Услуги" links={SERVICE_LINKS} />
                    <FooterColumn title="Информация" links={INFO_LINKS} />

                    <div className="flex flex-col items-center">
                        <a
                            href="tel:+79668615242"
                            className="text-[24px] lg:text-[32px] font-bold mb-3 text-[#222222] hover:text-[#D4A63A] transition-colors duration-150"
                        >
                            +7 (966) 861-52-42
                        </a>
                        <a
                            href="mailto:info@Geniusstorerf.ru"
                            className="text-[#222222] text-base lg:text-lg font-semibold my-3 hover:text-[#D4A63A] transition-colors duration-150"
                        >
                            info@Geniusstorerf.ru
                        </a>
                        <p className="text-[#222222] text-base lg:text-lg font-semibold text-center leading-[100%]">
                            Санкт-Петербург,
                            <br />
                            Невский проспект 32-34
                        </p>
                        <div className="flex justify-center gap-x-6 mt-3">
                            <a
                                href="https://t.me/genius_store_spb"
                                target="_blank"
                                rel="noreferrer"
                                className="bg-[#D4A63A] h-[62px] w-[62px] rounded-full text-white flex items-center justify-center hover:brightness-95 active:brightness-90 transition"
                                aria-label="Telegram"
                            >
                                <Image src="/icons/telegram.svg" alt="" width={30} height={30} />
                            </a>
                            <a
                                href="https://vk.com/storegenius"
                                target="_blank"
                                rel="noreferrer"
                                className="bg-[#D4A63A] h-[62px] w-[62px] rounded-full text-white flex items-center justify-center hover:brightness-95 active:brightness-90 transition"
                                aria-label="VK"
                            >
                                <Image src="/icons/vk.svg" alt="" width={30} height={30} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* === MOBILE === */}
                <div className="lg:hidden flex flex-col items-center text-center">
                    <Link href="/" className="mb-6">
                        <Image
                            src="/icons/logo.svg"
                            alt="Logo"
                            width={220}
                            height={92}
                        />
                    </Link>

                    <div className="w-full mb-6">
                        <MobileAccordion title="Каталог" links={CATALOG_LINKS} />
                        <MobileAccordion title="Услуги" links={SERVICE_LINKS} />
                        <MobileAccordion title="Информация" links={INFO_LINKS} />
                    </div>

                    <a
                        href="tel:+79668615242"
                        className="text-[28px] font-bold mb-3 text-[#222222] hover:text-[#D4A63A] transition-colors duration-150"
                    >
                        +7 (966) 861-52-42
                    </a>
                    <a
                        href="mailto:info@Geniusstorerf.ru"
                        className="text-[#222222] text-base font-medium my-1 hover:text-[#D4A63A] transition-colors duration-150"
                    >
                        info@Geniusstorerf.ru
                    </a>
                    <p className="text-[#222222] text-base font-medium leading-[140%] mt-2">
                        Санкт-Петербург,
                        <br />
                        Невский проспект 32-34
                    </p>

                    <div className="flex justify-center gap-3 mt-4">
                        <a
                            href="https://t.me/genius_store_spb"
                            target="_blank"
                            rel="noreferrer"
                            className="bg-[#D4A63A] h-[44px] w-[44px] rounded-full flex items-center justify-center hover:brightness-95 transition"
                            aria-label="Telegram"
                        >
                            <Image src="/icons/telegram.svg" alt="" width={18} height={18} />
                        </a>
                        <a
                            href="https://vk.com/storegenius"
                            target="_blank"
                            rel="noreferrer"
                            className="bg-[#D4A63A] h-[44px] w-[44px] rounded-full flex items-center justify-center hover:brightness-95 transition"
                            aria-label="VK"
                        >
                            <Image src="/icons/vk.svg" alt="" width={18} height={18} />
                        </a>
                    </div>

                    <div className="mt-6 pt-6 border-t border-[#F4F4FA] w-full flex flex-col gap-2 text-[#888888] text-sm">
                        <Link
                            href="/privacy"
                            className="hover:text-[#222222] transition-colors duration-150"
                        >
                            Политика конфиденциальности
                        </Link>
                        <Link
                            href="/terms"
                            className="hover:text-[#222222] transition-colors duration-150"
                        >
                            Пользовательское соглашение
                        </Link>
                        <p>© Все права защищены</p>
                        <p>Разработано в Usertech</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
