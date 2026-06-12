'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import {
    isInCart,
    isInWishlist,
    toggleCart,
    toggleWishlist,
} from '@/lib/cart'

// ─── Price formatter ─────────────────────────────────────────────────────────

function formatPrice(value) {
    if (!value && value !== 0) return '—'
    return (
        new Intl.NumberFormat('ru-RU').format(Math.round(value)) + ' ₽'
    )
}

// ─── ProductCard ─────────────────────────────────────────────────────────────

export default function ProductCard({ product }) {
    // Pick first available variant as default
    const defaultVariant =
        product.variants?.find((v) => v.isAvailable) || product.variants?.[0]

    const [imgIndex, setImgIndex] = useState(0)
    const [liked, setLiked] = useState(false)
    const [inCart, setInCart] = useState(false)
    const [cartAnim, setCartAnim] = useState(false)

    const images = defaultVariant?.images?.map((img) => img.url) || []

    // Sync localStorage state on mount
    useEffect(() => {
        if (defaultVariant) {
            setLiked(isInWishlist(product.id))
            setInCart(isInCart(defaultVariant.id))
        }
    }, [product.id, defaultVariant])

    // Listen for external updates (e.g. cart page removes item)
    useEffect(() => {
        function syncCart() {
            if (defaultVariant) setInCart(isInCart(defaultVariant.id))
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
    }, [product.id, defaultVariant])

    function handleLike() {
        if (!defaultVariant) return
        // toggleWishlist dispatches 'wishlist-updated', which the listener below
        // turns into the correct `liked` value — no optimistic toggle here, or
        // the two updates would cancel out.
        toggleWishlist({
            productId: product.id,
            variantId: defaultVariant.id,
            title: product.title,
            slug: product.slug,
            price: defaultVariant.price,
            image: defaultVariant.images?.[0]?.url || null,
        })
    }

    function handleCart(e) {
        e.preventDefault()
        e.stopPropagation()
        if (!defaultVariant) return
        const added = toggleCart({
            variantId: defaultVariant.id,
            productId: product.id,
            title: product.title,
            slug: product.slug,
            price: defaultVariant.price,
            oldPrice: defaultVariant.oldPrice,
            discount: defaultVariant.discount,
            image: defaultVariant.images?.[0]?.url || null,
            memory: defaultVariant.memory?.name || null,
            color: defaultVariant.color?.name || null,
            colorHex: defaultVariant.color?.hex || null,
        })
        // inCart is synced from the 'cart-updated' listener; only drive the
        // add animation off the return value here.
        if (added) {
            setCartAnim(true)
            setTimeout(() => setCartAnim(false), 600)
        }
    }

    const slug = product.slug || product.id
    const price = defaultVariant?.price
    const oldPrice = defaultVariant?.oldPrice
    const discount = defaultVariant?.discount

    return (
        <div className="bg-white rounded-[20px] p-4 relative h-full flex flex-col group transition-shadow duration-200 hover:shadow-[0_4px_15.8px_0_rgba(0,0,0,0.12)]">


            {/* Wishlist button */}
            <button
                onClick={handleLike}
                className="absolute top-4 right-4 z-10 transition-transform duration-150 hover:scale-110 active:scale-95"
                aria-label="Add to favorites"
                type="button"
            >
                <svg
                    width="42"
                    height="42"
                    viewBox="0 0 42 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="21" cy="21" r="21" fill="white" />
                    <path
                        d="M21 30.5l-1.45-1.32C14.4 24.36 11 21.28 11 17.5 11 14.42 13.42 12 16.5 12c1.74 0 3.41.81 4.5 2.09C22.09 12.81 23.76 12 25.5 12 28.58 12 31 14.42 31 17.5c0 3.78-3.4 6.86-8.55 11.68L21 30.5z"
                        stroke="#D4A63A"
                        strokeWidth="1.5"
                        fill={liked ? '#D4A63A' : 'none'}
                        className="transition-all duration-200"
                    />
                </svg>
            </button>

            {/* Product image */}
            <Link href={`/product/${slug}`} className="block">
                <div className="relative w-full aspect-square overflow-hidden rounded-[12px]">
                    {images.length > 0 ? (
                        <Image
                            src={images[imgIndex] || images[0]}
                            alt={product.title}
                            fill
                            sizes="(max-width: 768px) 50vw, 25vw"
                            className="object-contain transition-transform duration-300 group-hover:scale-105"
                            unoptimized
                        />
                    ) : (
                        <div className="w-full h-full bg-[#F4F4FA] rounded-[12px] flex items-center justify-center">
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                <rect width="48" height="48" rx="12" fill="#E8E8F0" />
                                <path
                                    d="M16 32l8-10 6 7 4-5 6 8H8"
                                    stroke="#AAAACC"
                                    strokeWidth="2"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    )}
                </div>
            </Link>

            {/* Image dots */}
            {images.length > 1 && (
                <div className="flex justify-center gap-x-2 mt-2">
                    {images.slice(0, 3).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setImgIndex(i)}
                            className={`h-0.5 w-4 rounded-[2px] transition-colors duration-150 ${i === imgIndex
                                ? 'bg-[#D4A63A]'
                                : 'bg-[#F4F4FA] hover:bg-[#D4A63A]/40'
                                }`}
                            aria-label={`View image ${i + 1}`}
                            type="button"
                        />
                    ))}
                </div>
            )}

            {/* Title */}
            <Link href={`/product/${slug}`} className="block mt-4 grow">
                <h3 className="text-[#222222] text-base lg:text-lg font-medium line-clamp-2 hover:text-[#D4A63A] transition-colors duration-150">
                    {product.title}
                </h3>
            </Link>

            {/* Price + Cart */}
            <div className="flex justify-between items-end mt-4 gap-2">
                <div className="flex flex-col">
                    {/* {oldPrice && oldPrice > price && (
                        <span className="text-[#AAAAAA] text-sm line-through leading-tight">
                            {formatPrice(oldPrice)}
                        </span>
                    )} */}
                    <span className="text-[#D4A63A] text-[20px] lg:text-[24px] xl:text-[28px] font-bold whitespace-nowrap leading-tight">
                        {formatPrice(price)}
                    </span>
                </div>

                <button
                    type="button"
                    onClick={handleCart}
                    className={`font-medium px-3 lg:px-4 py-2 rounded-[16px] flex items-center transition-all duration-200 shrink-0 ${inCart
                        ? 'bg-[#222222] text-white hover:bg-[#333333]'
                        : 'bg-[#D4A63A] text-[#222222] hover:brightness-95 active:brightness-90'
                        } ${cartAnim ? 'scale-90' : 'scale-100'}`}
                >
                    {inCart ? (
                        <>
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                className="lg:mr-2 shrink-0"
                            >
                                <path
                                    d="M4 10l4 4 8-8"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span className="hidden lg:inline text-sm">В корзине</span>
                        </>
                    ) : (
                        <>
                            <Image
                                src="/icons/cart.svg"
                                alt=""
                                width={20}
                                height={20}
                                className="lg:mr-2 shrink-0"
                            />
                            <span className="hidden lg:inline">В корзину</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}