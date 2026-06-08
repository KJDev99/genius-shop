// ─────────────────────────────────────────────────────────────────────────────
// Markaziy SEO konfiguratsiyasi.
// Har bir sahifaning title / description / keywords matni shu yerda turadi.
// Sahifalar (yoki layout'lar) shu yerdan `pageMetadata('home')` /
// `categoryMetadata(slug)` chaqirib, Next.js metadata obyektini oladi.
//
// MUHIM: metadata faqat Server Component'larda ishlaydi. Shuning uchun
// 'use client' sahifalar uchun yonidagi layout.jsx (server) ishlatiladi.
// ─────────────────────────────────────────────────────────────────────────────

const API = 'https://admin.geniusstorerf.ru/api'

export const SITE = {
    name: 'Genius Store',
    url: 'https://geniusstorerf.ru',
    locale: 'ru_RU',
}

// OG/Twitter rasmlari uchun standart rasm (public/ ichida bo'lsa qo'ying).
const DEFAULT_OG_IMAGE = '/og-default.png'

// Bitta SEO yozuvidan to'liq Next.js metadata obyektini yasaydi.
function buildMetadata({ title, description, keywords, path, image, noindex }) {
    const url = path ? `${SITE.url}${path}` : undefined
    return {
        title,
        description,
        keywords,
        alternates: url ? { canonical: url } : undefined,
        openGraph: {
            title,
            description,
            url,
            siteName: SITE.name,
            locale: SITE.locale,
            type: 'website',
            images: [{ url: image || DEFAULT_OG_IMAGE }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image || DEFAULT_OG_IMAGE],
        },
        robots: noindex
            ? { index: false, follow: false }
            : { index: true, follow: true },
    }
}

// ─── Statik sahifalar (jadvaldan) ──────────────────────────────────────────────
export const PAGE_SEO = {
    home: {
        path: '/',
        title: 'Магазин оригинальной техники Apple, Samsung, Dyson в СПб | Genius Store',
        description:
            'Оригинальная техника Apple, Samsung, Dyson в Санкт-Петербурге. Рассрочка 0%, Trade-in, гарантия! Невский проспект, 32-34',
        keywords: 'магазин Apple',
    },
    catalog: {
        path: '/catalog',
        title: 'Каталог техники Apple, Samsung, Dyson в СПб - цены, наличие | Genius Store',
        description:
            'Полный каталог оригинальной техники: iPhone, MacBook, iPad, Apple Watch, Dyson. Рассрочка 0%, Trade-in, доставка по СПб. Невский проспект, 32-34',
        keywords: 'каталог Apple',
    },
    about: {
        path: '/about',
        title: 'О магазине Genius Store - оригинальная техника в СПб | Genius Store',
        description:
            'Genius Store — магазин оригинальной техники Apple, Samsung, Dyson в Санкт-Петербурге. Более 10 000 довольных клиентов. Невский проспект, 32-34',
        keywords: 'магазин Genius Store',
    },
    tradeIn: {
        path: '/trade-in',
        title: 'Trade-in в СПб - сдай старый iPhone, получи скидку до 30% | Genius Store',
        description:
            'Обменяйте старый смартфон, планшет или ноутбук на новый с выгодой до 30%. Оценка за 15 минут, мгновенный зачёт. Невский проспект, 32-34',
        keywords: 'Trade-in iPhone',
    },
    service: {
        path: '/servics',
        title: 'Сервисный центр Apple в СПб - ремонт iPhone, MacBook | Genius Store',
        description:
            'Профессиональный ремонт iPhone, iPad, MacBook, Apple Watch. Оригинальные запчасти, гарантия на работы до 1 года. Невский проспект, 32-34',
        keywords: 'ремонт iPhone',
    },
    delivery: {
        path: '/delivery',
        title: 'Доставка техники Apple по СПб и России - от 2 часов | Genius Store',
        description:
            'Бесплатная доставка по СПб от 2 часов, по России — от 1 дня. Самовывоз из шоурума на адресе: Невский проспект, 32-34. Курьер, СДЭК, Почта.',
        keywords: 'доставка техники',
    },
    news: {
        path: '/news',
        title: 'Новости и акции магазина Genius Store в СПб | Genius Store',
        description:
            'Свежие новости, обзоры новинок Apple и Samsung, акции и специальные предложения магазина Genius Store. Невский проспект, 32-34',
        keywords: 'новости',
    },
    review: {
        path: '/review',
        title: 'Отзывы клиентов о магазине Genius Store в СПб | Genius Store',
        description:
            'Реальные отзывы покупателей о магазине Genius Store. Рейтинг 4.9 из 5. Более 2 000 положительных отзывов. Невский проспект, 32-34',
        keywords: 'отзывы',
    },
    plan: {
        path: '/plan',
        title: 'Рассрочка 0% на технику Apple, Samsung в СПб | Genius Store',
        description:
            'Рассрочка 0% без переплат на 3–24 месяца на iPhone, MacBook, iPad, Dyson. Одобрение за 2 минуты, первый платёж от 990 ₽. Невский проспект, 32-34',
        keywords: 'рассрочка на iPhone',
    },
    guarantee: {
        path: '/guarantee',
        title: 'Гарантия на технику Apple, Samsung, Dyson | Genius Store',
        description:
            'Официальная гарантия производителя 1 год + расширенная гарантия магазина до 2 лет. Бесплатный ремонт и обмен. Невский проспект, 32-34',
        keywords: 'гарантия на iPhone',
    },
    contact: {
        path: '/contact',
        title: 'Контакты магазина Genius Store в СПб - адрес, телефон | Genius Store',
        description:
            'Свяжитесь с нами! Санкт-Петербург, Невский проспект, 32-34. Ежедневно 10:00–21:00.',
        keywords: 'контакты',
    },
    // Indekslanmasin (shaxsiy / texnik sahifalar)
    basket: {
        path: '/basket',
        title: 'Корзина | Genius Store',
        description: 'Ваша корзина в магазине Genius Store.',
        keywords: 'корзина',
        noindex: true,
    },
    saved: {
        path: '/saved',
        title: 'Избранное | Genius Store',
        description: 'Сохранённые товары в магазине Genius Store.',
        keywords: 'избранное',
        noindex: true,
    },
}

