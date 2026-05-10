import Image from 'next/image'
import React from 'react'

export default function HeroServices() {
    return (
        <div className='md:w-360 mx-auto grid grid-cols-4 gap-x-6 mb-20'>
            <div className='flex flex-col rounded-[20px] bg-white p-4'>
                <Image src={'/imgs/heroservices1.png'} alt="Service 1" width={82} height={82} />
                <h2 className='my-4 text-[#222222] text-[20px] font-semibold'>Гарантия магазина</h2>
                <p className='text-[#444444] text-lg leading-[120%] line-clamp-2'>Предоставляем гарантию до 365 дней на технику.</p>
            </div>
            <div className='flex flex-col rounded-[20px] bg-white p-4'>
                <Image src={'/imgs/heroservices2.png'} alt="Service 1" width={82} height={82} />
                <h2 className='my-4 text-[#222222] text-[20px] font-semibold'>Выездной сервис</h2>
                <p className='text-[#444444] text-lg leading-[120%] line-clamp-2'>Наш специалист приедет в удобное время и место.</p>
            </div>
            <div className='flex flex-col rounded-[20px] bg-white p-4'>
                <Image src={'/imgs/heroservices3.png'} alt="Service 1" width={82} height={82} />
                <h2 className='my-4 text-[#222222] text-[20px] font-semibold'>Быстрая доставка</h2>
                <p className='text-[#444444] text-lg leading-[120%] line-clamp-2'>Доставка по Санкт-Петербургу в день заказа или самовывоз..</p>
            </div>
            <div className='flex flex-col rounded-[20px] bg-white p-4'>
                <Image src={'/imgs/heroservices4.png'} alt="Service 1" width={82} height={82} />
                <h2 className='my-4 text-[#222222] text-[20px] font-semibold'>Trade-in техники</h2>
                <p className='text-[#444444] text-lg leading-[120%] line-clamp-2'>Обменяйте старое устройство на новое с выгодой.</p>
            </div>
        </div>
    )
}
