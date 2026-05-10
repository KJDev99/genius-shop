import Image from 'next/image'
import React from 'react'

export default function HomeNews() {
    return (
        <div className='md:w-360 mx-auto'>
            <div className="flex justify-between items-center">
                <h2 className='text-[#222222] font-bold text-[50px]'>Новости</h2>
                <button className='bg-[#D4A63A] w-50 h-15 rounded-[20px] text-[#222222] flex items-center justify-center'>
                    <p className='text-lg font-semibold'>Все новости</p>
                    <Image src={'/icons/arrow-narrow-right.svg'} alt="Logo" width={24} height={24} className='ml-2.5' />
                </button>
            </div>
            <div className="grid grid-cols-4 gap-6 mb-6 mt-8">
                <div className="rounded-[20px] bg-white">
                    <Image src={'/imgs/news.png'} alt="News Image" width={355} height={200} className='object-cover rounded-t-[20px]' />
                    <div className="flex justify-between px-4 mt-4">
                        <h2 className='text-[#222222] font-bold text-xl h-[54px] overflow-hidden line-clamp-2'>Новый iPhone уже в продаже</h2>
                    </div>
                    <p className='text-[#444444] leading-[120%] mb-4 px-4'>23.02.2026</p>
                </div>
                <div className="rounded-[20px] bg-white">
                    <Image src={'/imgs/news.png'} alt="News Image" width={355} height={200} className='object-cover rounded-t-[20px]' />
                    <div className="flex justify-between px-4 mt-4">
                        <h2 className='text-[#222222] font-bold text-xl h-[54px] overflow-hidden line-clamp-2'>Новый iPhone уже в продаже</h2>
                    </div>
                    <p className='text-[#444444] leading-[120%] mb-4 px-4'>23.02.2026</p>
                </div>
                <div className="rounded-[20px] bg-white">
                    <Image src={'/imgs/news.png'} alt="News Image" width={355} height={200} className='object-cover rounded-t-[20px]' />
                    <div className="flex justify-between px-4 mt-4">
                        <h2 className='text-[#222222] font-bold text-xl h-[54px] overflow-hidden line-clamp-2'>Новый iPhone уже в продаже</h2>
                    </div>
                    <p className='text-[#444444] leading-[120%] mb-4 px-4'>23.02.2026</p>
                </div>
                <div className="rounded-[20px] bg-white">
                    <Image src={'/imgs/news.png'} alt="News Image" width={355} height={200} className='object-cover rounded-t-[20px]' />
                    <div className="flex justify-between px-4 mt-4">
                        <h2 className='text-[#222222] font-bold text-xl h-[54px] overflow-hidden line-clamp-2'>Новый iPhone уже в продаже</h2>
                    </div>
                    <p className='text-[#444444] leading-[120%] mb-4 px-4'>23.02.2026</p>
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
