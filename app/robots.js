import { SITE } from '@/lib/seo'

// /robots.txt ni avtomatik yasaydi va sitemap manzilini ko'rsatadi.
export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            // Shaxsiy/texnik sahifalar qidiruvga kerak emas.
            disallow: ['/basket', '/saved'],
        },
        sitemap: `${SITE.url}/sitemap.xml`,
        host: SITE.url,
    }
}
