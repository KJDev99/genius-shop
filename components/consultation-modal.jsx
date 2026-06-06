'use client'

import React, { useEffect, useState } from 'react'

const API = 'https://admin.geniusstorerf.ru/api'

// Russian phone mask: always +7 (XXX) XXX-XX-XX
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
function phoneDigits(value) {
    let d = value.replace(/\D/g, '')
    if (d.startsWith('8')) d = '7' + d.slice(1)
    if (d.startsWith('7')) d = d.slice(1)
    return d.slice(0, 10).length
}

const inputCls =
    'w-full h-12 px-4 rounded-[12px] bg-[#F4F4FA] outline-none text-[#222222] placeholder:text-[#888888] focus:ring-2 focus:ring-[#D4A63A]/40 transition'

function ConsultationModal({ onClose }) {
    const [form, setForm] = useState({ name: '', phone: '' })
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        function onKey(e) {
            if (e.key === 'Escape') onClose?.()
        }
        document.addEventListener('keydown', onKey)
        return () => {
            document.body.style.overflow = ''
            document.removeEventListener('keydown', onKey)
        }
    }, [onClose])

    function update(key, value) {
        setForm((p) => ({ ...p, [key]: value }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (submitting) return
        if (phoneDigits(form.phone) < 10) {
            setError('Введите корректный номер телефона (+7).')
            return
        }
        setSubmitting(true)
        setError(null)
        try {
            const res = await fetch(`${API}/consultation`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: form.name,
                    phone: form.phone,
                    consent: true,
                }),
            })
            if (!res.ok) {
                const data = await res.json().catch(() => ({}))
                throw new Error(data.detail || 'Не удалось отправить заявку. Попробуйте позже.')
            }
            setSuccess(true)
        } catch (err) {
            setError(err.message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-[4px] overflow-y-auto"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-[20px] w-full max-w-[440px] my-4 max-h-[calc(100vh-32px)] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-5 lg:p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-[#222222] font-bold text-xl lg:text-2xl">
                            Получить консультацию
                        </h2>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-[#888888] hover:text-[#222222] transition-colors p-1 -mr-1"
                            aria-label="Закрыть"
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M5 5l10 10M15 5l-10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>

                    {success ? (
                        <div className="flex flex-col items-center text-center py-6">
                            <span className="w-16 h-16 rounded-full bg-[#D4A63A]/15 flex items-center justify-center mb-4">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                    <path d="M4 12l5 5L20 6" stroke="#D4A63A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                            <h3 className="text-[#222222] font-bold text-xl mb-2">
                                Заявка отправлена!
                            </h3>
                            <p className="text-[#888888] text-sm mb-6">
                                Мы свяжемся с вами в ближайшее время.
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
                            <p className="text-[#444444] text-sm lg:text-base leading-snug mb-5">
                                Оставьте заявку, и наш специалист поможет подобрать
                                подходящее устройство.
                            </p>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                                <input
                                    type="text"
                                    required
                                    placeholder="Ваше имя"
                                    value={form.name}
                                    onChange={(e) => update('name', e.target.value)}
                                    className={inputCls}
                                />
                                <input
                                    type="tel"
                                    required
                                    inputMode="tel"
                                    placeholder="Номер телефона"
                                    value={form.phone}
                                    onChange={(e) => update('phone', formatRuPhone(e.target.value))}
                                    className={inputCls}
                                />

                                {error && (
                                    <p className="text-red-500 text-sm text-center mt-1">{error}</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="mt-2 w-full bg-[#D4A63A] text-[#222222] font-semibold text-base py-3.5 rounded-[20px] hover:brightness-95 active:brightness-90 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                >
                                    {submitting ? 'Отправляем…' : 'Заказать'}
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

export default function ConsultationButton({ className, children }) {
    const [open, setOpen] = useState(false)
    return (
        <>
            <button type="button" onClick={() => setOpen(true)} className={className}>
                {children}
            </button>
            {open && <ConsultationModal onClose={() => setOpen(false)} />}
        </>
    )
}
