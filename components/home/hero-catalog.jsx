import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { getData } from '@/lib/getData'

// Backend media bazasi (icon maydoni shu yerdan ochiladi)
const MEDIA_BASE = 'https://admin.geniusstorerf.ru/media/'

const FALLBACK_IMAGES = {
    smartfony: '/imgs/phone.png',
    planshety: '/imgs/planshet.png',
    noutbuki: '/imgs/mac.png',
    naushniki: '/imgs/airpods.png',
    'smart-chasy': '/imgs/watch.png',
    dyson: '/imgs/dyson.png',
}

// Backenddan kelgan icon'dan to'liq URL quradi; icon bo'lmasa lokal fallback.
function getCategoryImage(cat) {
    if (cat?.icon) {
        return cat.icon.startsWith('http')
            ? cat.icon
            : MEDIA_BASE + cat.icon.replace(/^\/+/, '')
    }
    return FALLBACK_IMAGES[cat?.slug] || '/imgs/phone.png'
}

function CategoryCard({ href, title, img, titleSize = '32px', imgWidth = 355, imgHeight = 355, className = '', imgFill = false }) {
    return (
        <Link
            href={href}
            className={`group rounded-[20px] bg-white overflow-hidden block transition-shadow duration-200 hover:shadow-[0_4px_15.8px_0_rgba(0,0,0,0.10)] ${className}`}
        >
            <h2
                className="px-6 pt-6 text-[#222222] font-semibold mb-2 group-hover:text-[#D4A63A] transition-colors duration-150"
                style={{ fontSize: titleSize }}
            >
                {title}
            </h2>
            <div className="relative w-full h-[calc(100%-72px)] flex justify-center">
                {imgFill ? (
                    <Image
                        src={img}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-contain p-5 lg:p-6 transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <Image
                        src={img}
                        alt={title}
                        width={imgWidth}
                        height={imgHeight}
                        className="object-contain transition-transform duration-300 group-hover:scale-105 w-full h-full p-4 lg:w-auto lg:h-auto lg:p-0"
                    />
                )}
            </div>
        </Link>
    )
}


function PromoCard({ img, imgWidth, imgHeight, mobileImg, mobileWidth, mobileHeight, title, text, href }) {
    return (
        <div className="rounded-[20px] bg-white overflow-hidden h-auto lg:h-[500px] flex flex-col-reverse lg:flex-row items-center md:px-6 pt-3 lg:py-0 gap-6">
            <div className="lg:contents flex items-center justify-center w-full">
                {/* Mobile: alohida gorizontal rasm */}
                <Image
                    src={mobileImg}
                    alt={title}
                    width={mobileWidth}
                    height={mobileHeight}
                    quality={100}
                    unoptimized
                    className="lg:hidden object-contain w-auto h-auto max-w-full max-h-[150px]"
                />
                {/* Desktop: o'zgarmagan */}
                <Image
                    src={img}
                    alt={title}
                    width={imgWidth}
                    height={imgHeight}
                    quality={100}
                    unoptimized
                    className="hidden lg:block object-contain lg:w-auto lg:h-auto lg:max-h-full lg:shrink-0 lg:self-center"
                />
            </div>
            <div className="flex flex-col justify-center items-center text-center grow">
                <h2 className="mb-6 text-[#222222] text-[36px] lg:text-[50px] font-bold">
                    {title}
                </h2>
                <p className="mb-6 text-base lg:text-xl text-[#444444] font-medium max-w-[300px]">
                    {text}
                </p>
                <Link
                    href={href}
                    className="bg-[#D4A63A] w-50 max-md:w-full h-15 rounded-[20px] text-[#222222] flex items-center justify-center hover:brightness-95 active:brightness-90 transition group"
                >
                    <p className="text-lg font-medium">Подробнее</p>
                    <Image
                        src="/icons/arrow-narrow-right.svg"
                        alt=""
                        width={24}
                        height={24}
                        className="ml-2.5 transition-transform duration-200 group-hover:translate-x-1"
                    />
                </Link>
            </div>
        </div>
    )
}

