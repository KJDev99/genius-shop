'use client'

import React, { useEffect, useState } from 'react'
import Breadcrumb from '@/components/breadcrumb'
import NewsCard from '@/components/news-card'
import HomeConsultation from '@/components/home/home-consultation'

const API = 'https://admin.geniusstorerf.ru/api'

export default function NewsPage() {
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let cancelled = false
        async function load() {
            setLoading(true)
            try {
                const res = await fetch(`${API}/news/all/1/100`)
                const data = res.ok ? await res.json() : {}
                if (!cancelled) setNews(data.data || [])
            } catch {
                if (!cancelled) setNews([])
            } finally {
                if (!cancelled) setLoading(false)
            }
        }
        load()
        return () => {
            cancelled = true
        }
    }, [])

    return (
        <>
        <main className="px-4 lg:px-0 lg:w-360 mx-auto mb-12">
            {/* Breadcrumb */}
            <div className="mb-4">
                <Breadcrumb
                    items={[{ name: 'Главная', href: '/' }, { name: 'Новости' }]}
                />
            </div>

            {/* Title */}
            <h1 className="text-[#222222] font-bold text-[36px] sm:text-[48px] lg:text-[64px] mb-6 lg:mb-8">
                Новости
            </h1>

            {/* Loading */}
            {loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div
                            key={i}
                            className="rounded-[20px] bg-white overflow-hidden animate-pulse"
                        >
                            <div className="w-full aspect-[355/200] bg-[#F4F4FA]" />
                            <div className="p-4">
                                <div className="h-5 bg-[#F4F4FA] rounded mb-2 w-3/4" />
                                <div className="h-4 bg-[#F4F4FA] rounded w-1/3" />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Empty */}
            {!loading && news.length === 0 && (
                <div className="bg-white rounded-[20px] p-10 text-center">
                    <p className="text-[#888888] text-lg">Новостей пока нет</p>
                </div>
            )}

            {/* Grid */}
            {!loading && news.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                    {news.map((item) => (
                        <NewsCard key={item.id} news={item} />
                    ))}
                </div>
            )}
        </main>

        {/* Consultation banner */}
        <HomeConsultation />
        </>
    )
}
