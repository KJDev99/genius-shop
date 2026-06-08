import { newsMetadata } from '@/lib/seo'

const API = 'https://admin.geniusstorerf.ru/api'

// page.jsx 'use client' — yangilik SEO'si shu server layout'da, backend'dan
// real maqola (sarlavha, matn, rasm) tortib yasaladi.
export async function generateMetadata({ params }) {
    const { detail } = await params
    try {
        const res = await fetch(`${API}/news/slug/${detail}`, {
            next: { revalidate: 600 },
        })
        if (!res.ok) return newsMetadata(null, detail)
        const article = await res.json()
        return newsMetadata(article, detail)
    } catch {
        return newsMetadata(null, detail)
    }
}

export default function NewsDetailLayout({ children }) {
    return children
}
