import { getData } from '@/lib/getData'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

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

function SmallCategoryCard({ href, title, img }) {
    return (
        <Link
            href={href}
            className="group rounded-[20px] bg-white overflow-hidden block transition-shadow duration-200 hover:shadow-[0_4px_15.8px_0_rgba(0,0,0,0.10)] h-[200px] relative"
        >
            <h2 className="px-5 pt-5 text-[#222222] text-[20px] font-semibold mb-2 group-hover:text-[#D4A63A] transition-colors duration-150">
                {title}
            </h2>
            <div className="absolute bottom-0 right-0 w-[130px] h-[130px]">
                <Image src={img} alt={title} fill sizes="130px" className="object-contain transition-transform duration-300 group-hover:scale-105" />
            </div>
        </Link>
    )
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
                    <Image src={img} alt={title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-300 group-hover:scale-105" />
                ) : (
                    <Image src={img} alt={title} width={imgWidth} height={imgHeight} className="object-contain transition-transform duration-300 group-hover:scale-105" />
                )}
            </div>
        </Link>
    )
}

function BlockA({ big, top, small1, small2 }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 lg:h-[600px] mb-4 lg:mb-6">
            {big && (
                <CategoryCard href={`/catalog/${big.slug}`} title={big.name} img={getCategoryImage(big.slug)} titleSize="32px" className="h-[400px] lg:h-full" imgFill />
            )}
            <div className="flex flex-col gap-4 lg:gap-6 h-full">
                {top && (
                    <CategoryCard href={`/catalog/${top.slug}`} title={top.name} img={getCategoryImage(top.slug)} titleSize="32px" className="h-[260px] lg:h-[288px] shrink-0" />
                )}
                <div className="grid grid-cols-2 gap-4 lg:gap-6 flex-1">
                    {small1 && (
                        <CategoryCard href={`/catalog/${small1.slug}`} title={small1.name} img={getCategoryImage(small1.slug)} titleSize="24px" className="h-[260px] lg:h-full" />
                    )}
                    {small2 && (
                        <CategoryCard href={`/catalog/${small2.slug}`} title={small2.name} img={getCategoryImage(small2.slug)} titleSize="24px" className="h-[260px] lg:h-full" imgFill />
                    )}
                </div>
            </div>
        </div>
    )
}

function BlockC({ big, top, small1, small2 }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 lg:h-[600px] mb-4 lg:mb-6">
            <div className="flex flex-col gap-4 lg:gap-6 h-full">
                {top && (
                    <CategoryCard href={`/catalog/${top.slug}`} title={top.name} img={getCategoryImage(top.slug)} titleSize="32px" className="h-[260px] lg:h-[288px] shrink-0" />
                )}
                <div className="grid grid-cols-2 gap-4 lg:gap-6 flex-1">
                    {small1 && (
                        <CategoryCard href={`/catalog/${small1.slug}`} title={small1.name} img={getCategoryImage(small1.slug)} titleSize="24px" className="h-[260px] lg:h-full" />
                    )}
                    {small2 && (
                        <CategoryCard href={`/catalog/${small2.slug}`} title={small2.name} img={getCategoryImage(small2.slug)} titleSize="24px" className="h-[260px] lg:h-full" imgFill />
                    )}
                </div>
            </div>
            {big && (
                <CategoryCard href={`/catalog/${big.slug}`} title={big.name} img={getCategoryImage(big.slug)} titleSize="32px" className="h-[400px] lg:h-full" imgFill />
            )}
        </div>
    )
}

export default async function AllCatalog() {
    const { data: categories } = await getData('/category')

    // 1-4: BlockA — katta CHAP
    const [cat0, cat1, cat2, cat3] = categories.slice(0, 4)

    // 5-6: 2 ta yonma-yon (markaz)
    const [cat4, cat5] = categories.slice(4, 6)

    // 7-10: BlockC — katta O'NG (BlockA oynasi)
    const [cat6, cat7, cat8, cat9] = categories.slice(6, 10)

    // 11+: kichik grid
    const restCategories = categories.slice(10)

    return (
        <div className="px-4 lg:px-0 lg:w-360 mx-auto mb-20 max-md:w-full">
            <div className="flex flex-wrap gap-4 justify-between items-center mb-6 lg:mb-8">
                <h2 className="text-[#222222] font-bold text-[32px] sm:text-[40px] lg:text-[50px]">Каталог</h2>

            </div>

            {/* 1-4: BlockA — katta CHAP */}
            {categories.length >= 1 && (
                <BlockA big={cat0} top={cat1} small1={cat2} small2={cat3} />
            )}

            {/* 5-6: 2 ta yonma-yon */}
            {categories.length >= 5 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mb-4 lg:mb-6">
                    {cat4 && <CategoryCard href={`/catalog/${cat4.slug}`} title={cat4.name} img={getCategoryImage(cat4.slug)} titleSize="32px" className="h-[288px]" />}
                    {cat5 && <CategoryCard href={`/catalog/${cat5.slug}`} title={cat5.name} img={getCategoryImage(cat5.slug)} titleSize="32px" className="h-[288px]" />}
                </div>
            )}

            {/* 7-10: BlockC — katta O'NG */}
            {categories.length >= 7 && (
                <BlockC big={cat9} top={cat6} small1={cat7} small2={cat8} />
            )}

            {/* 11+: kichik grid */}
            {restCategories.length > 0 && (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-20">
                    {restCategories.map((cat) => (
                        <SmallCategoryCard key={cat.id} href={`/catalog/${cat.slug}`} title={cat.name} img={getCategoryImage(cat.slug)} />
                    ))}
                </div>
            )}

        </div>
    )
}