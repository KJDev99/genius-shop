'use client'

import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import ProductCard from '@/components/product-card'

const API = 'https://admin.geniusstorerf.ru/api'

// "С этим товаром покупают" — products from the same category as the current one.
export default function RelatedProducts({ slug, limit = 8 }) {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!slug) return
        let cancelled = false
        async function load() {
            setLoading(true)
            try {
                const res = await fetch(
                    `${API}/product/slug/${slug}/related?limit=${limit}`
                )
                const data = res.ok ? await res.json() : []
                const list = Array.isArray(data) ? data : data.data || []
                if (!cancelled) setProducts(list)
            } catch {
                if (!cancelled) setProducts([])
            } finally {
                if (!cancelled) setLoading(false)
            }
        }
        load()
        return () => {
            cancelled = true
        }
    }, [slug, limit])

    // Nothing to show — hide the whole section
    if (!loading && products.length === 0) return null

    return (
        <section className="px-4 lg:px-0 lg:w-360 mx-auto mb-20">
            <h2 className="text-[#222222] font-bold text-[28px] sm:text-[36px] lg:text-[50px] mb-6 lg:mb-8">
                С этим товаром покупают
            </h2>

            {loading ? (
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 lg:gap-6">
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
            ) : (
                <Swiper
                    modules={[Pagination]}
                    spaceBetween={24}
                    slidesPerView={1.2}
                    breakpoints={{
                        640: { slidesPerView: 2, spaceBetween: 16 },
                        1024: { slidesPerView: 3, spaceBetween: 24 },
                        1280: { slidesPerView: 4, spaceBetween: 24 },
                    }}
                    pagination={{
                        clickable: true,
                        bulletClass:
                            'inline-block h-2.5 w-2.5 rounded-sm bg-[#D4D4D4] mx-1 cursor-pointer transition-all duration-200',
                        bulletActiveClass: '!w-10 !bg-[#D4A63A]',
                    }}
                    className="!pb-12"
                >
                    {products.map((product) => (
                        <SwiperSlide key={product.id} className="h-auto">
                            <ProductCard product={product} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </section>
    )
}
