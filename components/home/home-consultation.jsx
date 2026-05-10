import Image from 'next/image'
import React from 'react'

export default function HomeConsultation() {
    return (
        <div className='mt-6 mb-20'>
            <div className='md:w-360 mx-auto  rounded-[20px] bg-white flex items-center bg-[url(/imgs/consultation.png)] h-[400px] bg-cover bg-center'>
                <div className='flex flex-col items-center w-full'>
                    <h2 className='text-[50px] font-semibold text-white'>Не знаете, какую модель выбрать?</h2>
                    <p className='text-white font-medium text-[20px] mb-6'>Наши специалисты помогут подобрать идеальное устройство.</p>
                    <button className='bg-[#FFFFFF] w-[300px] h-[60px] rounded-[20px] text-[#222222] flex items-center justify-center '>
                        <p className='text-lg font-semibold'>Получить консультацию</p>
                    </button>
                </div>
            </div>
        </div>
    )
}
