'use client'

import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useParams } from 'next/navigation'
import Breadcrumb from '@/components/breadcrumb'
import CatalogFilters from '@/components/catalog-filters'
import ProductCard from '@/components/product-card'

// ─── API base ────────────────────────────────────────────────────────────────
const API = 'https://admin.geniusstorerf.ru/api'
const LIMIT = 18 // products per page

// ─── Sort helpers ────────────────────────────────────────────────────────────
const SORT_OPTIONS = [
    { label: 'Самые популярные', value: 'popular' },
    { label: 'Сначала дешёвые', value: 'price_asc' },
    { label: 'Сначала дорогие', value: 'price_desc' },
    { label: 'Новинки', value: 'new' },
    { label: 'По рейтингу', value: 'rating' },
]

function sortProducts(products, sortValue) {
    const arr = [...products]
    switch (sortValue) {
        case 'price_asc':
            return arr.sort((a, b) => getMinPrice(a) - getMinPrice(b))
        case 'price_desc':
            return arr.sort((a, b) => getMinPrice(b) - getMinPrice(a))
        case 'new':
            return arr.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        case 'rating':
            return arr.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        default:
            return arr.sort((a, b) => (b.isHit ? 1 : 0) - (a.isHit ? 1 : 0))
    }
}

function getMinPrice(product) {
    const prices = product.variants?.map((v) => v.price).filter(Boolean) || []
    return prices.length ? Math.min(...prices) : Infinity
}

// ─── Build backend query string from active filters ───────────────────────────
// Example produced: ?memory=2&color=5&priceFrom=3000
// NOTE: param names below mirror the backend's `?memory=2` example. If the
// backend expects different keys (e.g. price), change them here in one place.
function buildFilterQuery(filters) {
    const params = new URLSearchParams()
    filters.brandIds?.forEach((id) => params.append('brand', id))
    filters.modelIds?.forEach((id) => params.append('model', id))
    filters.conditionIds?.forEach((id) => params.append('condition', id))
    filters.memoryIds?.forEach((id) => params.append('memory', id))
    filters.colorIds?.forEach((id) => params.append('color', id))
    if (filters.priceMin != null) params.append('priceFrom', filters.priceMin)
    if (filters.priceMax != null) params.append('priceTo', filters.priceMax)
    const s = params.toString()
    return s ? `?${s}` : ''
}

// ─── Filter helpers ───────────────────────────────────────────────────────────
function applyFilters(products, filters) {
    return products.filter((p) => {
        // Brand filter
        if (filters.brandIds?.length) {
            if (!filters.brandIds.includes(p.brandId)) return false
        }

        // Model filter
        if (filters.modelIds?.length) {
            if (!filters.modelIds.includes(p.modelId)) return false
        }

        // Condition filter
        if (filters.conditionIds?.length) {
            if (!filters.conditionIds.includes(p.conditionId)) return false
        }

        // Memory filter
        if (filters.memoryIds?.length) {
            const variantMemoryIds = p.variants?.map((v) => v.memoryId) || []
            if (!filters.memoryIds.some((id) => variantMemoryIds.includes(id)))
                return false
        }

        // Color filter
        if (filters.colorIds?.length) {
            const variantColorIds = p.variants?.map((v) => v.colorId) || []
            if (!filters.colorIds.some((id) => variantColorIds.includes(id)))
                return false
        }

        // Price range filter
        if (filters.priceMin != null || filters.priceMax != null) {
            const minPrice = getMinPrice(p)
            if (filters.priceMin != null && minPrice < filters.priceMin)
                return false
            if (filters.priceMax != null && minPrice > filters.priceMax)
                return false
        }

        return true
    })
}

