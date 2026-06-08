import { pageMetadata } from '@/lib/seo'

// page.jsx 'use client' — metadata shu server layout'dan beriladi.
// (Bu layout /news va /news/[detail] ostidagi barchasini o'raydi.)
export const metadata = pageMetadata('news')

export default function NewsLayout({ children }) {
    return children
}
