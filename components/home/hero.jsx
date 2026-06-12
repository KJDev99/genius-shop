import React from 'react'
import HeroCarousel from './hero-carousel'

const API = 'https://admin.geniusstorerf.ru/api'

// Баннеры берём на сервере, чтобы картинка LCP попадала сразу в HTML
// (без задержки на клиентский fetch). Кэшируем на 5 минут.
async function getBanners() {
    try {
        const res = await fetch(`${API}/banner`, { next: { revalidate: 300 } })
        if (!res.ok) return []
        const data = await res.json()
        return Array.isArray(data) ? data : []
    } catch {
        return []
    }
}

export default async function Hero() {
    const banners = await getBanners()

    return (
        <div className="px-4 lg:px-0 lg:w-360 mx-auto my-6">
            {banners.length === 0 ? (
                // Заглушка нужной высоты, если баннеры не загрузились (без прыжка верстки).
                <div className="rounded-[20px] h-[460px] lg:h-[600px] bg-[#C47427]" />
            ) : (
                <HeroCarousel banners={banners} />
            )}
        </div>
    )
}