// ─── CategoryPage ─────────────────────────────────────────────────────────────
export default function CategoryPage() {
    const params = useParams()
    const categorySlug = params.category

    // Category meta
    const [category, setCategory] = useState(null)

    // Raw products from API (all pages cached)
    const [allProducts, setAllProducts] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Brands + models for this category
    const [brandsAndModels, setBrandsAndModels] = useState([]) // [{brand, id, models:[]}]

    // Filter options loaded from API
    const [filterOptions, setFilterOptions] = useState({
        conditions: [],
        memories: [],
        colors: [],
    })

    // Active filters
    const [activeFilters, setActiveFilters] = useState({
        brandIds: [],
        modelIds: [],
        conditionIds: [],
        memoryIds: [],
        colorIds: [],
        priceMin: null,
        priceMax: null,
    })

    // Active brand tab (for sub-model row)
    const [activeBrandId, setActiveBrandId] = useState(null)
    const [activeModelId, setActiveModelId] = useState(null)

    // Sort
    const [sortOpen, setSortOpen] = useState(false)
    const [sortValue, setSortValue] = useState('popular')
    const sortRef = useRef(null)

    // Pagination (client-side over filtered+sorted products)
    const [currentPage, setCurrentPage] = useState(1)

    // Mobile drawer
    const [filterDrawerOpen, setFilterDrawerOpen] = useState(false)

    // ── Close sort dropdown on outside click ──────────────────────────────────
    useEffect(() => {
        function handleOutside(e) {
            if (sortRef.current && !sortRef.current.contains(e.target)) {
                setSortOpen(false)
            }
        }
        document.addEventListener('mousedown', handleOutside)
        return () => document.removeEventListener('mousedown', handleOutside)
    }, [])

    // ── Body lock for mobile drawer ───────────────────────────────────────────
    useEffect(() => {
        document.body.style.overflow = filterDrawerOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [filterDrawerOpen])

    useEffect(() => {
        if (!filterDrawerOpen) return
        function handleKey(e) {
            if (e.key === 'Escape') setFilterDrawerOpen(false)
        }
        document.addEventListener('keydown', handleKey)
        return () => document.removeEventListener('keydown', handleKey)
    }, [filterDrawerOpen])

    // ── 1. Load categories → find current category ID ─────────────────────────
    useEffect(() => {
        async function loadCategory() {
            try {
                const res = await fetch(`${API}/category`)
                const data = await res.json()
                const found = data.find((c) => c.slug === categorySlug)
                setCategory(found || null)
            } catch (e) {
                console.error('Category load error:', e)
            }
        }
        if (categorySlug) loadCategory()
    }, [categorySlug])

    // ── 2. Load brands+models for this category ───────────────────────────────
    useEffect(() => {
        if (!category?.id) return
        async function loadBrandsAndModels() {
            try {
                const res = await fetch(
                    `${API}/filtr/brands-and-models-by-category/${category.id}`
                )
                const data = await res.json()
                setBrandsAndModels(data || [])
                // Set first brand as default active
                if (data?.length) {
                    setActiveBrandId(data[0].id)
                }
            } catch (e) {
                console.error('Brands/models load error:', e)
            }
        }
        loadBrandsAndModels()
    }, [category?.id])

    // ── 3. Load filter options (conditions, memories, colors) ─────────────────
    useEffect(() => {
        async function loadFilterOptions() {
            try {
                const [condRes, memRes, colorRes] = await Promise.all([
                    fetch(`${API}/condition`),
                    fetch(`${API}/memory`),
                    fetch(`${API}/color`),
                ])
                const [conditions, memories, colors] = await Promise.all([
                    condRes.json(),
                    memRes.json(),
                    colorRes.json(),
                ])
                setFilterOptions({ conditions, memories, colors })
            } catch (e) {
                console.error('Filter options load error:', e)
            }
        }
        loadFilterOptions()
    }, [])

    // ── 4. Load ALL products for category (paginate through API) ──────────────
    const loadAllProducts = useCallback(async () => {
        if (!category?.id) return
        setLoading(true)
        setError(null)
        // Send active filters to the backend as query params (e.g. ?memory=2)
        const query = buildFilterQuery(activeFilters)
        try {
            // First request to get total count
            const firstRes = await fetch(
                `${API}/product/category/${category.id}/1/100${query}`
            )
            if (!firstRes.ok) throw new Error('Failed to fetch products')
            const firstData = await firstRes.json()
            const products = firstData.data || []
            const total = firstData.count || products.length

            // If there are more pages, fetch them too
            if (total > 100) {
                const pages = Math.ceil(total / 100)
                const rest = await Promise.all(
                    Array.from({ length: pages - 1 }, (_, i) =>
                        fetch(
                            `${API}/product/category/${category.id}/${i + 2}/100${query}`
                        ).then((r) => r.json())
                    )
                )
                const more = rest.flatMap((d) => d.data || [])
                setAllProducts([...products, ...more])
                setTotalCount(total)
            } else {
                setAllProducts(products)
                setTotalCount(total)
            }
        } catch (e) {
            console.error('Products load error:', e)
            setError('Не удалось загрузить товары. Попробуйте позже.')
        } finally {
            setLoading(false)
        }
    }, [category?.id, activeFilters])

    useEffect(() => {
        loadAllProducts()
    }, [loadAllProducts])

    // ── Derived: filter + sort + paginate ─────────────────────────────────────
    const filteredProducts = applyFilters(allProducts, activeFilters)
    const sortedProducts = sortProducts(filteredProducts, sortValue)
    const totalPages = Math.max(1, Math.ceil(sortedProducts.length / LIMIT))
    const pageProducts = sortedProducts.slice(
        (currentPage - 1) * LIMIT,
        currentPage * LIMIT
    )

    // Reset to page 1 on filter/sort change
    useEffect(() => {
        setCurrentPage(1)
    }, [activeFilters, sortValue, activeBrandId, activeModelId])

    // ── Brand tab click: filter by that brand ─────────────────────────────────
    function handleBrandTab(brandItem) {
        setActiveBrandId(brandItem.id)
        setActiveModelId(null)
        setActiveFilters((prev) => ({
            ...prev,
            brandIds: [brandItem.id],
            modelIds: [],
        }))
    }

    // ── Model chip click ──────────────────────────────────────────────────────
    function handleModelChip(modelId) {
        if (activeModelId === modelId) {
            // deselect
            setActiveModelId(null)
            setActiveFilters((prev) => ({ ...prev, modelIds: [] }))
        } else {
            setActiveModelId(modelId)
            setActiveFilters((prev) => ({ ...prev, modelIds: [modelId] }))
        }
    }

    // ── Live filter change (checkbox toggle) — refetch, keep drawer open ───────
    function handleFilterChange(patch) {
        setActiveFilters((prev) => ({ ...prev, ...patch }))
    }

    // ── Filter apply from CatalogFilters "Применить" button ────────────────────
    function handleFilterApply(patch) {
        setActiveFilters((prev) => ({ ...prev, ...patch }))
        setFilterDrawerOpen(false)
    }

    function handleFilterReset() {
        setActiveFilters({
            brandIds: activeBrandId ? [activeBrandId] : [],
            modelIds: activeModelId ? [activeModelId] : [],
            conditionIds: [],
            memoryIds: [],
            colorIds: [],
            priceMin: null,
            priceMax: null,
        })
    }

    // ── Pagination helpers ────────────────────────────────────────────────────
    function buildPageNumbers() {
        // Show at most 10 page buttons
        const visible = []
        const window = 5
        let start = Math.max(1, currentPage - Math.floor(window / 2))
        let end = Math.min(totalPages, start + window - 1)
        if (end - start < window - 1) start = Math.max(1, end - window + 1)
        for (let p = start; p <= end; p++) visible.push(p)
        return visible
    }

    const pageNumbers = buildPageNumbers()
    const categoryTitle = category?.name || 'Каталог'
    const activeBrandItem = brandsAndModels.find((b) => b.id === activeBrandId)

    // ─── Render ───────────────────────────────────────────────────────────────
    return (
        <main className="px-4 lg:px-0 lg:w-360 mx-auto mb-20">
            {/* Breadcrumb */}
            <div className="mb-4">
                <Breadcrumb
                    items={[
                        { name: 'Главная', href: '/' },
                        { name: 'Каталог', href: '/catalog' },
                        { name: categoryTitle },
                    ]}
                />
            </div>

            {/* Title */}
            <h1 className="text-[#222222] font-bold text-[36px] sm:text-[48px] lg:text-[64px] mb-6 lg:mb-8">
                {categoryTitle}
            </h1>

            {/* Main layout: sidebar + content */}
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
                {/* Desktop filters sidebar */}
                <div className="hidden lg:block">
                    <CatalogFilters
                        options={filterOptions}
                        value={activeFilters}
                        onChange={handleFilterChange}
                        onApply={handleFilterApply}
                        onReset={handleFilterReset}
                    />
                </div>

                {/* Main content */}
                <div className="flex flex-col">
                    {/* Top bar: brand tabs + sort */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        {/* Brand tabs */}
                        <div className="flex gap-2 flex-wrap">
                            {brandsAndModels.map((brandItem) => (
                                <button
                                    key={brandItem.id}
                                    type="button"
                                    onClick={() => handleBrandTab(brandItem)}
                                    className={`px-5 lg:px-6 py-2.5 lg:py-3 rounded-[20px] text-sm lg:text-base font-semibold transition-colors duration-150 ${activeBrandId === brandItem.id
                                        ? 'bg-[#D4A63A] text-[#222222]'
                                        : 'bg-white text-[#444444] hover:bg-[#F4F4FA]'
                                        }`}
                                >
                                    {brandItem.brand}
                                </button>
                            ))}
                        </div>

                        {/* Sort dropdown */}
                        <div className="lg:ml-auto relative w-full lg:w-auto" ref={sortRef}>
                            <button
                                type="button"
                                onClick={() => setSortOpen((v) => !v)}
                                className="flex items-center gap-3 px-5 py-3 rounded-[20px] bg-white text-[#444444] w-full lg:w-auto lg:min-w-[260px] hover:bg-[#F4F4FA] transition-colors duration-150"
                            >
                                <span className="grow text-left text-sm lg:text-base">
                                    {SORT_OPTIONS.find((o) => o.value === sortValue)?.label}
                                </span>
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    className={`transition-transform duration-200 shrink-0 ${sortOpen ? 'rotate-180' : ''}`}
                                >
                                    <path
                                        d="M4 6l4 4 4-4"
                                        stroke="#888888"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                            {sortOpen && (
                                <div className="absolute left-0 right-0 lg:left-auto lg:right-0 top-full mt-2 bg-white rounded-[16px] shadow-[0_4px_15.8px_0_rgba(0,0,0,0.12)] py-2 lg:min-w-[260px] z-[100]">
                                    {SORT_OPTIONS.map((opt) => (
                                        <button
                                            key={opt.value}
                                            type="button"
                                            onClick={() => {
                                                setSortValue(opt.value)
                                                setSortOpen(false)
                                            }}
                                            className={`block w-full text-left px-5 py-3 hover:bg-[#F4F4FA] transition-colors duration-150 ${sortValue === opt.value
                                                ? 'text-[#D4A63A] font-medium'
                                                : 'text-[#444444]'
                                                }`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sub-model chips */}
                    {activeBrandItem?.models?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {activeBrandItem.models.map((model) => (
                                <button
                                    key={model.id}
                                    type="button"
                                    onClick={() => handleModelChip(model.id)}
                                    className={`px-4 lg:px-5 py-2 lg:py-2.5 rounded-[20px] text-sm font-medium whitespace-nowrap transition-colors duration-150 ${activeModelId === model.id
                                        ? 'bg-[#D4A63A] text-[#222222]'
                                        : 'bg-white text-[#444444] hover:bg-[#F4F4FA]'
                                        }`}
                                >
                                    {model.name}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Mobile filter button */}
                    <button
                        type="button"
                        onClick={() => setFilterDrawerOpen(true)}
                        className="lg:hidden flex items-center gap-2 px-5 py-3 mb-4 bg-white rounded-[20px] text-[#444444] font-medium self-start hover:bg-[#F4F4FA] transition-colors duration-150"
                    >
                        Фильтр
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M2 3h12l-4.5 6V13l-3-2V9L2 3z" fill="#D4A63A" />
                        </svg>
                    </button>

                    {/* Loading state */}
                    {loading && (
                        <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-6">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="bg-white rounded-[20px] p-4 animate-pulse"
                                >
                                    <div className="aspect-square bg-[#F4F4FA] rounded-[12px] mb-4" />
                                    <div className="h-4 bg-[#F4F4FA] rounded mb-2 w-3/4" />
                                    <div className="h-4 bg-[#F4F4FA] rounded mb-4 w-1/2" />
                                    <div className="h-8 bg-[#F4F4FA] rounded w-full" />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Error state */}
                    {!loading && error && (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <p className="text-[#444444] text-lg mb-4">{error}</p>
                            <button
                                type="button"
                                onClick={loadAllProducts}
                                className="px-6 py-3 bg-[#D4A63A] text-[#222222] font-semibold rounded-[20px] hover:brightness-95 transition"
                            >
                                Повторить
                            </button>
                        </div>
                    )}

                    {/* Empty state */}
                    {!loading && !error && pageProducts.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <svg
                                width="64"
                                height="64"
                                viewBox="0 0 64 64"
                                fill="none"
                                className="mb-4 opacity-30"
                            >
                                <rect width="64" height="64" rx="16" fill="#D4A63A" />
                                <path
                                    d="M20 44l8-12 6 8 5-6 5 10H20z"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <p className="text-[#444444] text-lg font-medium mb-2">
                                Товары не найдены
                            </p>
                            <p className="text-[#888888] text-sm mb-4">
                                Попробуйте изменить фильтры
                            </p>
                            <button
                                type="button"
                                onClick={handleFilterReset}
                                className="px-6 py-3 bg-[#D4A63A] text-[#222222] font-semibold rounded-[20px] hover:brightness-95 transition"
                            >
                                Сбросить фильтры
                            </button>
                        </div>
                    )}

                    {/* Products grid */}
                    {!loading && !error && pageProducts.length > 0 && (
                        <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-6">
                            {pageProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {!loading && !error && totalPages > 1 && (
                        <div className="flex justify-center items-center gap-1 lg:gap-2 mt-8 flex-wrap">
                            {/* Prev */}
                            <button
                                type="button"
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="w-10 h-10 rounded-[12px] bg-white text-[#444444] flex items-center justify-center hover:bg-[#F4F4FA] disabled:opacity-50 disabled:cursor-not-allowed transition"
                                aria-label="Previous page"
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path
                                        d="M10 4L6 8l4 4"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>

                            {/* First page if not in window */}
                            {pageNumbers[0] > 1 && (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => setCurrentPage(1)}
                                        className="w-10 h-10 rounded-[12px] text-base font-medium bg-white text-[#444444] hover:bg-[#F4F4FA] transition-colors duration-150"
                                    >
                                        1
                                    </button>
                                    {pageNumbers[0] > 2 && (
                                        <span className="text-[#888888] px-1">...</span>
                                    )}
                                </>
                            )}

                            {/* Page window */}
                            {pageNumbers.map((p) => (
                                <button
                                    key={p}
                                    type="button"
                                    onClick={() => setCurrentPage(p)}
                                    className={`w-10 h-10 rounded-[12px] text-base font-medium transition-colors duration-150 ${currentPage === p
                                        ? 'bg-[#D4A63A] text-[#222222]'
                                        : 'bg-white text-[#444444] hover:bg-[#F4F4FA]'
                                        }`}
                                >
                                    {p}
                                </button>
                            ))}

                            {/* Last page if not in window */}
                            {pageNumbers[pageNumbers.length - 1] < totalPages && (
                                <>
                                    {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                                        <span className="text-[#888888] px-1">...</span>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => setCurrentPage(totalPages)}
                                        className="w-10 h-10 rounded-[12px] text-base font-medium bg-white text-[#444444] hover:bg-[#F4F4FA] transition-colors duration-150"
                                    >
                                        {totalPages}
                                    </button>
                                </>
                            )}

                            {/* Next */}
                            <button
                                type="button"
                                onClick={() =>
                                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                                }
                                disabled={currentPage === totalPages}
                                className="w-10 h-10 rounded-[12px] bg-white text-[#444444] flex items-center justify-center hover:bg-[#F4F4FA] disabled:opacity-50 disabled:cursor-not-allowed transition"
                                aria-label="Next page"
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path
                                        d="M6 4l4 4-4 4"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* MOBILE FILTER DRAWER */}
            {filterDrawerOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-[4px] flex"
                    onClick={() => setFilterDrawerOpen(false)}
                >
                    <div
                        className="ml-auto h-full w-[88%] max-w-[400px] bg-[#F4F4FA] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="sticky top-0 bg-[#F4F4FA] flex items-center justify-between p-4 border-b border-white">
                            <h2 className="text-[#222222] font-bold text-xl">Фильтры</h2>
                            <button
                                type="button"
                                onClick={() => setFilterDrawerOpen(false)}
                                className="text-[#222222] p-2 -mr-2"
                                aria-label="Close filters"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M6 6l12 12M18 6L6 18"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="p-4">
                            <CatalogFilters
                                options={filterOptions}
                                value={activeFilters}
                                onChange={handleFilterChange}
                                onApply={handleFilterApply}
                                onReset={handleFilterReset}
                            />
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}