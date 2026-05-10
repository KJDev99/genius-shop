import Image from 'next/image'
import React from 'react'

export default function Footer() {
    return (
        <div className='md:w-360 mx-auto'>
            <div className="p-6 bg-white grid grid-cols-[320px_1fr_1fr_1fr_320px] gap-x-10 rounded-[20px] mb-6">
                <div className="flex flex-col items-start">
                    <Image src={'/icons/logo.svg'} alt="Logo" width={247} height={103} className='mb-6' />
                    <p className='mb-3 text-[#888888] text-sm'>Политика конфиденциальности</p>
                    <p className='mb-3 text-[#888888] text-sm'>Пользовательское соглашение</p>
                    <p className='mb-3 text-[#888888] text-sm'>@Все права защищены</p>
                    <p className='mb-3 text-[#888888] text-sm'>Разработано в Usertech</p>
                </div>
                <div className="flex flex-col">
                    <h3 className='text-[#222222] font-bold mb-3'>Каталог</h3>
                    <p className='text-[#666666] mb-3'>Смартфоны</p>
                    <p className='text-[#666666] mb-3'>Планшеты</p>
                    <p className='text-[#666666] mb-3'>Ноутбуки </p>
                    <p className='text-[#666666] mb-3'>Смарт-часы</p>
                    <p className='text-[#666666] mb-3'>Dyson</p>
                    <p className='text-[#666666] mb-3'>БУ техника</p>
                    <p className='text-[#666666] mb-3'>Прочее</p>
                </div>
                <div className="flex flex-col">
                    <h3 className='text-[#222222] font-bold mb-3'>Услуги</h3>
                    <p className='text-[#666666] mb-3'>Трейд-ин</p>
                    <p className='text-[#666666] mb-3'>Сервис</p>
                </div>
                <div className="flex flex-col">
                    <h3 className='text-[#222222] font-bold mb-3'>Информация</h3>
                    <p className='text-[#666666] mb-3'>О нас</p>
                    <p className='text-[#666666] mb-3'>Сервис</p>
                    <p className='text-[#666666] mb-3'>Доставка</p>
                    <p className='text-[#666666] mb-3'>Новости</p>
                    <p className='text-[#666666] mb-3'>Отзывы</p>
                    <p className='text-[#666666] mb-3'>Гарантия</p>
                    <p className='text-[#666666] mb-3'>Рассрочка и кредит</p>
                    <p className='text-[#666666] mb-3'>Контакты</p>
                </div>
                <div className="flex flex-col items-center">
                    <h2 className='text-[32px] font-bold mb-3 text-[#222222] '>+7 (966)-861-52-42</h2>
                    <p className='text-[#222222] text-lg font-semibold my-3'>info@Geniusstorerf.ru</p>
                    <p className='text-[#222222] text-lg font-semibold text-center leading-[100%] '>Санкт-Петербург, <br />
                        Невский проспект 32-34
                    </p>
                    <div className="flex justify-center gap-x-6 mt-3">
                        <button className='bg-[#D4A63A] h-[62px] w-[62px] rounded-full text-white flex items-center justify-center'>
                            <Image src={'/icons/telegram.svg'} alt="Logo" width={30} height={30} />
                        </button>
                        <button className='bg-[#D4A63A] h-[62px] w-[62px] rounded-full text-white flex items-center justify-center'>
                            <Image src={'/icons/vk.svg'} alt="Logo" width={30} height={30} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
