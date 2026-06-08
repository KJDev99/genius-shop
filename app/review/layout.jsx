import { pageMetadata } from '@/lib/seo'

// page.jsx 'use client' — metadata shu server layout'dan beriladi.
export const metadata = pageMetadata('review')

export default function ReviewLayout({ children }) {
    return children
}
