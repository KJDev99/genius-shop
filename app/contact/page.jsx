'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Breadcrumb from '@/components/breadcrumb'
import HomeConsultation from '@/components/home/home-consultation'

const API = 'https://admin.geniusstorerf.ru/api'

// Fallback (used until /site/settings resolves)
const DEFAULTS = {
    phone: '+7 (966) 861-52-42',
    email: 'info@geniusstore.ru',
    address: 'Санкт-Петербург, Невский проспект 112-114',
    social: {
        telegram: 'https://t.me/genius_store',
        vk: 'https://vk.com/genius_store',
        whatsapp: 'https://wa.me/79668615242',
    },
    map: { lat: 59.9343, lng: 30.3351 },
}

function mapSrc(settings) {
    const { lat, lng } = settings.map || {}
    if (lat != null && lng != null) {
        return `https://maps.google.com/maps?q=${lat},${lng}&z=16&hl=ru&output=embed`
    }
    return `https://maps.google.com/maps?q=${encodeURIComponent(
        settings.address || ''
    )}&z=16&hl=ru&output=embed`
}

function PhoneIcon() {
    return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="shrink-0">
            <path
                d="M6.6 3h3l1.5 4-2 1.4a12 12 0 005.5 5.5l1.4-2 4 1.5v3c0 .9-.7 1.6-1.6 1.6C11.6 21 3 12.4 3 4.6 3 3.7 3.7 3 4.6 3"
                fill="#D4A63A"
            />
        </svg>
    )
}

function MailIcon() {
    return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="shrink-0">
            <rect x="3" y="5" width="18" height="14" rx="3" fill="#D4A63A" />
            <path
                d="M5 8l7 4.5L19 8"
                stroke="#fff"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

function MapIcon() {
    return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="shrink-0">
            <path
                d="M12 2c4 0 7 3 7 7 0 4.5-7 13-7 13S5 13.5 5 9c0-4 3-7 7-7z"
                fill="#D4A63A"
            />
            <circle cx="12" cy="9" r="2.6" fill="#fff" />
        </svg>
    )
}

function WhatsAppIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
            <path d="M12 2a10 10 0 00-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1112 20zm4.5-5.9c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.7.9-.1.1-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5l.4-.4c.1-.1.2-.3.2-.4.1-.1 0-.3 0-.4l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.2 1.6 2.5 3.9 3.4.5.2 1 .4 1.3.5.5.2 1 .1 1.4.1.4-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.1-.2-.1-.4-.2z" />
        </svg>
    )
}

export default function ContactPage() {
    const [settings, setSettings] = useState(DEFAULTS)

    useEffect(() => {
        let cancelled = false
        fetch(`${API}/site/settings`)
            .then((res) => res.json())
            .then((data) => {
                if (cancelled || !data) return
                setSettings((prev) => ({
                    ...prev,
                    ...data,
                    social: { ...prev.social, ...(data.social || {}) },
                    map: { ...prev.map, ...(data.map || {}) },
                }))
            })
            .catch(() => {})
        return () => {
            cancelled = true
        }
    }, [])

    const phoneHref = `tel:${(settings.phone || '').replace(/[^\d+]/g, '')}`
    const socials = [
        settings.social?.telegram && {
            href: settings.social.telegram,
            label: 'Telegram',
            icon: (
                <Image src="/icons/telegram.svg" alt="Telegram" width={20} height={20} />
            ),
        },
        settings.social?.vk && {
            href: settings.social.vk,
            label: 'VK',
            icon: <Image src="/icons/vk.svg" alt="VK" width={20} height={20} />,
        },
        settings.social?.whatsapp && {
            href: settings.social.whatsapp,
            label: 'WhatsApp',
            icon: <WhatsAppIcon />,
        },
    ].filter(Boolean)

    return (
        <>
            <main className="px-4 lg:px-0 lg:w-360 mx-auto mb-12">
                {/* Breadcrumb */}
                <div className="mb-4">
                    <Breadcrumb
                        items={[{ name: 'Главная', href: '/' }, { name: 'Контакты' }]}
                    />
                </div>

                {/* Two columns: info card + map */}
                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,600px)_1fr] gap-4 lg:gap-6 items-stretch">
                    {/* Info card */}
                    <div className="bg-white rounded-[20px] p-6 lg:p-8 flex flex-col gap-6 lg:gap-8">
                        <h1 className="text-[#222222] font-bold text-[36px] sm:text-[44px] lg:text-[50px] leading-tight">
                            Контакты
                        </h1>

                        <div className="flex flex-col gap-3 lg:gap-4">
                            {/* Phone */}
                            <a
                                href={phoneHref}
                                className="flex items-center gap-3 bg-[#F4F4FA] rounded-[20px] p-4 text-[#444444] text-lg lg:text-xl font-medium hover:bg-[#EEEEF6] transition-colors duration-150"
                            >
                                <PhoneIcon />
                                {settings.phone}
                            </a>

                            {/* Email */}
                            <a
                                href={`mailto:${settings.email}`}
                                className="flex items-center gap-3 bg-[#F4F4FA] rounded-[20px] p-4 text-[#444444] text-lg lg:text-xl font-medium hover:bg-[#EEEEF6] transition-colors duration-150 break-all"
                            >
                                <MailIcon />
                                {settings.email}
                            </a>

                            {/* Address */}
                            <div className="flex items-center gap-3 bg-[#F4F4FA] rounded-[20px] p-4 text-[#444444] text-lg lg:text-xl font-medium">
                                <MapIcon />
                                {settings.address}
                            </div>

                            {/* Socials */}
                            <div className="flex gap-4 pt-2">
                                {socials.map((s) => (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={s.label}
                                        className="transition-transform duration-150 w-10 h-10 rounded-full flex items-center justify-center bg-[#D4A63A] hover:scale-105 active:scale-95"
                                    >
                                        {s.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Map */}
                    <div className="rounded-[20px] overflow-hidden bg-[#F4F4FA] min-h-[320px] lg:min-h-0">
                        <iframe
                            src={mapSrc(settings)}
                            title={`Карта — ${settings.address}`}
                            className="w-full h-full min-h-[320px] border-0"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            allowFullScreen
                        />
                    </div>
                </div>
            </main>

            {/* Consultation banner */}
            <HomeConsultation />
        </>
    )
}
