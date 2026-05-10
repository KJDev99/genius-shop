import Image from 'next/image'
import React from 'react'

export default function Hero() {
    return (
        <div className='my-6'>
            <div className='md:w-360 mx-auto  rounded-[20px] bg-white flex items-center bg-[url(/imgs/hero.png)] h-[600px] bg-cover bg-center'>
                <div className='flex flex-col pl-10'>
                    <h1 className='text-[64px] font-semibold text-white'>IPHONE 17 PRO MAX</h1>
                    <p className='text-white text-[24px] mb-6'>Новый уровень мощности, камеры и скорости.</p>
                    <button className='bg-[#FFFFFF] w-[300px] h-[60px] rounded-[20px] text-[#222222] flex items-center justify-center '>
                        <p className='text-lg font-semibold'>Смотреть каталог</p>
                        <Image src={'/icons/arrow-narrow-right.svg'} alt="Logo" width={24} height={24} className='ml-4' />
                    </button>
                </div>
            </div>
        </div>
    )
}
