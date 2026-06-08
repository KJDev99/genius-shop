import { pageMetadata } from '@/lib/seo'

// Korzina — qidiruvda indekslanmaydi (noindex), lekin title to'g'ri bo'ladi.
export const metadata = pageMetadata('basket')

export default function BasketLayout({ children }) {
    return children
}
