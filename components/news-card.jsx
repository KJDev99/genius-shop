import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

// "2026-05-30T10:47:17+00:00" -> "30.05.2026"
export function formatNewsDate(iso) {
    if (!iso) return ''
    const d = new Date(iso)
    return Number.isNaN(d.getTime())
        ? ''
        : d.toLocaleDateString('ru-RU', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
          })
}

// Small horizontal card used in the "Другие новости" sidebar.
export function NewsCardSmall({ news }) {
    return (
        <Link
            href={`/news/${news.slug}`}
            className="group flex gap-3 items-center bg-white rounded-[20px] p-3 transition-shadow duration-200 hover:shadow-[0_4px_15.8px_0_rgba(0,0,0,0.10)]"
        >
            <div className="relative w-[96px] h-[72px] shrink-0 rounded-[12px] overflow-hidden bg-[#F4F4FA]">
                {news.image && (
                    <Image
                        src={news.image}
                        alt={news.title}
                        fill
                        sizes="96px"
                        className="object-cover"
                        unoptimized
                    />
                )}
            </div>
            <div className="min-w-0">
                <h3 className="text-[#222222] font-semibold text-sm lg:text-base line-clamp-2 group-hover:text-[#D4A63A] transition-colors duration-150">
                    {news.title}
                </h3>
                <p className="text-[#888888] text-xs mt-1">
                    {formatNewsDate(news.createdAt)}
                </p>
            </div>
        </Link>
    )
}

export default function NewsCard({ news }) {
    return (
        <Link
            href={`/news/${news.slug}`}
            className="group rounded-[20px] bg-white overflow-hidden h-full flex flex-col transition-shadow duration-200 hover:shadow-[0_4px_15.8px_0_rgba(0,0,0,0.10)]"
        >
            <div className="relative w-full aspect-[355/200] overflow-hidden bg-[#F4F4FA]">
                {news.image && (
                    <Image
                        src={news.image}
                        alt={news.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        unoptimized
                    />
                )}
            </div>
            <div className="px-4 mt-4">
                <h3 className="text-[#222222] font-bold text-xl h-[54px] overflow-hidden line-clamp-2 group-hover:text-[#D4A63A] transition-colors duration-150">
                    {news.title}
                </h3>
            </div>
            <p className="text-[#444444] leading-[120%] mb-4 px-4 mt-2">
                {formatNewsDate(news.createdAt)}
            </p>
        </Link>
    )
}
