import Image from 'next/image'
import React from 'react'

export default function HomeReiwvs() {
    return (
        <div className='md:w-360 mx-auto'>
            <div className="flex justify-between items-center">
                <h2 className='text-[#222222] font-bold text-[50px]'>Отзывы о нас</h2>
                <button className='bg-[#D4A63A] w-50 h-15 rounded-[20px] text-[#222222] flex items-center justify-center'>
                    <p className='text-lg font-semibold'>Все отзывы</p>
                    <Image src={'/icons/arrow-narrow-right.svg'} alt="Logo" width={24} height={24} className='ml-2.5' />
                </button>
            </div>
            <div className="grid grid-cols-3 gap-6 mb-6 mt-8">
                <div className="p-6 rounded-[20px] bg-white">
                    <div className="flex justify-between mb-4">
                        <h2 className='text-[#222222] font-bold text-xl'>Алексей</h2>
                        <div className="flex">
                            <Image src={'/icons/star.svg'} alt="Star" width={20} height={20} />
                            <Image src={'/icons/star.svg'} alt="Star" width={20} height={20} />
                            <Image src={'/icons/star.svg'} alt="Star" width={20} height={20} />
                            <Image src={'/icons/star.svg'} alt="Star" width={20} height={20} />
                            <Image src={'/icons/star.svg'} alt="Star" width={20} height={20} />
                        </div>
                    </div>
                    <p className='mb-4 text-[#888888] text-sm'>2 декабря 2025</p>
                    <p className='text-[#444444] leading-[120%] mb-4'>Покупал здесь iPhone. Всё прошло отлично: быстро ответили, подробно проконсультировали и помогли выбрать модель. Телефон полностью оригинальный, в идеальном состоянии. Доставили в тот же день по Санкт-Петербургу. Очень доволен покупкой, буду рекомендовать магазин знакомым.</p>
                    <Image src={'/icons/reviws.svg'} alt="Review" width={70} height={20} className='object-cover rounded-[20px]' />
                </div>
                <div className="p-6 rounded-[20px] bg-white">
                    <div className="flex justify-between mb-4">
                        <h2 className='text-[#222222] font-bold text-xl'>Алексей</h2>
                        <div className="flex">
                            <Image src={'/icons/star.svg'} alt="Star" width={20} height={20} />
                            <Image src={'/icons/star.svg'} alt="Star" width={20} height={20} />
                            <Image src={'/icons/star.svg'} alt="Star" width={20} height={20} />
                            <Image src={'/icons/star.svg'} alt="Star" width={20} height={20} />
                            <Image src={'/icons/star.svg'} alt="Star" width={20} height={20} />
                        </div>
                    </div>
                    <p className='mb-4 text-[#888888] text-sm'>2 декабря 2025</p>
                    <p className='text-[#444444] leading-[120%] mb-4'>Покупал здесь iPhone. Всё прошло отлично: быстро ответили, подробно проконсультировали и помогли выбрать модель. Телефон полностью оригинальный, в идеальном состоянии. Доставили в тот же день по Санкт-Петербургу. Очень доволен покупкой, буду рекомендовать магазин знакомым.</p>
                    <Image src={'/icons/reviws.svg'} alt="Review" width={70} height={20} className='object-cover rounded-[20px]' />
                </div>
                <div className="p-6 rounded-[20px] bg-white">
                    <div className="flex justify-between mb-4">
                        <h2 className='text-[#222222] font-bold text-xl'>Алексей</h2>
                        <div className="flex">
                            <Image src={'/icons/star.svg'} alt="Star" width={20} height={20} />
                            <Image src={'/icons/star.svg'} alt="Star" width={20} height={20} />
                            <Image src={'/icons/star.svg'} alt="Star" width={20} height={20} />
                            <Image src={'/icons/star.svg'} alt="Star" width={20} height={20} />
                            <Image src={'/icons/star.svg'} alt="Star" width={20} height={20} />
                        </div>
                    </div>
                    <p className='mb-4 text-[#888888] text-sm'>2 декабря 2025</p>
                    <p className='text-[#444444] leading-[120%] mb-4'>Покупал здесь iPhone. Всё прошло отлично: быстро ответили, подробно проконсультировали и помогли выбрать модель. Телефон полностью оригинальный, в идеальном состоянии. Доставили в тот же день по Санкт-Петербургу. Очень доволен покупкой, буду рекомендовать магазин знакомым.</p>
                    <Image src={'/icons/reviws.svg'} alt="Review" width={70} height={20} className='object-cover rounded-[20px]' />
                </div>
                <div className="col-span-4 flex justify-center gap-x-2">
                    <div className='bg-[#D4A63A] h-2.5 w-10 rounded-sm'></div>
                    <div className='bg-[#FFFFFF] h-2.5 w-2.5 rounded-sm'></div>
                    <div className='bg-[#FFFFFF] h-2.5 w-2.5 rounded-sm'></div>
                    <div className='bg-[#FFFFFF] h-2.5 w-2.5 rounded-sm'></div>
                </div>
            </div>

        </div>
    )
}
