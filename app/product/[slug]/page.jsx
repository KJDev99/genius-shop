'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import Breadcrumb from '@/components/breadcrumb'
import RelatedProducts from '@/components/related-products'
import HomeConsultation from '@/components/home/home-consultation'
import {
    isInCart,
    isInWishlist,
    toggleCart,
    toggleWishlist,
} from '@/lib/cart'

// ─── API base ────────────────────────────────────────────────────────────────
const API = 'https://admin.geniusstorerf.ru/api'

const TABS = [
    { id: 'description', label: 'Описание' },
    { id: 'specs', label: 'Характеристика' },
    { id: 'payment', label: 'Оплата' },
    { id: 'delivery', label: 'Доставка' },
]

// ─── Helpers ───────────────────────────────────────────────────────────────────
function formatPrice(value) {
    if (value == null) return '—'
    return new Intl.NumberFormat('ru-RU').format(Math.round(value)) + ' ₽'
}

// Unique items keyed by a getter, preserving first occurrence order.
function uniqueBy(arr, keyFn) {
    const seen = new Set()
    const out = []
    for (const item of arr) {
        const k = keyFn(item)
        if (seen.has(k)) continue
        seen.add(k)
        out.push(item)
    }
    return out
}

// === COMPONENTS ===

function Tag({ label, color }) {
    const dotColor =
        color === 'green'
            ? 'bg-[#1FB876]'
            : 'hidden'
    const textColor =
        color === 'green'
            ? 'text-[#1FB876]'
            : color === 'grey'
                ? 'text-[#888888]'
                : 'text-[#D4A63A]'
    const border = color === 'grey' ? 'border-[#888888]/40' : 'border-[#D4A63A]/40'
    return (
        <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border ${border} text-xs lg:text-sm whitespace-nowrap ${textColor}`}
        >
            <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
            {label}
        </span>
    )
}

function ImageGallery({ images }) {
    const [activeIdx, setActiveIdx] = useState(0)
    const [thumbStart, setThumbStart] = useState(0)
    const visibleThumbs = 5

    function scrollUp() {
        setThumbStart((s) => Math.max(0, s - 1))
    }
    function scrollDown() {
        setThumbStart((s) => Math.min(images.length - visibleThumbs, s + 1))
    }

    if (!images.length) {
        return (
            <div className="bg-white rounded-[20px] p-4 lg:p-6 flex items-center justify-center aspect-square lg:h-[528px]">
                <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
                    <rect width="48" height="48" rx="12" fill="#E8E8F0" />
                    <path
                        d="M16 32l8-10 6 7 4-5 6 8H8"
                        stroke="#AAAACC"
                        strokeWidth="2"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-[20px] p-4 lg:p-6 flex flex-col lg:flex-row gap-4">
            {/* DESKTOP: Vertical thumbnails */}
            {images.length > 1 && (
                <div className="hidden lg:flex flex-col gap-2 w-[80px] shrink-0">
                    <button
                        type="button"
                        onClick={scrollUp}
                        disabled={thumbStart === 0}
                        className="w-full h-8 flex items-center justify-center text-[#888888] hover:text-[#222222] disabled:opacity-30 disabled:cursor-not-allowed transition"
                        aria-label="Previous thumbnails"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path
                                d="M4 10l4-4 4 4"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                    <div className="flex flex-col gap-2">
                        {images.slice(thumbStart, thumbStart + visibleThumbs).map((img, idx) => {
                            const realIdx = thumbStart + idx
                            return (
                                <button
                                    key={realIdx}
                                    type="button"
                                    onClick={() => setActiveIdx(realIdx)}
                                    className={`relative w-full aspect-square rounded-[12px] overflow-hidden border-2 transition-colors duration-150 ${activeIdx === realIdx
                                        ? 'border-[#D4A63A]'
                                        : 'border-transparent hover:border-[#D4A63A]/40'
                                        }`}
                                >
                                    <Image
                                        src={img}
                                        alt={`Thumbnail ${realIdx + 1}`}
                                        fill
                                        sizes="80px"
                                        className="object-contain"
                                    />
                                </button>
                            )
                        })}
                    </div>

                    <button
                        type="button"
                        onClick={scrollDown}
                        disabled={thumbStart + visibleThumbs >= images.length}
                        className="w-full h-8 flex items-center justify-center text-[#888888] hover:text-[#222222] disabled:opacity-30 disabled:cursor-not-allowed transition"
                        aria-label="Next thumbnails"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path
                                d="M4 6l4 4 4-4"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>
            )}

            {/* DESKTOP: main image (thumbnails switch it) */}
            <div className="hidden lg:block relative grow lg:h-[480px]">
                <Image
                    src={images[activeIdx]}
                    alt="Product"
                    fill
                    sizes="480px"
                    quality={100}
                    className="object-contain"
                    priority
                />
            </div>

            {/* MOBILE: swipeable carousel with dots */}
            <div className="lg:hidden w-full overflow-hidden">
                <Swiper
                    modules={[Pagination]}
                    pagination={{
                        clickable: true,
                        bulletClass:
                            'inline-block h-1.5 w-1.5 rounded-full bg-[#D4D4D4] mx-1 transition-all duration-200 cursor-pointer',
                        bulletActiveClass: '!w-6 !bg-[#D4A63A]',
                    }}
                    className="!pb-8"
                >
                    {images.map((img, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="relative w-full h-[320px] sm:h-[400px]">
                                <Image
                                    src={img}
                                    alt={`Product ${idx + 1}`}
                                    fill
                                    sizes="100vw"
                                    quality={100}
                                    className="object-contain"
                                    priority={idx === 0}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

function InfoCard({ product, onSelectColor, onSelectMemory, variantLoading }) {
    const selectedVariant = product.selectedVariant

    // Color swatches come straight from the server (`colors[]`).
    const colors = useMemo(() => product.colors || [], [product.colors])

    // Memory options depend on the active color: `colors[active].memories[]`.
    const memories = useMemo(() => {
        const activeColor = colors.find((c) => c.id === selectedVariant?.colorId)
        return activeColor?.memories || []
    }, [colors, selectedVariant?.colorId])

    // SIM types available for the selected variant
    const sims = useMemo(() => {
        const list = selectedVariant?.simTypes || []
        return uniqueBy(list, (s) => s.simTypeId).map((s) => ({
            id: s.simTypeId,
            name: s.simType?.name,
            price: s.price,
        }))
    }, [selectedVariant])

    const [selectedSimId, setSelectedSimId] = useState(
        selectedVariant?.simTypeId || sims[0]?.id || null
    )
    const [liked, setLiked] = useState(false)
    const [inCart, setInCart] = useState(false)
    const [cartAnim, setCartAnim] = useState(false)

    // Reset selected SIM when the variant changes
    useEffect(() => {
        setSelectedSimId(selectedVariant?.simTypeId || sims[0]?.id || null)
    }, [selectedVariant?.id])

    // Sync cart / wishlist state
    useEffect(() => {
        setLiked(isInWishlist(product.id))
        if (selectedVariant) setInCart(isInCart(selectedVariant.id))
    }, [product.id, selectedVariant?.id])

    useEffect(() => {
        function syncCart() {
            if (selectedVariant) setInCart(isInCart(selectedVariant.id))
        }
        function syncWishlist() {
            setLiked(isInWishlist(product.id))
        }
        window.addEventListener('cart-updated', syncCart)
        window.addEventListener('wishlist-updated', syncWishlist)
        return () => {
            window.removeEventListener('cart-updated', syncCart)
            window.removeEventListener('wishlist-updated', syncWishlist)
        }
    }, [product.id, selectedVariant?.id])

    // Color / memory switching is resolved by the backend: the parent refetches
    // the product with the chosen colorId / memoryId in the query, which returns
    // the matching variant (images, price, specs all kept in sync).
    function selectColor(colorId) {
        if (colorId !== selectedVariant?.colorId) onSelectColor(colorId)
    }
    function selectMemory(memoryId) {
        if (memoryId !== selectedVariant?.memoryId) onSelectMemory(memoryId)
    }

    // Price for the selected SIM (falls back to variant base price)
    const simEntry = sims.find((s) => s.id === selectedSimId)
    const price = simEntry?.price ?? selectedVariant?.price
    const oldPrice = selectedVariant?.oldPrice
    const available = selectedVariant?.isAvailable

    // Tags
    const tags = []
    tags.push(
        available
            ? { label: 'В наличии', color: 'green' }
            : { label: 'Нет в наличии', color: 'grey' }
    )
    if (product.condition?.name) tags.push({ label: product.condition.name, color: 'gold' })
    tags.push({ label: 'Оригинал', color: 'gold' })
    tags.push({ label: 'Гарантия', color: 'gold' })

    function handleCart() {
        if (!selectedVariant) return
        const added = toggleCart({
            variantId: selectedVariant.id,
            productId: product.id,
            title: product.title,
            slug: product.slug,
            price,
            oldPrice: selectedVariant.oldPrice,
            discount: selectedVariant.discount,
            image: product.images?.[0]?.url || null,
            memory: selectedVariant.memory?.name || null,
            color: selectedVariant.color?.name || null,
            colorHex: selectedVariant.color?.hex || null,
            simType: simEntry?.name || null,
        })
        // inCart is synced via the 'cart-updated' listener; avoid a second
        // (cancelling) state update here.
        if (added) {
            setCartAnim(true)
            setTimeout(() => setCartAnim(false), 600)
        }
    }

    function handleLike() {
        if (!selectedVariant) return
        // liked is synced via the 'wishlist-updated' listener — no optimistic
        // toggle, or the two updates would cancel out.
        toggleWishlist({
            productId: product.id,
            variantId: selectedVariant.id,
            title: product.title,
            slug: product.slug,
            price,
            image: product.images?.[0]?.url || null,
        })
    }

    return (
        <div className="bg-white rounded-[20px] p-6 lg:p-8 flex flex-col h-full">
            <h1 className="text-[#222222] font-bold text-[28px] sm:text-[32px] lg:text-[36px] leading-tight mb-4">
                {product.title}
            </h1>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
                {tags.map((t) => (
                    <Tag key={t.label} label={t.label} color={t.color} />
                ))}
            </div>

            {/* Color */}
            {colors.length > 0 && (
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <span className="text-[#888888] text-base shrink-0">Цвет:</span>
                    <div className="flex gap-2 flex-wrap">
                        {colors.map((c) => (
                            <button
                                key={c.id}
                                type="button"
                                disabled={variantLoading}
                                onClick={() => selectColor(c.id)}
                                className={`w-7 h-7 rounded-full ring-offset-2 transition-shadow duration-150 disabled:cursor-not-allowed ${selectedVariant?.colorId === c.id
                                    ? 'ring-2 ring-[#D4A63A] ring-offset-white'
                                    : 'ring-1 ring-[#D4D4D4]'
                                    }`}
                                style={{ backgroundColor: c.hex }}
                                aria-label={c.name}
                                title={c.name}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Memory */}
            {memories.length > 0 && (
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <span className="text-[#888888] text-base shrink-0">Память:</span>
                    <div className="flex flex-wrap gap-2">
                        {memories.map((m) => (
                            <button
                                key={m.memoryId}
                                type="button"
                                disabled={variantLoading}
                                onClick={() => selectMemory(m.memoryId)}
                                className={`px-4 py-1.5 rounded-[12px] text-sm font-medium border transition-colors duration-150 disabled:cursor-not-allowed ${selectedVariant?.memoryId === m.memoryId
                                    ? 'border-[#D4A63A] text-[#D4A63A] bg-white'
                                    : 'border-[#F4F4FA] text-[#444444] hover:border-[#D4A63A]/40'
                                    }`}
                            >
                                {m.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* SIM */}
            {sims.length > 0 && (
                <div className="flex items-center gap-3 mb-6 flex-wrap">
                    <span className="text-[#888888] text-base shrink-0">Связь:</span>
                    <div className="flex gap-2 flex-wrap">
                        {sims.map((s) => (
                            <button
                                key={s.id}
                                type="button"
                                onClick={() => setSelectedSimId(s.id)}
                                className={`px-4 py-1.5 rounded-[12px] text-sm font-medium border transition-colors duration-150 ${selectedSimId === s.id
                                    ? 'border-[#D4A63A] text-[#D4A63A] bg-white'
                                    : 'border-[#F4F4FA] text-[#444444] hover:border-[#D4A63A]/40'
                                    }`}
                            >
                                {s.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Short description — fills the middle gap on desktop only */}
            {product.description && (
                <div className="hidden lg:flex flex-col justify-center flex-1 py-4">
                    <h3 className="text-[#222222] font-semibold text-base mb-2">
                        Описание
                    </h3>
                    <p className="text-[#888888] text-sm leading-[150%] line-clamp-3 whitespace-pre-line">
                        {product.description}
                    </p>
                </div>
            )}

            {/* Price + Cart + Heart */}
            <div className="flex items-center gap-3 lg:gap-4 mt-auto pt-2 ">
                <div className="flex flex-col">

                    <span className="text-[#D4A63A] font-bold text-[28px] lg:text-[36px] whitespace-nowrap leading-tight">
                        {formatPrice(price)}
                    </span>
                </div>
                <button
                    type="button"
                    onClick={handleCart}
                    disabled={!available}
                    className={`md:grow max-md:ml-auto font-semibold px-4 lg:px-6 py-3.5 lg:py-4 rounded-[20px] flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed max-md:w-12 ${inCart
                        ? 'bg-[#222222] text-white hover:bg-[#333333]'
                        : 'bg-[#D4A63A] text-[#222222] hover:brightness-95 active:brightness-90'
                        } ${cartAnim ? 'scale-95' : 'scale-100'}`}
                >
                    {inCart ? (
                        <>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path
                                    d="M4 10l4 4 8-8"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span className="hidden sm:inline">В корзине</span>
                        </>
                    ) : (
                        <>
                            <Image src="/icons/cart.svg" alt="" width={24} height={24} />
                            <span className="hidden sm:inline">Добавить в корзину</span>

                        </>
                    )}
                </button>
                <button
                    type="button"
                    onClick={handleLike}
                    className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border-2 border-[#D4A63A] flex items-center justify-center transition-transform duration-150 hover:scale-105 active:scale-95 shrink-0"
                    aria-label="Add to favorites"
                >
                    <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill={liked ? '#D4A63A' : 'none'}
                    >
                        <path
                            d="M12 21s-7-4.5-9-9c-1.5-3 0-7 4-7 2 0 3.5 1.5 5 3 1.5-1.5 3-3 5-3 4 0 5.5 4 4 7-2 4.5-9 9-9 9z"
                            stroke="#D4A63A"
                            strokeWidth="1.8"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>
        </div>
    )
}

function TabDescription({ text }) {
    return (
        <div>
            <h2 className="text-[#222222] font-bold text-[24px] lg:text-[28px] mb-4">
                Описание
            </h2>
            <div className="text-[#444444] text-base leading-[150%] whitespace-pre-line break-words">
                {text || 'Описание появится позже.'}
            </div>
        </div>
    )
}

function TabSpecs({ specs }) {
    return (
        <div>
            <h2 className="text-[#222222] font-bold text-[24px] lg:text-[28px] mb-4">
                Характеристика
            </h2>
            <div className="flex flex-col">
                {specs.map(([key, value]) => (
                    <div
                        key={key}
                        className="grid grid-cols-2 gap-4 py-3 border-b border-[#F4F4FA] last:border-b-0"
                    >
                        <div className="min-w-0 break-words text-[#888888] text-sm lg:text-base">{key}</div>
                        <div className="min-w-0 break-words text-[#222222] text-sm lg:text-base">{value}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function TabPayment() {
    const sections = [
        {
            title: '1. Оплата при получении',
            items: [
                'Курьеру наличными',
                'Оплата картой через терминал (если доступно)',
                'Проверка устройства перед оплатой',
            ],
        },
        {
            title: '2. Онлайн-оплата',
            items: ['Банковские карты', 'Быстрые платежи (СБП)', 'Электронные кошельки'],
        },
        {
            title: '3. Безналичная оплата для юрлиц',
            items: ['Работаем с организациями', 'Закрывающие документы по запросу'],
        },
        {
            title: '4. Рассрочка / частичная оплата',
            items: [
                'Через партнёрские сервисы банков (если актуально)',
                'Возможен резерв товара по предоплате',
            ],
        },
    ]

    return (
        <div>
            <h2 className="text-[#222222] font-bold text-[24px] lg:text-[28px] mb-4">
                Оплата
            </h2>
            <div className="flex flex-col gap-6">
                {sections.map((s) => (
                    <div key={s.title}>
                        <h3 className="text-[#222222] font-semibold text-base lg:text-lg mb-3">
                            {s.title}
                        </h3>
                        <ul className="flex flex-col gap-2">
                            {s.items.map((item) => (
                                <li
                                    key={item}
                                    className="text-[#444444] text-sm lg:text-base flex gap-2"
                                >
                                    <span className="text-[#888888]">—</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}

function TabDelivery() {
    const items = [
        'Доставка по городу: от 1 до 3 часов',
        'Доставка по России: 1-7 дней (зависит от региона и ТК)',
        'Проверка устройства обязательна при получении',
        'Все товары проходят предпродажную диагностику',
    ]

    return (
        <div>
            <h2 className="text-[#222222] font-bold text-[24px] lg:text-[28px] mb-4">
                Доставка
            </h2>
            <h3 className="text-[#222222] font-semibold text-base lg:text-lg mb-3">
                Условия и сроки доставки
            </h3>
            <ul className="flex flex-col gap-2">
                {items.map((item) => (
                    <li
                        key={item}
                        className="text-[#444444] text-sm lg:text-base flex gap-2"
                    >
                        <span className="text-[#888888]">—</span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

// Build the spec table from the server-provided `specifications` array.
// Only rows whose `key` is listed in `specFields` are shown (the backend
// decides per category), plus `memory` and `color` are always included.
function buildSpecs(product) {
    const allowed = new Set([...(product.specFields || []), 'memory', 'color'])
    return (product.specifications || [])
        .filter((s) => allowed.has(s.key))
        .map((s) => [s.label, s.value])
        .filter(([, v]) => v != null && v !== '')
}

// === MAIN PAGE ===
export default function ProductPage() {
    const params = useParams()
    const slug = params.slug

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [variantLoading, setVariantLoading] = useState(false)
    const [error, setError] = useState(null)
    const [activeTab, setActiveTab] = useState('description')

    // Guards against out-of-order responses when the user clicks quickly:
    // only the latest request is allowed to update state.
    const reqIdRef = useRef(0)

    // Fetch the product card. Pass a selection (colorId / memoryId / simTypeId)
    // and the backend resolves the matching variant — images, price, specs and
    // `selectedVariant` all come back in sync. `initial` toggles the full-page
    // skeleton; subsequent selection changes use the lighter `variantLoading`.
    const load = useCallback(
        async (selection, { initial = false } = {}) => {
            const id = ++reqIdRef.current
            if (initial) {
                setLoading(true)
                setError(null)
            } else {
                setVariantLoading(true)
            }
            try {
                const q = new URLSearchParams()
                if (selection?.colorId != null) q.set('colorId', String(selection.colorId))
                if (selection?.memoryId != null) q.set('memoryId', String(selection.memoryId))
                if (selection?.simTypeId) q.set('simTypeId', selection.simTypeId)
                const qs = q.toString()
                const res = await fetch(
                    `${API}/product/slug/${slug}${qs ? `?${qs}` : ''}`
                )
                if (!res.ok) throw new Error('not found')
                const data = await res.json()
                if (reqIdRef.current === id) setProduct(data)
            } catch (e) {
                // Keep the current product on a failed selection refetch; only the
                // initial load surfaces a blocking error.
                if (reqIdRef.current === id && initial) {
                    setError('Не удалось загрузить товар.')
                }
            } finally {
                if (reqIdRef.current === id) {
                    if (initial) setLoading(false)
                    else setVariantLoading(false)
                }
            }
        },
        [slug]
    )

    useEffect(() => {
        if (!slug) return
        load(null, { initial: true })
    }, [slug, load])

    // Switch color: keep the current memory if the new color offers it,
    // otherwise fall back to that color's first memory. SIM is reset (the
    // backend picks the variant's default).
    const handleSelectColor = useCallback(
        (colorId) => {
            const cur = product?.selectedVariant
            const color = (product?.colors || []).find((c) => c.id === colorId)
            const memoryId = color?.memories?.some((m) => m.memoryId === cur?.memoryId)
                ? cur.memoryId
                : color?.memories?.[0]?.memoryId ?? null
            load({ colorId, memoryId, simTypeId: null })
        },
        [product, load]
    )

    const handleSelectMemory = useCallback(
        (memoryId) => {
            const cur = product?.selectedVariant
            load({ colorId: cur?.colorId ?? null, memoryId, simTypeId: null })
        },
        [product, load]
    )

    const selectedVariant = product?.selectedVariant || null
    const images = useMemo(
        () => (product?.images || []).map((img) => img.url),
        [product]
    )
    const specs = useMemo(() => (product ? buildSpecs(product) : []), [product])

    // ── Loading ──
    if (loading) {
        return (
            <main className="px-4 lg:px-0 lg:w-360 mx-auto mb-20 max-md:w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-6 mt-4">
                    <div className="bg-white rounded-[20px] aspect-square lg:h-[528px] animate-pulse" />
                    <div className="bg-white rounded-[20px] h-[400px] lg:h-[528px] animate-pulse" />
                </div>
                <div className="bg-white rounded-[20px] h-[300px] animate-pulse" />
            </main>
        )
    }

    // ── Error / not found ──
    if (error || !product) {
        return (
            <main className="px-4 lg:px-0 lg:w-360 mx-auto mb-20 max-md:w-full">
                <div className="flex flex-col items-center justify-center py-32 text-center">
                    <p className="text-[#444444] text-lg mb-4">
                        {error || 'Товар не найден.'}
                    </p>
                    <Link
                        href="/catalog"
                        className="px-6 py-3 bg-[#D4A63A] text-[#222222] font-semibold rounded-[20px] hover:brightness-95 transition"
                    >
                        В каталог
                    </Link>
                </div>
            </main>
        )
    }

    return (
        <>
            <main className="px-4 lg:px-0 lg:w-360 mx-auto max-md:mb-5 md:mb-12 min-w-0 max-md:w-full">
                {/* Breadcrumb */}
                <div className="mb-4 overflow-x-auto pb-1">
                    <Breadcrumb
                        items={[
                            { name: 'Главная', href: '/' },
                            { name: 'Каталог', href: '/catalog' },
                            ...(product.category
                                ? [
                                    {
                                        name: product.category.name,
                                        href: `/catalog/${product.category.slug}`,
                                    },
                                ]
                                : []),
                            { name: product.title },
                        ]}
                    />
                </div>

                {/* Top section: Gallery + Info */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-6">
                    <ImageGallery key={selectedVariant?.id} images={images} />
                    <InfoCard
                        product={product}
                        onSelectColor={handleSelectColor}
                        onSelectMemory={handleSelectMemory}
                        variantLoading={variantLoading}
                    />
                </div>

                {/* Tabs section */}
                <div className="bg-white rounded-[20px] p-4 lg:p-8 ">
                    {/* Tab buttons (horizontal scroll on mobile) */}
                    <div className="flex gap-2 mb-6 max-md:overflow-x-scroll pb-1  w-full min-w-0">
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-5 lg:px-6 py-2.5 lg:py-3 rounded-[20px] text-sm lg:text-base font-medium whitespace-nowrap transition-colors duration-150 shrink-0 ${activeTab === tab.id
                                    ? 'bg-[#D4A63A] text-[#222222] font-semibold'
                                    : 'text-[#444444] hover:bg-[#F4F4FA]'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab content */}
                    <div className="border-t border-[#F4F4FA] pt-6">
                        {activeTab === 'description' && (
                            <TabDescription text={product.description} />
                        )}
                        {activeTab === 'specs' && <TabSpecs specs={specs} />}
                        {activeTab === 'payment' && <TabPayment />}
                        {activeTab === 'delivery' && <TabDelivery />}
                    </div>
                </div>
            </main>

            {/* С этим товаром покупают */}
            <RelatedProducts slug={slug} />

            {/* Consultation banner */}
            <HomeConsultation />
        </>
    )
}
