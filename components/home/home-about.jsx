import Image from 'next/image'
import React from 'react'

export default function HomeAbout() {
    return (
        <div className='mt-20'>
            <div className='md:w-360 mx-auto  rounded-[20px] bg-white flex items-center bg-[url(/imgs/homeabout.png)] h-[734px] bg-cover bg-center'>
                <div className='flex flex-col items-end  w-full pr-10'>
                    <div className="max-w-[638px] px-6 py-4 rounded-[20px] bg-[#FFFFFF1A] text-white mb-6">
                        <h2 className='text-[50px] font-bold mb-6'>О компании</h2>
                        <p className='text-lg font-medium mb-6'>Genius Store — магазин оригинальной техники Apple.
                            Мы предлагаем только проверенные устройства: iPhone, AirPods, Apple Watch и другую технику Apple. Каждое устройство проходит диагностику перед продажей, поэтому вы получаете полностью исправную и качественную технику.</p>
                        <button className='bg-[#FFFFFF] w-[228px] h-[56px] rounded-[20px] text-[#222222] flex items-center justify-center '>
                            <p className='text-lg font-semibold'>Подробнее</p>
                            <Image src={'/icons/arrow-narrow-right.svg'} alt="Logo" width={24} height={24} className='ml-4' />
                        </button>
                    </div>
                    <div className="max-w-[638px] px-6 py-4 rounded-[20px] bg-[#FFFFFF] text-black">
                        <h2 className='text-[50px] font-bold mb-6'>Сервис и гарантия</h2>
                        <p className='text-lg font-medium mb-6'>Мы не только продаём технику, но и занимаемся её ремонтом.
                            Наш специалист может приехать к вам в удобное время и место, чтобы забрать устройство.</p>
                        <button className='bg-[#D4A63A] w-[228px] h-[56px] rounded-[20px] text-[#222222] flex items-center justify-center '>
                            <p className='text-lg font-semibold'>Подробнее</p>
                            <Image src={'/icons/arrow-narrow-right.svg'} alt="Logo" width={24} height={24} className='ml-4' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
