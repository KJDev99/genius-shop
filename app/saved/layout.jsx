import { pageMetadata } from '@/lib/seo'

// Izbrannoe — qidiruvda indekslanmaydi (noindex), lekin title to'g'ri bo'ladi.
export const metadata = pageMetadata('saved')

export default function SavedLayout({ children }) {
    return children
}