export default async function HeroCatalog() {
    const { data: allCategories } = await getData('/category')

    // Faqat birinchi 6 tasi
    const categories = allCategories.slice(0, 6)
    const [cat0, cat1, cat2, cat3, cat4, cat5] = categories

    return (
        <div className="px-4 lg:px-0 lg:w-360 mx-auto">
            {/* Header */}
            <div className="flex flex-wrap gap-4 justify-between items-center mb-6 lg:mb-8">
                <h2 className="text-[#222222] font-bold text-[32px] sm:text-[40px] lg:text-[50px]">Каталог</h2>
                <Link
                    href="/catalog"
                    className="bg-[#D4A63A] px-6 max-md:w-full h-12 lg:h-15 rounded-[20px] text-[#222222] flex items-center justify-center hover:brightness-95 active:brightness-90 transition group"
                >
                    <p className="text-base lg:text-lg font-medium">Все категории</p>
                    <Image
                        src="/icons/arrow-narrow-right.svg"
                        alt=""
                        width={24}
                        height={24}
                        className="ml-2.5 transition-transform duration-200 group-hover:translate-x-1"
                    />
                </Link>
            </div>

            {/* 1-qator: cat0 (chap, katta) + cat1/cat2/cat3 (o'ng ustun) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 lg:h-[600px]">
                {cat0 && (
                    <CategoryCard
                        href={`/catalog/${cat0.slug}`}
                        title={cat0.name}
                        img={getCategoryImage(cat0)}
                        titleSize="32px"
                        className="h-[400px] lg:h-full"
                        imgFill
                    />
                )}

                <div className="flex flex-col gap-4 lg:gap-6 h-full">
                    {cat1 && (
                        <CategoryCard
                            href={`/catalog/${cat1.slug}`}
                            title={cat1.name}
                            img={getCategoryImage(cat1)}
                            titleSize="32px"
                            className="h-[260px] lg:h-[288px] shrink-0"
                        />
                    )}
                    <div className="grid grid-cols-2 gap-4 lg:gap-6 flex-1">
                        {cat2 && (
                            <CategoryCard
                                href={`/catalog/${cat2.slug}`}
                                title={cat2.name}
                                img={getCategoryImage(cat2)}
                                titleSize="24px"
                                className="h-[260px] lg:h-full"
                            />
                        )}
                        {cat3 && (
                            <CategoryCard
                                href={`/catalog/${cat3.slug}`}
                                title={cat3.name}
                                img={getCategoryImage(cat3)}
                                titleSize="24px"
                                className="h-[260px] lg:h-full"
                                imgFill
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* 2-qator: cat4 + cat5 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mt-6 lg:mt-8 mb-20">
                {cat4 && (
                    <CategoryCard
                        href={`/catalog/${cat4.slug}`}
                        title={cat4.name}
                        img={getCategoryImage(cat4)}
                        titleSize="32px"
                        className="h-[288px]"
                    />
                )}
                {cat5 && (
                    <CategoryCard
                        href={`/catalog/${cat5.slug}`}
                        title={cat5.name}
                        img={getCategoryImage(cat5)}
                        titleSize="32px"
                        className="h-[288px]"
                    />
                )}
            </div>

            {/* Promo: Trade-in + Rassrochka */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-20">
                <PromoCard
                    img="/imgs/tradein.png"
                    imgWidth={268}
                    imgHeight={500}
                    mobileImg="/imgs/tradein-mobile.png"
                    mobileWidth={296}
                    mobileHeight={117}
                    title="Trade-In"
                    text="Обменяйте старый iPhone на новый по выгодной цене"
                    href="/trade-in"
                />
                <PromoCard
                    img="/imgs/bolib.png"
                    imgWidth={307}
                    imgHeight={415}
                    mobileImg="/imgs/bolib-mobile.png"
                    mobileWidth={276}
                    mobileHeight={132}
                    title="Рассрочка"
                    text="Без переплаты и первого взноса."
                    href="/plan"
                />
            </div>
        </div>
    )
}