// ─── Kategoriyalar (catalog/[category]) — jadvaldan, slug bo'yicha ──────────────
export const CATEGORY_SEO = {
    smartfony: {
        title: 'Купить iPhone и Samsung в Санкт-Петербурге - оригинал, гарантия | Genius Store',
        description:
            'Смартфоны iPhone 17, Samsung Galaxy в наличии. 100% оригинал, официальная гарантия, рассрочка 0%, Trade-in. Невский проспект, 32-34',
        keywords: 'купить iPhone',
    },
    planshety: {
        title: 'Купить iPad, Galaxy Tab в СПб - оригинал, рассрочка | Genius Store',
        description:
            'Планшеты Apple iPad и Samsung Galaxy Tab в наличии. Все объёмы памяти и цвета. Рассрочка 0%, Trade-in, настройка в подарок. Невский проспект, 32-34',
        keywords: 'купить iPad',
    },
    noutbuki: {
        title: 'Купить MacBook Air, MacBook Pro в СПб - оригинал | Genius Store',
        description:
            'Ноутбуки Apple MacBook Air и Pro в наличии. Официальная гарантия, рассрочка 0%, Trade-in. Невский проспект, 32-34',
        keywords: 'купить MacBook',
    },
    naushniki: {
        title: 'Купить AirPods, Galaxy Buds в СПб - оригинал | Genius Store',
        description:
            'Наушники Apple AirPods Pro, Galaxy Buds, Sony в наличии. 100% оригинал, гарантия, рассрочка 0%. Невский проспект, 32-34',
        keywords: 'купить AirPods',
    },
    'smart-chasy': {
        title: 'Купить Apple Watch, Galaxy Watch в СПб - оригинал | Genius Store',
        description:
            'Умные часы Apple Watch Series 11, Ultra, Samsung Galaxy Watch. Оригинал, гарантия, рассрочка 0%. Невский проспект, 32-34',
        keywords: 'купить Apple Watch',
    },
    kamery: {
        title: 'Купить экшн-камеры GoPro, DJI в СПб - оригинал | Genius Store',
        description:
            'Экшн-камеры GoPro Hero, DJI Osmo Action в наличии. Оригинал, гарантия, рассрочка. Невский проспект, 32-34',
        keywords: 'купить камеру',
    },
    'igrovye-konsoli': {
        title: 'Купить PlayStation 5, Xbox в СПб | Genius Store',
        description:
            'Игровые консоли PS5, Xbox Series X в наличии. Оригинал, гарантия, рассрочка 0%, Trade-in. Невский проспект, 32-34',
        keywords: 'купить PlayStation',
    },
    pylesosy: {
        title: 'Купить Dyson в СПб - пылесосы, стайлеры, фены | Genius Store',
        description:
            'Пылесосы Dyson V15, стайлеры Airwrap, фены. 100% оригинал, гарантия РФ, рассрочка 0%. Невский проспект, 32-34',
        keywords: 'купить Dyson',
    },
    aksessuary: {
        title: 'Аксессуары для iPhone, MacBook, Apple Watch в СПб | Genius Store',
        description:
            'Оригинальные чехлы, зарядки MagSafe, ремешки Apple Watch, защитные стёкла. В наличии и под заказ. Невский проспект, 32-34',
        keywords: 'аксессуары Apple',
    },
    'bu-tekhnika': {
        title: 'Б/У техника Apple, Samsung в СПб - проверенная, с гарантией | Genius Store',
        description:
            'Восстановленная техника iPhone, MacBook, iPad с гарантией. Проверка по 50+ параметрам, Trade-in. Невский проспект, 32-34',
        keywords: 'б/у iPhone',
    },
}

