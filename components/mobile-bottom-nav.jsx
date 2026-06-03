'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const TABS = [
    {
        href: '/',
        label: 'Главная',
        icon: (active) => (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                    d="M3 11l9-8 9 8v9a2 2 0 01-2 2h-4v-6h-6v6H5a2 2 0 01-2-2v-9z"
                    stroke={active ? '#D4A63A' : '#888888'}
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                    fill={active ? '#D4A63A' : 'none'}
                    fillOpacity={active ? 0.15 : 0}
                />
            </svg>
        ),
    },
    {
        href: '/catalog',
        label: 'Каталог',
        icon: (active) => (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                    d="M12 2l9 5-9 5-9-5 9-5z"
                    fill={active ? '#D4A63A' : '#888888'}
                />
                <path
                    d="M3 12l9 5 9-5"
                    stroke={active ? '#D4A63A' : '#888888'}
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                    fill="none"
                />
                <path
                    d="M3 17l9 5 9-5"
                    stroke={active ? '#D4A63A' : '#888888'}
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                    fill="none"
                />
            </svg>
        ),
    },
    {
        href: '/saved',
        label: 'Избранное',
        icon: (active) => (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                    d="M12 21s-7-4.5-9-9c-1.5-3 0-7 4-7 2 0 3.5 1.5 5 3 1.5-1.5 3-3 5-3 4 0 5.5 4 4 7-2 4.5-9 9-9 9z"
                    fill={active ? '#D4A63A' : '#888888'}
                />
            </svg>
        ),
    },
    {
        href: '/basket',
        label: 'Корзина',
        icon: (active) => (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                    d="M3 4h2l2.4 12.5a2 2 0 002 1.5h7.5a2 2 0 002-1.5L21 8H6"
                    stroke={active ? '#D4A63A' : '#888888'}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill={active ? '#D4A63A' : 'none'}
                    fillOpacity={active ? 0.15 : 0}
                />
                <circle cx="9" cy="21" r="1.2" fill={active ? '#D4A63A' : '#888888'} />
                <circle cx="18" cy="21" r="1.2" fill={active ? '#D4A63A' : '#888888'} />
            </svg>
        ),
    },
]

export default function MobileBottomNav() {
    const pathname = usePathname()

    return (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#F4F4FA] z-40 pb-[env(safe-area-inset-bottom)]">
            <ul className="flex">
                {TABS.map((tab) => {
                    const active =
                        tab.href === '/'
                            ? pathname === '/'
                            : pathname.startsWith(tab.href)
                    return (
                        <li key={tab.href} className="flex-1">
                            <Link
                                href={tab.href}
                                className="flex flex-col items-center gap-1 py-3 transition-colors duration-150"
                            >
                                {tab.icon(active)}
                                <span
                                    className={`text-xs transition-colors duration-150 ${active ? 'text-[#D4A63A] font-semibold' : 'text-[#888888]'
                                        }`}
                                >
                                    {tab.label}
                                </span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}
