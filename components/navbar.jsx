'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import CatalogDropdown from './catalog-dropdown'
import SearchDropdown from './search-dropdown'
import MobileMenuDrawer from './mobile-menu-drawer'
import { useCartCount } from '@/lib/use-cart-count'

const NAV_LINKS = [
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

export default function Navbar() {
    const [catalogOpen, setCatalogOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const wrapperRef = useRef(null)
    const searchInputRef = useRef(null)
    const mobileSearchInputRef = useRef(null)
    const cartCount = useCartCount()

    const anyDesktopOpen = catalogOpen || searchOpen

    // Click outside (desktop dropdowns)
    useEffect(() => {
        function handleClick(e) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setCatalogOpen(false)
                setSearchOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [])

    // ESC closes everything
    useEffect(() => {
        function handleKey(e) {
            if (e.key === 'Escape') {
                setCatalogOpen(false)
                setSearchOpen(false)
                setMobileSearchOpen(false)
                searchInputRef.current?.blur()
                mobileSearchInputRef.current?.blur()
            }
        }
        document.addEventListener('keydown', handleKey)
        return () => document.removeEventListener('keydown', handleKey)
    }, [])

    function toggleCatalog() {
        setCatalogOpen((v) => !v)
        setSearchOpen(false)
    }

    function openSearch() {
        setSearchOpen(true)
        setCatalogOpen(false)
    }

    function closeSearch() {
        setSearchOpen(false)
        setSearchQuery('')
        searchInputRef.current?.blur()
    }

    function closeMobileSearch() {
        setMobileSearchOpen(false)
        setSearchQuery('')
    }

    return (
        <>
            {/* Desktop backdrop */}
            {anyDesktopOpen && (
                <div
                    className="hidden lg:block fixed inset-0 bg-black/25 backdrop-blur-[4px] z-30"
                    onClick={() => {
                        setCatalogOpen(false)
                        setSearchOpen(false)
                    }}
                />
            )}

            {/* Navbar wrapper */}
            <div
                className="px-4 lg:px-0 lg:w-360 mx-auto my-4 lg:my-6 sticky top-0 z-40 max-md:w-full"
                ref={wrapperRef}
            >
                <div className="p-4 lg:p-6 rounded-[20px] bg-white relative z-10">
                    {/* === MOBILE TOP ROW === */}
                    <div className="flex lg:hidden items-center justify-between gap-3">
                        <Link href="/" className="shrink-0">
                            <Image
                                src="/icons/logo.svg"
                                alt="Logo"
                                width={130}
                                height={55}
                                priority
                            />
                        </Link>

                        <div className="flex items-center gap-2 shrink-0">
                            <button
                                type="button"
                                onClick={() => setMobileSearchOpen(true)}
                                className="bg-[#D4A63A] w-[48px] h-[48px] rounded-full flex items-center justify-center hover:brightness-95 active:brightness-90 transition"
                                aria-label="Search"
                            >
                                <Image
                                    src="/icons/search-md.svg"
                                    alt=""
                                    width={20}
                                    height={20}
                                />
                            </button>
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(true)}
                                className="bg-[#D4A63A] w-[48px] h-[48px] rounded-full flex items-center justify-center hover:brightness-95 active:brightness-90 transition"
                                aria-label="Menu"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M4 7h16M4 12h16M4 17h16"
                                        stroke="#222222"
                                        strokeWidth="2.2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* === DESKTOP TOP ROW === */}
                    <div className="hidden lg:flex flex-wrap gap-x-6 items-center">
                        <Link href="/" className="shrink-0">
                            <Image
                                src="/icons/logo.svg"
                                alt="Logo"
                                width={155}
                                height={65}
                                priority
                            />
                        </Link>

                        <button
                            onClick={toggleCatalog}
                            className={`flex items-center gap-x-3 px-4 py-4 rounded-[20px] transition-colors duration-150 hover:brightness-95 active:brightness-90 ${catalogOpen
                                ? 'bg-[#222222] text-white'
                                : 'bg-[#D4A63A] text-[#222222]'
                                }`}
                        >
                            <Image
                                src="/icons/catalog-icon.svg"
                                alt="Catalog"
                                width={24}
                                height={24}
                                className={catalogOpen ? 'invert' : ''}
                            />
                            <p className="text-lg font-semibold">
                                {catalogOpen ? 'Закрыть' : 'Каталог'}
                            </p>
                        </button>

                        <div className="grow flex bg-[#F4F4FA] h-[52px] rounded-[12px] min-w-[200px] relative">
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder="Найти товар"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value)
                                    setSearchOpen(true)
                                }}
                                onFocus={openSearch}
                                className="px-4 grow outline-none bg-transparent text-[#222222] placeholder:text-[#888888]"
                            />
                            {(searchQuery || searchOpen) && (
                                <button
                                    onClick={closeSearch}
                                    className="px-3 text-[#888888] hover:text-[#222222] transition-colors"
                                    aria-label="Clear search"
                                    type="button"
                                >
                                    ✕
                                </button>
                            )}
                            <button
                                onClick={openSearch}
                                className="bg-[#D4A63A] w-[52px] h-[52px] rounded-[20px] flex items-center justify-center hover:brightness-95 active:brightness-90 transition shrink-0"
                                aria-label="Search"
                                type="button"
                            >
                                <Image
                                    src="/icons/search-md.svg"
                                    alt=""
                                    width={24}
                                    height={24}
                                />
                            </button>
                        </div>

                        <Link
                            href="/saved"
                            className="bg-[#D4A63A] w-[52px] h-[52px] rounded-[20px] flex items-center justify-center hover:brightness-95 active:brightness-90 transition"
                            aria-label="Saved"
                        >
                            <Image src="/icons/heart.svg" alt="" width={24} height={24} />
                        </Link>
                        <Link
                            href="/basket"
                            className="relative bg-[#D4A63A] w-[52px] h-[52px] rounded-[20px] flex items-center justify-center hover:brightness-95 active:brightness-90 transition"
                            aria-label="Cart"
                        >
                            <Image src="/icons/cart.svg" alt="" width={24} height={24} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 min-w-[20px] size-6  px-1 rounded-full bg-[#222222] text-white text-sm font-bold flex items-center justify-center leading-none">
                                    {cartCount > 99 ? '99+' : cartCount}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* === DESKTOP BOTTOM ROW === */}
                    <div className="hidden lg:flex justify-between mt-4">
                        <ul className="flex flex-wrap gap-x-6 gap-y-2">
                            {NAV_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-[#888888] text-sm hover:text-[#D4A63A] transition-colors duration-150"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="flex items-center gap-x-4">
                            <a
                                href="tel:+79668615242"
                                className="text-[#888888] text-sm hover:text-[#222222] transition-colors duration-150"
                            >
                                +7 (966) 861-52-42
                            </a>
                            <a
                                href="https://t.me/genius_store_spb"
                                target="_blank"
                                rel="noreferrer"
                                className="bg-[#D4A63A] h-6 w-6 rounded-full text-white flex items-center justify-center hover:brightness-95 transition"
                                aria-label="Telegram"
                            >
                                <Image src="/icons/telegram.svg" alt="" width={11} height={11} />
                            </a>
                            <a
                                href="https://vk.com/storegenius"
                                target="_blank"
                                rel="noreferrer"
                                className="bg-[#D4A63A] h-6 w-6 rounded-full text-white flex items-center justify-center hover:brightness-95 transition"
                                aria-label="VK"
                            >
                                <Image src="/icons/vk.svg" alt="" width={11} height={11} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* DESKTOP DROPDOWNS */}
                <div className="hidden lg:block">
                    {catalogOpen && (
                        <CatalogDropdown onClose={() => setCatalogOpen(false)} />
                    )}
                    {searchOpen && (
                        <SearchDropdown
                            query={searchQuery}
                            onClose={closeSearch}
                            onSelect={setSearchQuery}
                        />
                    )}
                </div>
            </div>

            {/* MOBILE SEARCH SHEET */}
            {mobileSearchOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-[4px]"
                    onClick={closeMobileSearch}
                >
                    <div
                        className="bg-white p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center gap-2">
                            <div className="grow flex bg-[#F4F4FA] h-[48px] rounded-[12px]">
                                <input
                                    ref={mobileSearchInputRef}
                                    autoFocus
                                    type="text"
                                    placeholder="Найти товар"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="px-4 grow outline-none bg-transparent text-[#222222] placeholder:text-[#888888]"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="px-3 text-[#888888]"
                                        aria-label="Clear"
                                        type="button"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                            <button
                                onClick={closeMobileSearch}
                                className="text-[#222222] font-medium px-3"
                                type="button"
                            >
                                Отмена
                            </button>
                        </div>
                        <div className="mt-3">
                            <SearchDropdown
                                query={searchQuery}
                                onClose={closeMobileSearch}
                                onSelect={setSearchQuery}
                                variant="mobile"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* MOBILE MENU DRAWER */}
            <MobileMenuDrawer
                open={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
            />
        </>
    )
}