// Statik sahifa metadata'si.
export function pageMetadata(key) {
    const seo = PAGE_SEO[key]
    if (!seo) return {}
    return buildMetadata(seo)
}

// Kategoriya metadata'si: avval jadvaldan, topilmasa API'dan nom tortib yasaydi.
export async function categoryMetadata(slug) {
    const seo = CATEGORY_SEO[slug]
    if (seo) {
        return buildMetadata({ ...seo, path: `/catalog/${slug}` })
    }

    // Jadvalda yo'q (yangi kategoriya) — API'dan nomini olib, umumiy SEO yasaymiz.
    let name = 'Каталог'
    try {
        const res = await fetch(`${API}/category`, { next: { revalidate: 3600 } })
        if (res.ok) {
            const cats = await res.json()
            const cat = Array.isArray(cats)
                ? cats.find((c) => c.slug === slug)
                : null
            if (cat?.name) name = cat.name
        }
    } catch {
        // tarmoq xatosi — fallback nomi bilan davom etamiz
    }

    return buildMetadata({
        path: `/catalog/${slug}`,
        title: `${name} в СПб - оригинал, гарантия, рассрочка | Genius Store`,
        description: `${name} в наличии в Санкт-Петербурге. 100% оригинал, официальная гарантия, рассрочка 0%, Trade-in. Невский проспект, 32-34`,
        keywords: name.toLowerCase(),
    })
}

// Yangilik sahifasi (news/[detail]) uchun — backend article obyektidan.
export function newsMetadata(article, slug) {
    if (!article) {
        return buildMetadata({
            path: `/news/${slug}`,
            title: 'Новости магазина Genius Store в СПб | Genius Store',
            description:
                'Свежие новости, обзоры новинок Apple и Samsung, акции магазина Genius Store. Невский проспект, 32-34',
            keywords: 'новости',
        })
    }
    const title = article.title || 'Новости'
    const plain = String(article.content || '')
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
    return buildMetadata({
        path: `/news/${slug}`,
        title: `${title} | Genius Store`,
        description: plain.slice(0, 160) || `${title}. Новости магазина Genius Store.`,
        keywords: `новости, ${title}`,
        image: article.image,
    })
}

// Mahsulot sahifasi (product/[slug]) uchun — backend product obyektidan.
export function productMetadata(product, slug) {
    if (!product) {
        return buildMetadata({
            path: `/product/${slug}`,
            title: 'Товар - купить в СПб | Genius Store',
            description:
                'Оригинальная техника с гарантией. Рассрочка 0%, Trade-in, доставка по СПб. Невский проспект, 32-34',
            keywords: 'купить технику',
        })
    }
    const title = product.title || 'Товар'
    const price = product.variants?.find((v) => v.isAvailable)?.price
    const priceText = price
        ? `Цена ${new Intl.NumberFormat('ru-RU').format(Math.round(price))} ₽. `
        : ''
    const image = product.variants?.[0]?.images?.[0]?.url
    return buildMetadata({
        path: `/product/${slug}`,
        title: `${title} - купить в СПб, оригинал | Genius Store`,
        description:
            (product.description?.trim()?.slice(0, 140) ||
                `${title}. ${priceText}100% оригинал, гарантия, рассрочка 0%, Trade-in.`) +
            ' Невский проспект, 32-34',
        keywords: `купить ${product.brand?.name || ''} ${title}`.trim(),
        image,
    })
}
