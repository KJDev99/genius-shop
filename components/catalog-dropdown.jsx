'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

const BASE_URL = 'https://admin.geniusstorerf.ru/api'

async function fetchCategories() {
    const res = await fetch(`${BASE_URL}/category`)
    const data = await res.json()
    return Array.isArray(data) ? data : (data.results ?? [])
}

async function fetchProducts(slug) {
    const res = await fetch(`${BASE_URL}/product/category/slug/${slug}/1/50`)
    const json = await res.json()
    return json.data ?? json.results ?? (Array.isArray(json) ? json : [])
}

function groupByBrand(products) {
    const map = {}
    for (const product of products) {
        const brandName = product.brand?.name ?? 'Other'
        if (!map[brandName]) map[brandName] = []
        map[brandName].push(product)
    }
    return Object.entries(map).map(([name, models]) => ({ name, models }))
}

export default function CatalogDropdown({ onClose }) {
    const [categories, setCategories] = useState([])
    const [activeIndex, setActiveIndex] = useState(0)
    const [brands, setBrands] = useState([])
    const [loading, setLoading] = useState(false)
    const cacheRef = useRef({})
    const pathname = usePathname()
    const initialPath = useRef(pathname)

    // Close the dropdown when the route changes (e.g. a product was opened),
    // but not on the initial mount.
    useEffect(() => {
        if (pathname !== initialPath.current) onClose?.()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname])

    useEffect(() => {
        fetchCategories().then((cats) => {
            setCategories(cats)
            if (cats.length) loadProducts(cats[0])
        })
    }, [])

    async function loadProducts(cat) {
        if (cacheRef.current[cat.id]) {
            setBrands(cacheRef.current[cat.id])
            return
        }
        setLoading(true)
        setBrands([])
        try {
            const data = await fetchProducts(cat.slug)
            const grouped = groupByBrand(data)
            cacheRef.current[cat.id] = grouped
            setBrands(grouped)
        } finally {
            setLoading(false)
        }
    }

    function handleCategoryHover(index) {
        if (index === activeIndex) return
        setActiveIndex(index)
        loadProducts(categories[index])
    }

    return (
        <div
            className="absolute left-0 right-0 top-full mt-4 bg-white rounded-[20px] shadow-[0px_4px_15.8px_0px_rgba(0,0,0,0.21)] p-6 flex gap-4 z-50"
            onMouseLeave={onClose}
        >
            {/* LEFT — Categories */}
            <div className="w-[217px] flex flex-col">
                {categories.map((cat, i) => (
                    <button
                        key={cat.id}
                        onMouseEnter={() => handleCategoryHover(i)}
                        onClick={() => handleCategoryHover(i)}
                        className={`flex items-center gap-3 px-4 py-4 rounded-[20px] text-left text-[18px] font-medium text-[#444444] transition-colors duration-150 hover:bg-[#F4F4FA] ${i === activeIndex ? 'bg-[#F4F4FA]' : ''
                            }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* DIVIDER */}
            <div className="w-0.5 bg-[#F4F4FA] self-stretch" />

            {/* RIGHT — Brands & models */}
            <div className="flex-1 flex gap-6 overflow-x-auto">
                {loading ? (
                    <div className="flex-1 flex items-center justify-center gap-2 text-[#888] text-base">
                        <span className="w-4 h-4 border-2 border-[#ccc] border-t-[#888] rounded-full animate-spin" />
                        Yuklanmoqda...
                    </div>
                ) : brands.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center text-[#888] text-base">
                        Bu kategoriyada mahsulot yo'q
                    </div>
                ) : (
                    brands.map((brand) => (
                        <div
                            key={brand.name}
                            className="w-[365px] flex flex-col gap-4 p-4 bg-[#F4F4FA] rounded-[20px]"
                        >
                            <h3 className="text-[20px] font-semibold text-[#222222]">{brand.name}</h3>
                            <ul className="flex flex-col gap-4">
                                {brand.models.map((product, idx) => (
                                    <li key={product.id}>
                                        <Link
                                            href={`/product/${product.slug}`}
                                            onClick={onClose}
                                            className={`block text-base transition-colors duration-150 hover:text-[#D4A63A] ${idx === 0 ? 'text-[#D4A63A] font-medium' : 'text-[#444444]'
                                                }`}
                                        >
                                            {product.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}