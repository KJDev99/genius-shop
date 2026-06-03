'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Breadcrumb from '@/components/breadcrumb'
import HomeConsultation from '@/components/home/home-consultation'
import { ReviewCard, VideoCard } from '@/components/review-card'

const API = 'https://admin.geniusstorerf.ru/api'

const FILTERS = [
    { id: 'all', label: 'Все отзывы' },
    { id: 'avito', label: 'Авито' },
    { id: 'yandex', label: 'Яндекс карты' },
]

export default function ReviewPage() {
    const [reviews, setReviews] = useState([])
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('all')

    useEffect(() => {
        let cancelled = false
        async function load() {
            setLoading(true)
            try {
                const [rRes, vRes] = await Promise.all([
                    fetch(`${API}/reviews`),
                    fetch(`${API}/reviews/videos`),
                ])
                const r = rRes.ok ? await rRes.json() : { data: [] }
                const v = vRes.ok ? await vRes.json() : { data: [] }
                if (cancelled) return
                setReviews(r.data || [])
                setVideos(v.data || [])
            } catch {
                if (!cancelled) {
                    setReviews([])
                    setVideos([])
                }
            } finally {
                if (!cancelled) setLoading(false)
            }
        }
        load()
        return () => {
            cancelled = true
        }
    }, [])

    const filteredReviews = useMemo(
        () =>
            filter === 'all'
                ? reviews
                : reviews.filter((r) => r.source === filter),
        [reviews, filter]
    )

    return (
        <>
            <main className="px-4 lg:px-0 lg:w-360 mx-auto mb-12">
                {/* Breadcrumb */}
                <div className="mb-4">
                    <Breadcrumb
                        items={[{ name: 'Главная', href: '/' }, { name: 'Отзывы' }]}
                    />
                </div>

                {/* Title */}
                <h1 className="text-[#222222] font-bold text-[36px] sm:text-[48px] lg:text-[64px] mb-6 lg:mb-8">
                    Отзывы
                </h1>

                {/* Filters */}
                <div className="flex gap-2 mb-6 overflow-x-auto -mx-1 px-1 pb-1">
                    {FILTERS.map((f) => (
                        <button
                            key={f.id}
                            type="button"
                            onClick={() => setFilter(f.id)}
                            className={`px-5 lg:px-6 py-2.5 lg:py-3 rounded-[20px] text-sm lg:text-base font-medium whitespace-nowrap transition-colors duration-150 shrink-0 ${filter === f.id
                                ? 'bg-[#D4A63A] text-[#222222] font-semibold'
                                : 'bg-white text-[#444444] hover:bg-[#F4F4FA]'
                                }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                {/* Reviews grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="rounded-[20px] bg-white p-6 h-[220px] animate-pulse"
                            />
                        ))}
                    </div>
                ) : filteredReviews.length === 0 ? (
                    <div className="bg-white rounded-[20px] p-10 text-center">
                        <p className="text-[#888888] text-lg">Отзывов пока нет</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                        {filteredReviews.map((review) => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                    </div>
                )}

                {/* Видео-отзывы */}
                {videos.length > 0 && (
                    <section className="mt-12 lg:mt-16">
                        <h2 className="text-[#222222] font-bold text-[28px] sm:text-[36px] lg:text-[50px] mb-6 lg:mb-8">
                            Видео-отзывы
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                            {videos.map((video) => (
                                <VideoCard key={video.id} video={video} />
                            ))}
                        </div>
                    </section>
                )}
            </main>

            {/* Consultation banner */}
            <HomeConsultation />
        </>
    )
}
