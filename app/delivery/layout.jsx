import { pageMetadata } from '@/lib/seo'

// page.jsx 'use client' — metadata shu server layout'dan beriladi.
export const metadata = pageMetadata('delivery')

export default function DeliveryLayout({ children }) {
    return children
}
