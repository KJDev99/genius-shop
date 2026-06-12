'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { removeFromCart } from '@/lib/cart'

const API = 'https://admin.geniusstorerf.ru/api'

function formatRub(n) {
    return new Intl.NumberFormat('ru-RU').format(n) + ' ₽'
}

// Russian phone mask: always renders as +7 (XXX) XXX-XX-XX.
// Strips non-digits, normalizes a leading 7/8 country code, keeps 10 national digits.
function formatRuPhone(value) {
    let d = value.replace(/\D/g, '')
    if (d.startsWith('8')) d = '7' + d.slice(1)
    if (d.startsWith('7')) d = d.slice(1)
    d = d.slice(0, 10)
    if (d.length === 0) return ''
    let s = '+7 (' + d.slice(0, 3)
    if (d.length >= 3) s += ') ' + d.slice(3, 6)
    if (d.length >= 6) s += '-' + d.slice(6, 8)
    if (d.length >= 8) s += '-' + d.slice(8, 10)
    return s
}

// Count of national digits entered (a full RU number has 10).
function ruPhoneDigits(value) {
    let d = value.replace(/\D/g, '')
    if (d.startsWith('8')) d = '7' + d.slice(1)
    if (d.startsWith('7')) d = d.slice(1)
    return d.slice(0, 10).length
}

function RadioOption({ label, checked, onChange }) {
    return (
        <label className="flex items-center gap-3 cursor-pointer py-1">
            <span
                className={`relative w-5 h-5 rounded-full border-2 transition-colors duration-150 shrink-0 ${checked
                    ? 'border-[#D4A63A]'
                    : 'border-[#D4D4D4] hover:border-[#D4A63A]/60'
                    }`}
            >
                {checked && (
                    <span className="absolute inset-0 m-auto w-2.5 h-2.5 rounded-full bg-[#D4A63A]" />
                )}
            </span>
            <input
                type="radio"
                checked={checked}
                onChange={onChange}
                className="hidden"
            />
            <span className="text-[#222222] text-sm lg:text-base">{label}</span>
        </label>
    )
}

