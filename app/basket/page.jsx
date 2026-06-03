'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Breadcrumb from '@/components/breadcrumb'
import OrderModal from '@/components/order-modal'
import { getCart, updateCartQuantity, removeFromCart } from '@/lib/cart'

// Map a stored cart item into the shape used by the UI / order modal.
function toDisplayItem(ci) {
    const extra = [ci.memory, ci.color].filter(Boolean).join(' / ')
    return {
        id: ci.variantId,
        variantId: ci.variantId,
        productId: ci.productId,
        name: extra ? `${ci.title} (${extra})` : ci.title,
        price: ci.price || 0,
        img: ci.image || '/imgs/product.png',
        qty: ci.quantity || 1,
    }
}

function formatRub(n) {
    return new Intl.NumberFormat('ru-RU').format(n) + ' ₽'
}

function Checkbox({ checked, onChange, size = 'md' }) {
    const sizeClass = size === 'sm' ? 'w-5 h-5' : 'w-6 h-6'
    return (
        <button
            type="button"
            onClick={onChange}
            className={`relative shrink-0 ${sizeClass} rounded-[6px] border-2 transition-colors duration-150 ${checked
                ? 'bg-[#D4A63A] border-[#D4A63A]'
                : 'border-[#D4D4D4] bg-white hover:border-[#D4A63A]/60'
                }`}
            aria-pressed={checked}
        >
            {checked && (
                <svg
                    className="absolute inset-0 m-auto"
                    width={size === 'sm' ? '12' : '14'}
                    height={size === 'sm' ? '12' : '14'}
                    viewBox="0 0 14 14"
                    fill="none"
                >
                    <path
                        d="M2 7l3 3 7-7"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
        </button>
    )
}

function QtySelector({ qty, onChange }) {
    return (
        <div className="inline-flex items-center bg-[#F4F4FA] rounded-[12px] h-10">
            <button
                type="button"
                onClick={() => onChange(Math.max(1, qty - 1))}
                className="w-10 h-10 flex items-center justify-center text-[#444444] hover:text-[#D4A63A] transition-colors disabled:opacity-30"
                disabled={qty <= 1}
                aria-label="Decrease quantity"
            >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                        d="M4 8h8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            </button>
            <span className="min-w-[28px] text-center text-[#222222] font-semibold">
                {qty}
            </span>
            <button
                type="button"
                onClick={() => onChange(qty + 1)}
                className="w-10 h-10 flex items-center justify-center text-[#444444] hover:text-[#D4A63A] transition-colors"
                aria-label="Increase quantity"
            >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                        d="M8 4v8M4 8h8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            </button>
        </div>
    )
}

function RemoveButton({ onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="w-8 h-8 rounded-full bg-[#F4F4FA] flex items-center justify-center text-[#888888] hover:bg-[#E5E5EA] hover:text-[#222222] transition-colors shrink-0"
            aria-label="Remove item"
        >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                    d="M3 3l8 8M11 3l-8 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
            </svg>
        </button>
    )
}

function CartItem({ item, selected, onToggle, onQty, onRemove }) {
    return (
        <>
            {/* DESKTOP layout */}
            <div className="hidden md:flex bg-white rounded-[20px] p-4 items-center gap-4">
                <Checkbox checked={selected} onChange={onToggle} />
                <div className="relative w-[80px] h-[80px] shrink-0 rounded-[12px] overflow-hidden bg-[#F4F4FA]">
                    <Image
                        src={item.img}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-contain"
                    />
                </div>
                <p className="grow text-[#222222] font-medium text-base">{item.name}</p>
                <QtySelector qty={item.qty} onChange={onQty} />
                <span className="text-[#D4A63A] font-bold text-lg lg:text-xl whitespace-nowrap min-w-[100px] text-right">
                    {formatRub(item.price * item.qty)}
                </span>
                <RemoveButton onClick={onRemove} />
            </div>

            {/* MOBILE layout */}
            <div className="md:hidden bg-white rounded-[20px] p-3 flex flex-col gap-3">
                <div className="flex gap-3">
                    <div className="relative w-[64px] h-[64px] shrink-0 rounded-[12px] overflow-hidden bg-[#F4F4FA]">
                        <Image
                            src={item.img}
                            alt={item.name}
                            fill
                            sizes="64px"
                            className="object-contain"
                        />
                    </div>
                    <p className="grow text-[#222222] font-medium text-sm leading-tight">
                        {item.name}
                    </p>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                        <Checkbox checked={selected} onChange={onToggle} size="sm" />
                        <RemoveButton onClick={onRemove} />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-[#D4A63A] font-bold text-lg whitespace-nowrap">
                        {formatRub(item.price * item.qty)}
                    </span>
                    <QtySelector qty={item.qty} onChange={onQty} />
                </div>
            </div>
        </>
    )
}

export default function BasketPage() {
    const [items, setItems] = useState([])
    const [selected, setSelected] = useState(new Set())
    const [orderOpen, setOrderOpen] = useState(false)

    // Load cart from localStorage; keep in sync with other tabs/components.
    useEffect(() => {
        function load() {
            const cart = getCart().map(toDisplayItem)
            setItems(cart)
            // Select everything that's still in the cart by default
            setSelected((prev) => {
                const ids = new Set(cart.map((i) => i.id))
                // keep previous selection where possible, else select all
                if (prev.size === 0) return ids
                return new Set([...prev].filter((id) => ids.has(id)))
            })
        }
        load()
        window.addEventListener('cart-updated', load)
        return () => window.removeEventListener('cart-updated', load)
    }, [])

    const allSelected = items.length > 0 && selected.size === items.length

    function toggleSelectAll() {
        if (allSelected) {
            setSelected(new Set())
        } else {
            setSelected(new Set(items.map((i) => i.id)))
        }
    }

    function toggleItem(id) {
        setSelected((prev) => {
            const next = new Set(prev)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return next
        })
    }

    function updateQty(id, qty) {
        setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)))
        updateCartQuantity(id, qty)
    }

    function removeItem(id) {
        setSelected((prev) => {
            const next = new Set(prev)
            next.delete(id)
            return next
        })
        removeFromCart(id)
    }

    function removeSelected() {
        removeFromCart([...selected])
        setSelected(new Set())
    }

    const total = items
        .filter((i) => selected.has(i.id))
        .reduce((sum, i) => sum + i.price * i.qty, 0)

    const selectedItems = items.filter((i) => selected.has(i.id))

    return (
        <main className="px-4 lg:px-0 lg:w-360 mx-auto mb-20 max-md:w-full">
            {/* Breadcrumb */}
            <div className="mb-4">
                <Breadcrumb
                    items={[{ name: 'Главная', href: '/' }, { name: 'Корзина' }]}
                />
            </div>

            {/* Title */}
            <h1 className="text-[#222222] font-bold text-[36px] sm:text-[48px] lg:text-[64px] mb-4 lg:mb-6">
                Корзина
            </h1>

            {items.length === 0 ? (
                <div className="bg-white rounded-[20px] p-10 text-center flex flex-col items-center">
                    <p className="text-[#888888] text-lg mb-4">Корзина пуста</p>
                    <Link
                        href="/catalog"
                        className="px-6 py-3 bg-[#D4A63A] text-[#222222] font-semibold rounded-[20px] hover:brightness-95 transition"
                    >
                        Перейти в каталог
                    </Link>
                </div>
            ) : (
                <>
                    {/* Action bar */}
                    <div className="flex flex-wrap items-center gap-3 lg:gap-6 mb-4 lg:mb-6">
                        <label className="flex items-center gap-2 lg:gap-3 cursor-pointer">
                            <Checkbox checked={allSelected} onChange={toggleSelectAll} />
                            <span className="text-[#222222] text-sm lg:text-base font-medium">
                                Выбрать все
                            </span>
                        </label>
                        <button
                            type="button"
                            onClick={removeSelected}
                            disabled={selected.size === 0}
                            className="flex items-center gap-2 lg:gap-3 text-[#888888] text-sm lg:text-base font-medium hover:text-[#222222] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <span className="w-6 h-6 rounded-full bg-[#D4D4D4] flex items-center justify-center">
                                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                                    <path
                                        d="M3 3l8 8M11 3l-8 8"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </span>
                            Удалить выбранное
                        </button>
                    </div>

                    {/* Main layout: items + summary */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4 lg:gap-6 items-start">
                        {/* Items list */}
                        <div className="flex flex-col gap-3">
                            {items.map((item) => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    selected={selected.has(item.id)}
                                    onToggle={() => toggleItem(item.id)}
                                    onQty={(q) => updateQty(item.id, q)}
                                    onRemove={() => removeItem(item.id)}
                                />
                            ))}
                        </div>

                        {/* Summary card (mobile: full width below items; desktop: sticky right) */}
                        <aside className="bg-white rounded-[20px] p-6 lg:sticky lg:top-6">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[#888888] text-base lg:text-lg">
                                    Итого:
                                </span>
                                <span className="text-[#D4A63A] font-bold text-[24px] lg:text-[32px]">
                                    {formatRub(total)}
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setOrderOpen(true)}
                                disabled={selected.size === 0}
                                className="w-full bg-[#D4A63A] text-[#222222] font-semibold text-base lg:text-lg py-3 lg:py-4 rounded-[20px] flex items-center justify-center gap-3 hover:brightness-95 active:brightness-90 disabled:opacity-50 disabled:cursor-not-allowed transition group"
                            >
                                Оформить заказ
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="transition-transform duration-200 group-hover:translate-x-1"
                                >
                                    <path
                                        d="M5 12h14M13 6l6 6-6 6"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </aside>
                    </div>
                </>
            )}

            {/* Order modal */}
            {orderOpen && (
                <OrderModal
                    items={selectedItems}
                    total={total}
                    onClose={() => setOrderOpen(false)}
                />
            )}
        </main>
    )
}
