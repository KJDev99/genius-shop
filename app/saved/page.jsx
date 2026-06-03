'use client'

import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import Breadcrumb from '@/components/breadcrumb'
import ProductCard from '@/components/product-card'
import HomeConsultation from '@/components/home/home-consultation'
import { getWishlist, clearWishlist } from '@/lib/cart'

const API = 'https://admin.geniusstorerf.ru/api'

export default function SavedPage() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    // Load the full product for every slug in the wishlist.
    const load = useCallback(async () => {
        const list = getWishlist()
        if (list.length === 0) {
            setProducts([])
            setLoading(false)
            return
        }
        try {
            const results = await Promise.all(
                list.map((item) =>
                    fetch(`${API}/product/slug/${item.slug}`)
                        .then((r) => (r.ok ? r.json() : null))
                        .catch(() => null)
                )
            )
            setProducts(results.filter(Boolean))
        } catch {
            setProducts([])
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        load()
        // Reload whenever the wishlist changes (item removed via card heart, etc.)
        function onChange() {
            load()
        }
        window.addEventListener('wishlist-updated', onChange)
        return () => window.removeEventListener('wishlist-updated', onChange)
    }, [load])

    return (
        <>
            <main className="px-4 lg:px-0 lg:w-360 mx-auto mb-12">
                {/* Breadcrumb */}
                <div className="mb-4">
                    <Breadcrumb
                        items={[
                            { name: 'Главная', href: '/' },
                            { name: 'Избранные товары' },
                        ]}
                    />
                </div>

                {/* Title + clear */}
                <div className="flex items-center justify-between gap-4 mb-6 lg:mb-8">
                    <h1 className="text-[#222222] font-bold text-[32px] sm:text-[40px] lg:text-[50px]">
                        Избранные товары
                    </h1>
                    {products.length > 0 && (
                        <button
                            type="button"
                            onClick={clearWishlist}
                            className="text-[#888888] text-base font-medium hover:text-[#222222] transition-colors duration-150 shrink-0"
                        >
                            Очистить
                        </button>
                    )}
                </div>

                {/* Loading */}
                {loading && (
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-6">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-[20px] p-4 animate-pulse"
                            >
                                <div className="aspect-square bg-[#F4F4FA] rounded-[12px] mb-4" />
                                <div className="h-4 bg-[#F4F4FA] rounded mb-2 w-3/4" />
                                <div className="h-8 bg-[#F4F4FA] rounded w-full mt-4" />
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {!loading && products.length === 0 && (
                    <div className="bg-white rounded-[20px] p-10 lg:p-16 text-center flex flex-col items-center">
                        <svg
                            width="56"
                            height="56"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="mb-4 opacity-40"
                        >
                            <path
                                d="M12 21s-7-4.5-9-9c-1.5-3 0-7 4-7 2 0 3.5 1.5 5 3 1.5-1.5 3-3 5-3 4 0 5.5 4 4 7-2 4.5-9 9-9 9z"
                                stroke="#D4A63A"
                                strokeWidth="1.5"
                            />
                        </svg>
                        <p className="text-[#444444] text-lg font-medium mb-2">
                            В избранном пока пусто
                        </p>
                        <p className="text-[#888888] text-sm mb-6">
                            Добавляйте товары, нажав на сердечко
                        </p>
                        <Link
                            href="/catalog"
                            className="px-6 py-3 bg-[#D4A63A] text-[#222222] font-semibold rounded-[20px] hover:brightness-95 transition"
                        >
                            Перейти в каталог
                        </Link>
                    </div>
                )}

                {/* Grid */}
                {!loading && products.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-6">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </main>

            {/* Consultation banner */}
            <HomeConsultation />
        </>
    )
}
