'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'

const MENU_LINKS = [
    { name: 'О нас', href: '/about' },
    { name: 'Трейд-ин', href: '/trade-in' },
    { name: 'Сервис', href: '/servics' },
    { name: 'Доставка', href: '/delivery' },
    { name: 'Новости', href: '/news' },
    { name: 'Отзывы', href: '/review' },
    { name: 'Гарантия', href: '/guarantee' },
    { name: 'Рассрочка и кредит', href: '/plan' },
    { name: 'Контакты', href: '/contact' },
]

export default function MobileMenuDrawer({ open, onClose }) {
    // Lock body scroll when open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [open])

    // ESC to close
    useEffect(() => {
        if (!open) return
        function handleKey(e) {
            if (e.key === 'Escape') onClose?.()
        }
        document.addEventListener('keydown', handleKey)
        return () => document.removeEventListener('keydown', handleKey)
    }, [open, onClose])

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/25 backdrop-blur-[4px] z-50 transition-opacity duration-300 lg:hidden ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />

            {/* Drawer */}
            <aside
                className={`fixed top-0 right-0 h-full w-[78%] max-w-[360px] bg-white z-50 transition-transform duration-300 lg:hidden flex flex-col ${open ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Header */}
                <div className="flex items-start justify-between p-6">
                    <Link href="/" onClick={onClose}>
                        <Image
                            src="/icons/logo.svg"
                            alt="Genius store"
                            width={180}
                            height={70}
                            priority
                        />
                    </Link>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-[#222222] hover:text-[#D4A63A] transition-colors p-2 -mr-2 -mt-2"
                        aria-label="Close menu"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M6 6l12 12M18 6L6 18"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                </div>

                {/* Links */}
                <nav className="flex-1 overflow-y-auto px-6 pb-6">
                    <ul className="flex flex-col gap-5">
                        {MENU_LINKS.map((l) => (
                            <li key={l.href}>
                                <Link
                                    href={l.href}
                                    onClick={onClose}
                                    className="block text-[#222222] text-lg font-medium hover:text-[#D4A63A] transition-colors duration-150"
                                >
                                    {l.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Footer with phone + socials */}
                <div className="px-6 pb-6 pt-4 border-t border-[#F4F4FA] flex items-center justify-between gap-3">
                    <a
                        href="tel:+79668615242"
                        className="text-[#222222] text-base font-semibold hover:text-[#D4A63A] transition-colors"
                    >
                        +7 (966) 861-52-42
                    </a>
                    <div className="flex gap-2 shrink-0">
                        <a
                            href="https://t.me/genius_store_spb"
                            target="_blank"
                            rel="noreferrer"
                            className="bg-[#D4A63A] h-10 w-10 rounded-full flex items-center justify-center hover:brightness-95 transition"
                            aria-label="Telegram"
                        >
                            <Image src="/icons/telegram.svg" alt="" width={16} height={16} />
                        </a>
                        <a
                            href="https://vk.com/storegenius"
                            target="_blank"
                            rel="noreferrer"
                            className="bg-[#D4A63A] h-10 w-10 rounded-full flex items-center justify-center hover:brightness-95 transition"
                            aria-label="VK"
                        >
                            <Image src="/icons/vk.svg" alt="" width={16} height={16} />
                        </a>
                    </div>
                </div>
            </aside>
        </>
    )
}
