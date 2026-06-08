import { categoryMetadata } from '@/lib/seo'

// page.jsx 'use client' — kategoriya SEO'si shu server layout'dan beriladi.
// Next 16'da params — Promise, shuning uchun await qilamiz.
export async function generateMetadata({ params }) {
    const { category } = await params
    return categoryMetadata(category)
}

export default function CategoryLayout({ children }) {
    return children
}
