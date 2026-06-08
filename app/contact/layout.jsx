import { pageMetadata } from '@/lib/seo'

// page.jsx 'use client' — metadata shu server layout'dan beriladi.
export const metadata = pageMetadata('contact')

export default function ContactLayout({ children }) {
    return children
}