export default function OrderModal({ items = [], total = 0, onClose }) {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        method: 'delivery',
        address: '',
        flat: '',
        entrance: '',
        floor: '',
    })
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    function update(field, value) {
        setForm((p) => ({ ...p, [field]: value }))
    }

    // Lock body scroll
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = ''
        }
    }, [])

    // ESC to close
    useEffect(() => {
        function handleKey(e) {
            if (e.key === 'Escape') onClose?.()
        }
        document.addEventListener('keydown', handleKey)
        return () => document.removeEventListener('keydown', handleKey)
    }, [onClose])

    async function handleSubmit(e) {
        e.preventDefault()
        if (submitting) return

        if (ruPhoneDigits(form.phone) < 10) {
            setError('Введите корректный номер телефона (+7).')
            return
        }

        setSubmitting(true)
        setError(null)

        const payload = {
            products_list: items.map((i) => ({
                product_id: i.variantId || i.productId,
                quantity: i.qty,
            })),
            isDelivery: form.method === 'delivery',
            isPickup: form.method === 'pickup',
            apartment: form.flat,
            entrance: form.entrance,
            floor: form.floor,
        }

        try {
            const res = await fetch(`${API}/order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })
            if (!res.ok) {
                const data = await res.json().catch(() => ({}))
                throw new Error(
                    data.detail || 'Не удалось оформить заказ. Попробуйте позже.'
                )
            }
            // Order placed — remove ordered items from the cart
            removeFromCart(items.map((i) => i.variantId).filter(Boolean))
            setSuccess(true)
        } catch (err) {
            setError(err.message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-[4px] overflow-y-auto"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-[20px] w-full max-w-[440px] my-4 max-h-[calc(100vh-32px)] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-5 lg:p-6">
                    {/* Header */}
                    <div className="flex items-center justify-center relative mb-5">
                        <h2 className="text-[#222222] font-bold text-xl lg:text-2xl text-center">
                            Оформить заказ
                        </h2>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-[#888888] hover:text-[#222222] transition-colors p-1 -mr-1 absolute -right-2 -top-2"
                            aria-label="Close"
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path
                                    d="M5 5l10 10M15 5l-10 10"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </button>
                    </div>

                    {success ? (
                        <div className="flex flex-col items-center text-center py-6">
                            <span className="w-16 h-16 rounded-full bg-[#D4A63A]/15 flex items-center justify-center mb-4">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M4 12l5 5L20 6"
                                        stroke="#D4A63A"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>
                            <h3 className="text-[#222222] font-bold text-xl mb-2">
                                Заказ оформлен!
                            </h3>
                            <p className="text-[#888888] text-sm mb-6">
                                Мы свяжемся с вами для подтверждения.
                            </p>
                            <button
                                type="button"
                                onClick={onClose}
                                className="w-full bg-[#D4A63A] text-[#222222] font-semibold py-3.5 rounded-[20px] hover:brightness-95 transition"
                            >
                                Закрыть
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Order items */}
                            <div className="mb-5">
                                <h3 className="text-[#222222] font-semibold text-base lg:text-lg mb-3">
                                    Ваш заказ:
                                </h3>
                                <div className="flex flex-col gap-2">
                                    {items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-3 p-2 rounded-[12px] bg-[#F4F4FA]"
                                        >
                                            <div className="relative w-[48px] h-[48px] shrink-0 rounded-[8px] overflow-hidden bg-white">
                                                <Image
                                                    src={item.img}
                                                    alt={item.name}
                                                    fill
                                                    sizes="48px"
                                                    className="object-contain"
                                                />
                                            </div>
                                            <p className="grow text-[#222222] text-sm">
                                                {item.name}
                                            </p>
                                            <span className="text-[#888888] text-sm">
                                                {item.qty}
                                            </span>
                                            <span className="text-[#D4A63A] font-bold text-sm whitespace-nowrap">
                                                {formatRub(item.price * item.qty)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                                <input
                                    type="text"
                                    required
                                    placeholder="Ваше имя"
                                    value={form.name}
                                    onChange={(e) => update('name', e.target.value)}
                                    className="w-full h-12 px-4 rounded-[12px] bg-[#F4F4FA] outline-none text-[#222222] placeholder:text-[#888888] focus:ring-2 focus:ring-[#D4A63A]/40 transition"
                                />
                                <input
                                    type="email"
                                    required
                                    placeholder="Ваша почта"
                                    value={form.email}
                                    onChange={(e) => update('email', e.target.value)}
                                    className="w-full h-12 px-4 rounded-[12px] bg-[#F4F4FA] outline-none text-[#222222] placeholder:text-[#888888] focus:ring-2 focus:ring-[#D4A63A]/40 transition"
                                />
                                <input
                                    type="tel"
                                    required
                                    inputMode="tel"
                                    placeholder="+7 (___) ___-__-__"
                                    value={form.phone}
                                    onChange={(e) =>
                                        update('phone', formatRuPhone(e.target.value))
                                    }
                                    className="w-full h-12 px-4 rounded-[12px] bg-[#F4F4FA] outline-none text-[#222222] placeholder:text-[#888888] focus:ring-2 focus:ring-[#D4A63A]/40 transition"
                                />

                                <div className="mt-2">
                                    <p className="text-[#222222] font-semibold text-sm lg:text-base mb-2">
                                        Способ получения
                                    </p>
                                    <div className="flex flex-col gap-1">
                                        <RadioOption
                                            label="Доставка"
                                            checked={form.method === 'delivery'}
                                            onChange={() => update('method', 'delivery')}
                                        />
                                        <RadioOption
                                            label="Самовывоз"
                                            checked={form.method === 'pickup'}
                                            onChange={() => update('method', 'pickup')}
                                        />
                                    </div>
                                </div>

                                {form.method === 'delivery' && (
                                    <>
                                        <input
                                            type="text"
                                            placeholder="Введите адрес..."
                                            value={form.address}
                                            onChange={(e) => update('address', e.target.value)}
                                            className="w-full h-12 px-4 rounded-[12px] bg-[#F4F4FA] outline-none text-[#222222] placeholder:text-[#888888] focus:ring-2 focus:ring-[#D4A63A]/40 transition"
                                        />
                                        <div className="grid grid-cols-3 gap-2">
                                            <input
                                                type="text"
                                                placeholder="Квартира"
                                                value={form.flat}
                                                onChange={(e) => update('flat', e.target.value)}
                                                className="w-full h-12 px-3 rounded-[12px] bg-[#F4F4FA] outline-none text-[#222222] placeholder:text-[#888888] text-sm focus:ring-2 focus:ring-[#D4A63A]/40 transition"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Подъезд"
                                                value={form.entrance}
                                                onChange={(e) => update('entrance', e.target.value)}
                                                className="w-full h-12 px-3 rounded-[12px] bg-[#F4F4FA] outline-none text-[#222222] placeholder:text-[#888888] text-sm focus:ring-2 focus:ring-[#D4A63A]/40 transition"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Этаж"
                                                value={form.floor}
                                                onChange={(e) => update('floor', e.target.value)}
                                                className="w-full h-12 px-3 rounded-[12px] bg-[#F4F4FA] outline-none text-[#222222] placeholder:text-[#888888] text-sm focus:ring-2 focus:ring-[#D4A63A]/40 transition"
                                            />
                                        </div>
                                    </>
                                )}

                                {error && (
                                    <p className="text-red-500 text-sm text-center mt-1">
                                        {error}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={submitting || items.length === 0}
                                    className="mt-3 w-full bg-[#D4A63A] text-[#222222] font-semibold text-base py-3.5 rounded-[20px] hover:brightness-95 active:brightness-90 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                >
                                    {submitting ? 'Оформляем…' : 'Оформить заказ'}
                                </button>

                                <p className="text-[#888888] text-xs text-center mt-1">
                                    Отправляя данные через форму, вы соглашаетесь
                                    <br />
                                    с политикой обработки персональных данных
                                </p>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
