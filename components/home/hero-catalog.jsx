import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { getData } from '@/lib/getData'

const CATEGORY_IMAGES = {
    smartfony: '/imgs/phone.png',
    planshety: '/imgs/planshet.png',
    noutbuki: '/imgs/mac.png',
    naushniki: '/imgs/airpods.png',
    'smart-chasy': '/imgs/watch.png',
    dyson: '/imgs/dyson.png',
}

function getCategoryImage(slug) {
    return CATEGORY_IMAGES[slug] || '/imgs/phone.png'
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
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <Image
                        src={img}
                        alt={title}
                        width={imgWidth}
                        height={imgHeight}
                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                )}
            </div>
        </Link>
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
                    className="bg-[#D4A63A] px-6 h-12 lg:h-15 rounded-[20px] text-[#222222] flex items-center justify-center hover:brightness-95 active:brightness-90 transition group"
                >
                    <p className="text-base lg:text-lg font-semibold">Все категории</p>
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
                        img={getCategoryImage(cat0.slug)}
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
                            img={getCategoryImage(cat1.slug)}
                            titleSize="32px"
                            className="h-[260px] lg:h-[288px] shrink-0"
                        />
                    )}
                    <div className="grid grid-cols-2 gap-4 lg:gap-6 flex-1">
                        {cat2 && (
                            <CategoryCard
                                href={`/catalog/${cat2.slug}`}
                                title={cat2.name}
                                img={getCategoryImage(cat2.slug)}
                                titleSize="24px"
                                className="h-[260px] lg:h-full"
                            />
                        )}
                        {cat3 && (
                            <CategoryCard
                                href={`/catalog/${cat3.slug}`}
                                title={cat3.name}
                                img={getCategoryImage(cat3.slug)}
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
                        img={getCategoryImage(cat4.slug)}
                        titleSize="32px"
                        className="h-[288px]"
                    />
                )}
                {cat5 && (
                    <CategoryCard
                        href={`/catalog/${cat5.slug}`}
                        title={cat5.name}
                        img={getCategoryImage(cat5.slug)}
                        titleSize="32px"
                        className="h-[288px]"
                    />
                )}
            </div>

            {/* Promo: Trade-in + Rassrochka */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-20">
                <div className="rounded-[20px] bg-white overflow-hidden h-auto lg:h-[500px] flex flex-col lg:flex-row items-center px-6 py-10 lg:py-0 gap-6">
                    <Image
                        src="/imgs/tradein.png"
                        alt="Trade-in"
                        width={268}
                        height={500}
                        className="object-contain shrink-0"
                    />
                    <div className="flex flex-col justify-center items-center text-center grow">
                        <h2 className="mb-6 text-[#222222] text-[36px] lg:text-[50px] font-bold">Trade-In</h2>
                        <p className="mb-6 text-base lg:text-xl text-[#444444] font-medium max-w-[300px]">
                            Обменяйте старый iPhone на новый по выгодной цене
                        </p>
                        <Link
                            href="/trade-in"
                            className="bg-[#D4A63A] w-50 h-15 rounded-[20px] text-[#222222] flex items-center justify-center hover:brightness-95 active:brightness-90 transition group"
                        >
                            <p className="text-lg font-semibold">Подробнее</p>
                            <Image src="/icons/arrow-narrow-right.svg" alt="" width={24} height={24} className="ml-2.5 transition-transform duration-200 group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>

                <div className="rounded-[20px] bg-white overflow-hidden h-auto lg:h-[500px] flex flex-col lg:flex-row items-center px-6 py-10 gap-6">
                    <Image
                        src="/imgs/bolib.png"
                        alt="Installments"
                        width={307}
                        height={415}
                        className="object-contain shrink-0"
                    />
                    <div className="flex flex-col justify-center items-center text-center grow">
                        <h2 className="mb-6 text-[#222222] text-[36px] lg:text-[50px] font-bold">Рассрочка</h2>
                        <p className="mb-6 text-base lg:text-xl text-[#444444] font-medium max-w-[300px]">
                            Без переплаты и первого взноса.
                        </p>
                        <Link
                            href="/plan"
                            className="bg-[#D4A63A] w-50 h-15 rounded-[20px] text-[#222222] flex items-center justify-center hover:brightness-95 active:brightness-90 transition group"
                        >
                            <p className="text-lg font-semibold">Подробнее</p>
                            <Image src="/icons/arrow-narrow-right.svg" alt="" width={24} height={24} className="ml-2.5 transition-transform duration-200 group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}