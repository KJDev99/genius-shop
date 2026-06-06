import Image from 'next/image'
import React from 'react'
import { getData } from '@/lib/getData'

// Har bir to'plamda kamida shuncha karta bo'lsin — ekran kengligini to'ldirib,
// marquee'da bo'sh joy ko'rinmasligi uchun.
const MIN_PER_SET = 6

export default async function BrandsSlider() {
    const { data } = await getData('/brand')

    // Faqat rasmi bor brendlar (backendda image: null bo'lishi mumkin).
    const brands = (Array.isArray(data) ? data : []).filter((b) => b?.image)

    if (brands.length === 0) return null

    // Bitta to'plamni ekranni to'ldiradigan darajada ko'paytiramiz...
    const oneSet = []
    while (oneSet.length < MIN_PER_SET) oneSet.push(...brands)

    // ...so'ng seamless loop uchun ikki marta takrorlaymiz (-50% siljish).
    const loop = [...oneSet, ...oneSet]

    return (
        <section>
            <h2 className="text-[#222222] font-bold text-[24px] sm:text-[32px] lg:text-[40px] mb-6">
                Бренды
            </h2>

            {/* Marquee oynasi: ichkarida scroll, tashqarida emas */}
            <div className="overflow-hidden">
                <div className="flex w-max animate-brands-marquee">
                    {loop.map((brand, i) => (
                        <div
                            key={`${brand.id}-${i}`}
                            className="bg-white rounded-2xl flex items-center justify-center shrink-0 p-4 h-[166px] w-[340px] mr-6 max-md:h-25 max-md:w-[200px] max-md:p-3 max-md:mr-3"
                        >
                            <Image
                                src={brand.image}
                                alt={brand.name || 'Brand'}
                                width={200}
                                height={100}
                                className="object-contain max-w-full max-h-full w-auto h-auto"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
