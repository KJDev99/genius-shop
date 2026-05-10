import Image from 'next/image'
import React from 'react'

export default function HeroCatalog() {
    return (
        <div className='md:w-360 mx-auto'>
            <div className="flex justify-between items-center">
                <h2 className='text-[#222222] font-bold text-[50px]'>Каталог</h2>
                <button className='bg-[#D4A63A] w-50 h-15 rounded-[20px] text-[#222222] flex items-center justify-center'>
                    <p className='text-lg font-semibold'>Все категории</p>
                    <Image src={'/icons/arrow-narrow-right.svg'} alt="Logo" width={24} height={24} className='ml-2.5' />
                </button>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-8 h-[600px]">
                {/* LEFT */}
                <div className="rounded-[20px] bg-white overflow-hidden h-full">
                    <h2 className='px-6 pt-6 text-[#222222] font-semibold text-[32px] mb-2'>Смартфоны</h2>
                    <div className="relative w-full h-[calc(100%-72px)]">
                        <Image
                            src={'/imgs/phone.png'}
                            alt="Smartphones"
                            fill
                            className='object-cover'
                        />
                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col gap-6 h-full">
                    {/* Yuqori — 288px */}
                    <div className="rounded-[20px] bg-white overflow-hidden h-[288px] shrink-0">
                        <h2 className='px-6 pt-6 text-[#222222] font-semibold text-[32px] mb-2'>Планшеты</h2>
                        <div className="relative w-full h-[calc(100%-72px)] flex justify-center">
                            <Image
                                src={'/imgs/planshet.png'}
                                alt="Tablets"
                                width={355}
                                height={355}
                                className='object-content'
                            />
                        </div>
                    </div>

                    {/* Quyi — 288px (600 - 288 - 24gap = 288) */}
                    <div className="grid grid-cols-2 gap-6 flex-1">
                        <div className="rounded-[20px] bg-white overflow-hidden h-full pb-3">
                            <h2 className='px-6 pt-6 text-[#222222] font-semibold text-[24px] mb-2'>Mac</h2>
                            <div className="relative w-full h-[calc(100%-64px)] flex justify-center items-end">
                                <Image
                                    src={'/imgs/mac.png'}
                                    alt="Mac"
                                    width={355}
                                    height={355}
                                    className='object-content'
                                />
                            </div>
                        </div>
                        <div className="rounded-[20px] bg-white overflow-hidden h-full">
                            <h2 className='px-6 pt-6 text-[#222222] font-semibold text-[24px] mb-2'>AirPods</h2>
                            <div className="relative w-full h-[calc(100%-64px)]">
                                <Image
                                    src={'/imgs/airpods.png'}
                                    alt="AirPods"
                                    fill
                                    className='object-cover'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-8 mb-20">
                {/* LEFT */}
                <div className="rounded-[20px] bg-white overflow-hidden h-[288px] shrink-0">
                    <h2 className='px-6 pt-6 text-[#222222] font-semibold text-[32px] mb-2'>Смарт-часы</h2>
                    <div className="relative w-full h-[calc(100%-72px)] flex justify-center">
                        <Image
                            src={'/imgs/watch.png'}
                            alt="Tablets"
                            width={355}
                            height={355}
                            className='object-content'
                        />
                    </div>
                </div>

                {/* RIGHT */}
                <div className="rounded-[20px] bg-white overflow-hidden h-[288px] shrink-0">
                    <h2 className='px-6 pt-6 text-[#222222] font-semibold text-[32px] mb-2'>Dyson</h2>
                    <div className="relative w-full h-[calc(100%-72px)] flex justify-center">
                        <Image
                            src={'/imgs/dyson.png'}
                            alt="Dyson"
                            width={355}
                            height={355}
                            className='object-content'
                        />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-8 mb-20">
                {/* LEFT */}
                <div className="rounded-[20px] bg-white overflow-hidden h-[500px] shrink-0 flex px-6">
                    <Image
                        src={'/imgs/tradein.png'}
                        alt="Dyson"
                        width={268}
                        height={500}
                        className='object-content'
                    />
                    <div className="flex flex-col justify-center items-center text-center grow">
                        <h2 className='mb-6 text-[#222222] text-[50px] font-bold'>Trade-In</h2>
                        <p className='mb-6 text-xl text-[#444444] font-medium max-w-[300px]'>Обменяйте старый iPhone на новый по выгодной цене</p>
                        <button className='bg-[#D4A63A] w-50 h-15 rounded-[20px] text-[#222222] flex items-center justify-center'>
                            <p className='text-lg font-semibold'>Подробнее</p>
                            <Image src={'/icons/arrow-narrow-right.svg'} alt="Logo" width={24} height={24} className='ml-2.5' />
                        </button>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="rounded-[20px] bg-white overflow-hidden h-[500px] shrink-0 flex px-6 py-10">
                    <Image
                        src={'/imgs/bolib.png'}
                        alt="Dyson"
                        width={307}
                        height={415}
                        className='object-content'
                    />
                    <div className="flex flex-col justify-center items-center text-center grow">
                        <h2 className='mb-6 text-[#222222] text-[50px] font-bold'>Рассрочка</h2>
                        <p className='mb-6 text-xl text-[#444444] font-medium max-w-[300px]'>Без переплаты и первого взноса. </p>
                        <button className='bg-[#D4A63A] w-50 h-15 rounded-[20px] text-[#222222] flex items-center justify-center'>
                            <p className='text-lg font-semibold'>Подробнее</p>
                            <Image src={'/icons/arrow-narrow-right.svg'} alt="Logo" width={24} height={24} className='ml-2.5' />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}