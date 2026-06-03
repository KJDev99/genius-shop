'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

const BASE_URL = 'https://admin.geniusstorerf.ru/api'

const POPULAR_QUERIES = [
    'iPhone 17 Pro Max',
    'Samsung Galaxy S26',
    'MacBook Air M3',
    'AirPods Pro 2',
    'Apple Watch Ultra 2',
    'iPad Pro M4',
]

// cache settings across opens so we don't refetch every keystroke
let popularCache = null

function getFirstAvailableVariant(product) {
    return product.variants?.find(v => v.isAvailable) ?? product.variants?.[0] ?? null
}

function getProductImage(product) {
    const variant = getFirstAvailableVariant(product)
    return variant?.images?.[0]?.url ?? null
}

function getProductPrice(product) {
    const variant = getFirstAvailableVariant(product)
    if (!variant) return null
    return Math.round(variant.price).toLocaleString('ru-RU') + ' ₽'
}

export default function SearchDropdown({ query, onClose, onSelect, variant = 'desktop' }) {
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [popular, setPopular] = useState(popularCache || POPULAR_QUERIES)
    const trimmed = (query || '').trim()

    // Popular searches from site settings (fetched once, then cached)
    useEffect(() => {
        if (popularCache) return
        let cancelled = false
        fetch(`${BASE_URL}/site/settings`)
            .then((res) => res.json())
            .then((data) => {
                if (cancelled) return
                if (Array.isArray(data.popularSearches) && data.popularSearches.length) {
                    popularCache = data.popularSearches
                    setPopular(data.popularSearches)
                }
            })
            .catch(() => {})
        return () => {
            cancelled = true
        }
    }, [])

    useEffect(() => {
        if (!trimmed) {
            setResults([])
            return
        }
        const controller = new AbortController()
        setLoading(true)
        fetch(`${BASE_URL}/product/search/${encodeURIComponent(trimmed)}`, {
            signal: controller.signal,
        })
            .then(res => res.json())
            .then(data => {
                const arr = Array.isArray(data) ? data : (data.data ?? data.results ?? [])
                setResults(arr)
            })
            .catch(() => { })
            .finally(() => setLoading(false))
        return () => controller.abort()
    }, [trimmed])

    const wrapperClass =
        variant === 'desktop'
            ? 'absolute left-0 right-0 top-full mt-4 bg-white rounded-[20px] shadow-[0px_4px_15.8px_0px_rgba(0,0,0,0.21)] p-6 z-50'
            : 'bg-white rounded-[20px] p-4'

    return (
        <div className={wrapperClass}>
            {!trimmed ? (
                <>
                    <h3 className="text-[#222222] text-lg font-semibold mb-4">Популярные запросы</h3>
                    <div className="flex flex-wrap gap-2">
                        {popular.map((q) => (
                            <button
                                key={q}
                                onClick={() => onSelect?.(q)}
                                className="px-4 py-2 rounded-[20px] bg-[#F4F4FA] text-[#444444] text-sm font-medium hover:bg-[#D4A63A] hover:text-[#222222] transition-colors duration-150"
                                type="button"
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                </>
            ) : loading ? (
                <div className="flex items-center justify-center gap-2 py-6 text-[#888888] text-base">
                    <span className="w-4 h-4 border-2 border-[#ccc] border-t-[#888] rounded-full animate-spin" />
                    Поиск...
                </div>
            ) : results.length === 0 ? (
                <p className="text-[#888888] text-base text-center py-4">
                    По запросу «{query}» ничего не найдено
                </p>
            ) : (
                <div className="flex flex-col gap-3">
                    <h3 className="text-[#222222] text-lg font-semibold mb-2">
                        Найдено товаров: {results.length}
                    </h3>
                    {results.map((product) => {
                        const img = getProductImage(product)
                        const price = getProductPrice(product)
                        return (
                            <Link
                                key={product.id}
                                href={`/product/${product.slug}`}
                                onClick={onClose}
                                className="flex items-center gap-4 p-3 rounded-[16px] hover:bg-[#F4F4FA] transition-colors duration-150"
                            >
                                {img ? (
                                    <Image
                                        src={img}
                                        alt={product.title}
                                        width={64}
                                        height={64}
                                        className="rounded-[12px] object-cover"
                                    />
                                ) : (
                                    <div className="w-16 h-16 rounded-[12px] bg-[#F4F4FA] flex-shrink-0" />
                                )}
                                <div className="flex-1">
                                    <p className="text-[#222222] font-medium">{product.title}</p>
                                    {price && (
                                        <p className="text-[#D4A63A] font-bold mt-1">{price}</p>
                                    )}
                                </div>
                            </Link>
                        )
                    })}
                </div>
            )}
        </div>
    )
}