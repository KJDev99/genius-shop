import Image from 'next/image'
import React from 'react'

export default function Navbar() {
  return (
    <div className='md:w-360 mx-auto p-6 rounded-[20px] bg-white my-6 '>
      <div className="flex gap-x-6 items-center">
        <Image src={'/icons/logo.svg'} alt="Logo" width={155} height={65} />
        <div className="flex bg-[#D4A63A] items-center gap-x-3 px-4 py-4 rounded-[20px]">
          <Image src={'/icons/catalog-icon.svg'} alt="Logo" width={24} height={24} />
          <p className='text-[#222222] text-lg font-semibold'>Каталог</p>
        </div>
        <div className="grow flex bg-[#F4F4FA] h-[52px] rounded-[12px]">
          <input type="text" placeholder='Найти товар' className='px-4 grow outline-none' />
          <button className='bg-[#D4A63A] w-[52px] h-[52px] rounded-[20px] flex items-center justify-center'>
            <Image src={'/icons/search-md.svg'} alt="Logo" width={24} height={24} />
          </button>
        </div>
        <button className='bg-[#D4A63A] w-[52px] h-[52px] rounded-[20px] flex items-center justify-center'>
          <Image src={'/icons/heart.svg'} alt="Logo" width={24} height={24} />
        </button>
        <button className='bg-[#D4A63A] w-[52px] h-[52px] rounded-[20px] flex items-center justify-center'>
          <Image src={'/icons/cart.svg'} alt="Logo" width={24} height={24} />
        </button>
      </div>
      <div className="flex justify-between mt-4">
        <ul className="flex gap-x-6">
          <li className="text-[#888888] text-sm">О нас</li>
          <li className="text-[#888888] text-sm">Трейд-ин</li>
          <li className="text-[#888888] text-sm">Сервис</li>
          <li className="text-[#888888] text-sm">Доставка</li>
          <li className="text-[#888888] text-sm">Новости</li>
          <li className="text-[#888888] text-sm">Отзывы</li>
          <li className="text-[#888888] text-sm">Гарантия</li>
          <li className="text-[#888888] text-sm">Рассрочка и кредит</li>
          <li className="text-[#888888] text-sm">Контакты</li>
        </ul>
        <div className="flex items-center gap-x-4">
          <a href="tel:+7 (969) 200-03-30" className='text-[#888888] text-sm'>
            +7 (969) 200-03-30
          </a>
          <button className='bg-[#D4A63A] h-6 w-6 rounded-[20px] text-white flex items-center justify-center'>
            <Image src={'/icons/telegram.svg'} alt="Logo" width={11} height={11} />
          </button>
          <button className='bg-[#D4A63A] h-6 w-6 rounded-[20px] text-white flex items-center justify-center'>
            <Image src={'/icons/vk.svg'} alt="Logo" width={11} height={11} />
          </button>
        </div>
      </div>
    </div>
  )
}
