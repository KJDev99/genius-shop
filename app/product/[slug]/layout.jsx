import { productMetadata } from '@/lib/seo'

const API = 'https://admin.geniusstorerf.ru/api'

// page.jsx 'use client' — mahsulot SEO'si shu server layout'da, backend'dan
// real ma'lumot (title, narx, tavsif, rasm) tortib yasaladi.
export async function generateMetadata({ params }) {
    const { slug } = await params
    try {
        const res = await fetch(`${API}/product/slug/${slug}`, {
            next: { revalidate: 600 },
        })
        if (!res.ok) return productMetadata(null, slug)
        const product = await res.json()
        return productMetadata(product, slug)
    } catch {
        return productMetadata(null, slug)
    }
}

export default function ProductLayout({ children }) {
    return children
}
