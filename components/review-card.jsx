'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export const SOURCE_LABELS = {
    avito: 'Avito',
    yandex: 'Яндекс Карты',
    site: 'Сайт',
}

// "2026-05-30T10:47:17+00:00" -> "30 мая 2026"
export function formatReviewDate(iso) {
    if (!iso) return ''
    const d = new Date(iso)
    return Number.isNaN(d.getTime())
        ? ''
        : d.toLocaleDateString('ru-RU', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
          })
}

// Extract a YouTube video id from watch / youtu.be / embed links.
function getYouTubeId(url) {
    if (!url) return null
    const m = url.match(
        /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/
    )
    return m ? m[1] : null
}

function Stars({ rating = 0 }) {
    return (
        <div className="flex gap-0.5 shrink-0">
            {Array.from({ length: 5 }).map((_, i) => (
                <Image
                    key={i}
                    src="/icons/Star.svg"
                    alt=""
                    width={18}
                    height={18}
                    className={i < rating ? '' : 'opacity-25'}
                />
            ))}
        </div>
    )
}

export function ReviewCard({ review }) {
    return (
        <div className="p-6 rounded-[20px] bg-white h-full flex flex-col transition-shadow duration-200 hover:shadow-[0_4px_15.8px_0_rgba(0,0,0,0.10)]">
            <div className="flex justify-between items-start gap-3 mb-3">
                <h3 className="text-[#222222] font-bold text-xl">
                    {review.authorName}
                </h3>
                <Stars rating={review.rating} />
            </div>
            <p className="text-[#888888] text-sm mb-4">
                {formatReviewDate(review.createdAt)}
            </p>
            <p className="text-[#444444] text-sm lg:text-base leading-[120%] line-clamp-3 h-15 mb-4">
                {review.text}
            </p>
            <span className="mt-auto inline-flex w-fit items-center px-3 py-1 rounded-full bg-[#F4F4FA] text-[#888888] text-xs font-medium">
                {SOURCE_LABELS[review.source] || review.source}
            </span>
        </div>
    )
}

// Modal player — opens full-screen on top of everything (rendered via a portal
// to document.body so Swiper's transform doesn't trap the fixed overlay).
function VideoModal({ video, onClose }) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
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

    if (!mounted) return null

    const ytId = getYouTubeId(video.videoUrl)

    return createPortal(
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-[2px]"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-[900px]"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Закрыть"
                    className="absolute -top-11 right-0 text-white/80 hover:text-white transition-colors"
                >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M6 6l12 12M18 6L6 18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                </button>
                <div className="relative aspect-video rounded-[20px] overflow-hidden bg-black">
                    {ytId ? (
                        <iframe
                            src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`}
                            title={`Видео-отзыв — ${video.authorName}`}
                            className="absolute inset-0 w-full h-full"
                            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                            allowFullScreen
                        />
                    ) : (
                        <video
                            src={video.videoUrl}
                            poster={video.thumbnail}
                            controls
                            autoPlay
                            className="absolute inset-0 w-full h-full object-contain"
                        />
                    )}
                </div>
            </div>
        </div>,
        document.body
    )
}

export function VideoCard({ video }) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="group rounded-[20px] bg-white text-left w-full h-full flex flex-col overflow-hidden transition-shadow duration-200 hover:shadow-[0_4px_15.8px_0_rgba(0,0,0,0.10)]"
            >
                <div className="relative w-full aspect-[355/200] overflow-hidden bg-[#F4F4FA]">
                    {video.thumbnail && (
                        <Image
                            src={video.thumbnail}
                            alt={`Видео-отзыв — ${video.authorName}`}
                            fill
                            unoptimized
                            sizes="(max-width: 768px) 100vw, 25vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    )}
                    {/* Play overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors duration-200">
                        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200">
                            <span className="ml-1 w-0 h-0 border-y-[10px] border-y-transparent border-l-[16px] border-l-[#D4A63A]" />
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center px-4 mt-4 mb-4">
                    <h3 className="text-[#222222] font-bold text-lg lg:text-xl">
                        {video.authorName}
                    </h3>
                    <p className="text-[#888888] text-sm">
                        {formatReviewDate(video.createdAt)}
                    </p>
                </div>
            </button>

            {open && <VideoModal video={video} onClose={() => setOpen(false)} />}
        </>
    )
}
