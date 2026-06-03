'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Breadcrumb from '@/components/breadcrumb'
import { NewsCardSmall, formatNewsDate } from '@/components/news-card'

const API = 'https://admin.geniusstorerf.ru/api'

export default function NewsDetailPage() {
    const params = useParams()
    const slug = params.detail

    const [article, setArticle] = useState(null)
    const [others, setOthers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (!slug) return
        let cancelled = false
        async function load() {
            setLoading(true)
            setError(false)
            try {
                const [artRes, listRes] = await Promise.all([
                    fetch(`${API}/news/slug/${slug}`),
                    fetch(`${API}/news/all/1/100`),
                ])
                if (!artRes.ok) throw new Error('not found')
                const art = await artRes.json()
                const list = listRes.ok ? await listRes.json() : { data: [] }
                if (cancelled) return
                setArticle(art)
                setOthers(
                    (list.data || [])
                        .filter((n) => n.slug !== slug)
                        .slice(0, 4)
                )
            } catch {
                if (!cancelled) setError(true)
            } finally {
                if (!cancelled) setLoading(false)
            }
        }
        load()
        return () => {
            cancelled = true
        }
    }, [slug])

    // ── Loading ──
    if (loading) {
        return (
            <main className="px-4 lg:px-0 lg:w-360 mx-auto mb-20 mt-4">
                <div className="bg-white rounded-[20px] p-6 lg:p-10 animate-pulse">
                    <div className="h-8 bg-[#F4F4FA] rounded w-2/3 mb-4" />
                    <div className="h-4 bg-[#F4F4FA] rounded w-24 mb-6" />
                    <div className="w-full aspect-[16/7] bg-[#F4F4FA] rounded-[20px] mb-6" />
                    <div className="h-4 bg-[#F4F4FA] rounded w-full mb-2" />
                    <div className="h-4 bg-[#F4F4FA] rounded w-5/6 mb-2" />
                    <div className="h-4 bg-[#F4F4FA] rounded w-4/6" />
                </div>
            </main>
        )
    }

    // ── Error / not found ──
    if (error || !article) {
        return (
            <main className="px-4 lg:px-0 lg:w-360 mx-auto mb-20">
                <div className="flex flex-col items-center justify-center py-32 text-center">
                    <p className="text-[#444444] text-lg mb-4">Новость не найдена.</p>
                    <Link
                        href="/news"
                        className="px-6 py-3 bg-[#D4A63A] text-[#222222] font-semibold rounded-[20px] hover:brightness-95 transition"
                    >
                        Все новости
                    </Link>
                </div>
            </main>
        )
    }

    const steps = article.blogSteps || []

    return (
        <main className="px-4 lg:px-0 lg:w-360 mx-auto mb-20">
            {/* Breadcrumb */}
            <div className="mb-4 overflow-x-auto pb-1">
                <Breadcrumb
                    items={[
                        { name: 'Главная', href: '/' },
                        { name: 'Новости', href: '/news' },
                        { name: article.title },
                    ]}
                />
            </div>

            {/* Two columns: article + "Другие новости" sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_400px] gap-6 items-start">
            {/* Article */}
            <article className="bg-white rounded-[20px] p-5 sm:p-6 lg:p-10">
                <h1 className="text-[#222222] font-bold text-[28px] sm:text-[36px] lg:text-[44px] leading-tight mb-3">
                    {article.title}
                </h1>
                <p className="text-[#888888] text-sm lg:text-base mb-6">
                    {formatNewsDate(article.createdAt)}
                </p>

                {article.image && (
                    <div className="relative w-full aspect-[16/8] rounded-[20px] overflow-hidden mb-6 bg-[#F4F4FA]">
                        <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 1440px"
                            className="object-cover"
                            priority
                            unoptimized
                        />
                    </div>
                )}

                {article.content && (
                    <p className="text-[#444444] text-base lg:text-lg leading-[160%] whitespace-pre-line mb-6">
                        {article.content}
                    </p>
                )}

                {/* Steps */}
                {steps.length > 0 && (
                    <div className="flex flex-col gap-6">
                        {steps.map((step) => (
                            <div key={step.id}>
                                {step.title && (
                                    <h2 className="text-[#222222] font-bold text-[20px] lg:text-[24px] mb-2">
                                        {step.title}
                                    </h2>
                                )}
                                {step.content && (
                                    <p className="text-[#444444] text-base lg:text-lg leading-[160%] whitespace-pre-line">
                                        {step.content}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </article>

            {/* Другие новости — sidebar */}
            {others.length > 0 && (
                <aside className="lg:sticky lg:top-6">
                    <h2 className="text-[#222222] font-bold text-[22px] lg:text-[28px] mb-4">
                        Другие новости
                    </h2>
                    <div className="flex flex-col gap-3">
                        {others.map((item) => (
                            <NewsCardSmall key={item.id} news={item} />
                        ))}
                    </div>
                </aside>
            )}
            </div>
        </main>
    )
}
