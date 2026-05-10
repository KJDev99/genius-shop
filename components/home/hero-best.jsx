import Image from 'next/image'
import React from 'react'

export default function HeroBest() {
    return (
        <div className='md:w-360 mx-auto mb-20'>
            <h2 className='text-[#222222] font-bold text-[50px] mb-8'>Хиты продаж</h2>
            <div className="grid grid-cols-4 gap-6">
                <div className="bg-white rounded-[20px] p-4 relative">
                    <Image src={'/icons/heartpr.svg'} alt="Heart" width={42} height={42} className="absolute top-4 right-4" />
                    <Image src={'/imgs/product.png'} alt="Best 1" width={300} height={300} />
                    <div className="flex justify-center gap-x-2 mt-2">
                        <div className="h-0.5 w-4 rounded-[2px] bg-[#D4A63A]"></div>
                        <div className="h-0.5 w-4 rounded-[2px] bg-[#F4F4FA]"></div>
                        <div className="h-0.5 w-4 rounded-[2px] bg-[#F4F4FA]"></div>
                    </div>
                    <h3 className='text-[#222222] text-lg font-medium mt-4'>Apple iPhone 17 256Gb Black eSim</h3>
                    <div className="flex justify-between items-center mt-4">
                        <span className='text-[#D4A63A] text-[28px] font-bold'>63 299 ₽</span>
                        <button className='bg-[#D4A63A] font-medium text-[#222222] px-4 py-2 rounded-[20px]'>
                            <Image src={'/icons/cart.svg'} alt="Cart" width={24} height={24} className='inline-block mr-2' />
                            В корзину
                        </button>
                    </div>
                </div>
                <div className="bg-white rounded-[20px] p-4 relative">
                    <Image src={'/icons/heartpr.svg'} alt="Heart" width={42} height={42} className="absolute top-4 right-4" />
                    <Image src={'/imgs/product.png'} alt="Best 1" width={300} height={300} />
                    <div className="flex justify-center gap-x-2 mt-2">
                        <div className="h-0.5 w-4 rounded-[2px] bg-[#D4A63A]"></div>
                        <div className="h-0.5 w-4 rounded-[2px] bg-[#F4F4FA]"></div>
                        <div className="h-0.5 w-4 rounded-[2px] bg-[#F4F4FA]"></div>
                    </div>
                    <h3 className='text-[#222222] text-lg font-medium mt-4'>Apple iPhone 17 256Gb Black eSim</h3>
                    <div className="flex justify-between items-center mt-4">
                        <span className='text-[#D4A63A] text-[28px] font-bold'>63 299 ₽</span>
                        <button className='bg-[#D4A63A] font-medium text-[#222222] px-4 py-2 rounded-[20px]'>
                            <Image src={'/icons/cart.svg'} alt="Cart" width={24} height={24} className='inline-block mr-2' />
                            В корзину
                        </button>
                    </div>
                </div>
                <div className="bg-white rounded-[20px] p-4 relative">
                    <Image src={'/icons/heartpr.svg'} alt="Heart" width={42} height={42} className="absolute top-4 right-4" />
                    <Image src={'/imgs/product.png'} alt="Best 1" width={300} height={300} />
                    <div className="flex justify-center gap-x-2 mt-2">
                        <div className="h-0.5 w-4 rounded-[2px] bg-[#D4A63A]"></div>
                        <div className="h-0.5 w-4 rounded-[2px] bg-[#F4F4FA]"></div>
                        <div className="h-0.5 w-4 rounded-[2px] bg-[#F4F4FA]"></div>
                    </div>
                    <h3 className='text-[#222222] text-lg font-medium mt-4'>Apple iPhone 17 256Gb Black eSim</h3>
                    <div className="flex justify-between items-center mt-4">
                        <span className='text-[#D4A63A] text-[28px] font-bold'>63 299 ₽</span>
                        <button className='bg-[#D4A63A] font-medium text-[#222222] px-4 py-2 rounded-[20px]'>
                            <Image src={'/icons/cart.svg'} alt="Cart" width={24} height={24} className='inline-block mr-2' />
                            В корзину
                        </button>
                    </div>
                </div>
                <div className="bg-white rounded-[20px] p-4 relative">
                    <Image src={'/icons/heartpr.svg'} alt="Heart" width={42} height={42} className="absolute top-4 right-4" />
                    <Image src={'/imgs/product.png'} alt="Best 1" width={300} height={300} />
                    <div className="flex justify-center gap-x-2 mt-2">
                        <div className="h-0.5 w-4 rounded-[2px] bg-[#D4A63A]"></div>
                        <div className="h-0.5 w-4 rounded-[2px] bg-[#F4F4FA]"></div>
                        <div className="h-0.5 w-4 rounded-[2px] bg-[#F4F4FA]"></div>
                    </div>
                    <h3 className='text-[#222222] text-lg font-medium mt-4'>Apple iPhone 17 256Gb Black eSim</h3>
                    <div className="flex justify-between items-center mt-4">
                        <span className='text-[#D4A63A] text-[28px] font-bold'>63 299 ₽</span>
                        <button className='bg-[#D4A63A] font-medium text-[#222222] px-4 py-2 rounded-[20px]'>
                            <Image src={'/icons/cart.svg'} alt="Cart" width={24} height={24} className='inline-block mr-2' />
                            В корзину
                        </button>
                    </div>
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
