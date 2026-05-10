import Image from 'next/image'
import React from 'react'

export default function HomeVideo() {
    return (
        <div className='md:w-360 mx-auto'>
            <div className="flex justify-between items-center">
                <h2 className='text-[#222222] font-bold text-[50px]'>Видео-отзывы</h2>
                <button className='bg-[#D4A63A] w-50 h-15 rounded-[20px] text-[#222222] flex items-center justify-center'>
                    <p className='text-lg font-semibold'>Все отзывы</p>
                    <Image src={'/icons/arrow-narrow-right.svg'} alt="Logo" width={24} height={24} className='ml-2.5' />
                </button>
            </div>
            <div className="grid grid-cols-4 gap-6 mb-6 mt-8">
                <div className="rounded-[20px] bg-white">
                    <Image src={'/imgs/videoizoh.png'} alt="Video Review" width={355} height={200} className='object-cover rounded-t-[20px]' />
                    <div className="flex justify-between px-4 mt-4">
                        <h2 className='text-[#222222] font-bold text-xl'>Алексей</h2>
                        <div className="flex">
                            <p className='mb-4 text-[#888888] text-sm'>2 декабря 2025</p>
                        </div>
                    </div>
                    <p className='text-[#444444] leading-[120%] mb-4 px-4'>23.02.2026</p>
                </div>
                <div className="rounded-[20px] bg-white">
                    <Image src={'/imgs/videoizoh.png'} alt="Video Review" width={355} height={200} className='object-cover rounded-t-[20px]' />
                    <div className="flex justify-between px-4 mt-4">
                        <h2 className='text-[#222222] font-bold text-xl'>Алексей</h2>
                        <div className="flex">
                            <p className='mb-4 text-[#888888] text-sm'>2 декабря 2025</p>
                        </div>
                    </div>
                    <p className='text-[#444444] leading-[120%] mb-4 px-4'>23.02.2026</p>
                </div>
                <div className="rounded-[20px] bg-white">
                    <Image src={'/imgs/videoizoh.png'} alt="Video Review" width={355} height={200} className='object-cover rounded-t-[20px]' />
                    <div className="flex justify-between px-4 mt-4">
                        <h2 className='text-[#222222] font-bold text-xl'>Алексей</h2>
                        <div className="flex">
                            <p className='mb-4 text-[#888888] text-sm'>2 декабря 2025</p>
                        </div>
                    </div>
                    <p className='text-[#444444] leading-[120%] mb-4 px-4'>23.02.2026</p>
                </div>
                <div className="rounded-[20px] bg-white">
                    <Image src={'/imgs/videoizoh.png'} alt="Video Review" width={355} height={200} className='object-cover rounded-t-[20px]' />
                    <div className="flex justify-between px-4 mt-4">
                        <h2 className='text-[#222222] font-bold text-xl'>Алексей</h2>
                        <div className="flex">
                            <p className='mb-4 text-[#888888] text-sm'>2 декабря 2025</p>
                        </div>
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
