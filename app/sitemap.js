import { SITE, PAGE_SEO } from '@/lib/seo'

const API = 'https://admin.geniusstorerf.ru/api'

// Sitemap har soatda yangilanadi (yangi mahsulot/yangilik qo'shilsa kirib keladi).
export const revalidate = 3600

// Xavfsiz fetch — xato bo'lsa bo'sh massiv qaytaradi, sitemap baribir yasaladi.
async function safeJson(url) {
    try {
        const res = await fetch(url, { next: { revalidate: 3600 } })
        if (!res.ok) return null
        return await res.json()
    } catch {
        return null
    }
}

export default async function sitemap() {
    const now = new Date()
    const base = SITE.url

    // ── 1. Statik sahifalar (noindex bo'lganlarini — basket/saved — chiqarib tashlaymiz)
    const staticEntries = Object.values(PAGE_SEO)
        .filter((p) => !p.noindex)
        .map((p) => ({
            url: `${base}${p.path}`,
            lastModified: now,
            changeFrequency: p.path === '/' ? 'daily' : 'monthly',
            priority: p.path === '/' ? 1 : 0.6,
        }))

    // ── 2. Kategoriyalar (/catalog/[category])
    const categories = (await safeJson(`${API}/category`)) || []
    const categoryEntries = (Array.isArray(categories) ? categories : []).map(
        (c) => ({
            url: `${base}/catalog/${c.slug}`,
            lastModified: now,
            changeFrequency: 'daily',
            priority: 0.9,
        })
    )

    // ── 3. Mahsulotlar (/product/[slug]) — har bir kategoriya bo'yicha yig'amiz
    const productSlugs = new Set()
    await Promise.all(
        (Array.isArray(categories) ? categories : []).map(async (c) => {
            const first = await safeJson(
                `${API}/product/category/${c.id}/1/100`
            )
            const items = first?.data || []
            items.forEach((p) => p?.slug && productSlugs.add(p.slug))

            // 100 tadan ko'p bo'lsa — qolgan sahifalarni ham tortamiz
            const total = first?.count || items.length
            if (total > 100) {
                const pages = Math.ceil(total / 100)
                const rest = await Promise.all(
                    Array.from({ length: pages - 1 }, (_, i) =>
                        safeJson(`${API}/product/category/${c.id}/${i + 2}/100`)
                    )
                )
                rest.forEach((d) =>
                    (d?.data || []).forEach(
                        (p) => p?.slug && productSlugs.add(p.slug)
                    )
                )
            }
        })
    )
    const productEntries = [...productSlugs].map((slug) => ({
        url: `${base}/product/${slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
    }))

    // ── 4. Yangiliklar (/news/[detail])
    const news = await safeJson(`${API}/news/all/1/100`)
    const newsEntries = (news?.data || [])
        .filter((n) => n?.slug)
        .map((n) => ({
            url: `${base}/news/${n.slug}`,
            lastModified: n.createdAt ? new Date(n.createdAt) : now,
            changeFrequency: 'monthly',
            priority: 0.6,
        }))

    return [
        ...staticEntries,
        ...categoryEntries,
        ...productEntries,
        ...newsEntries,
    ]
}
