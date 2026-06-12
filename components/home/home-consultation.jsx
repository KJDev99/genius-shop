import React from 'react'
import ConsultationButton from '@/components/consultation-modal'

export default function HomeConsultation() {
    return (
        <div className="px-4 lg:px-0 mt-6 mb-20 max-md:mb-10 ">
            <div
                className="lg:w-360 mx-auto rounded-[20px] bg-white flex items-center bg-cover bg-center h-[320px] sm:h-[360px] lg:h-[400px]"
                style={{ backgroundImage: 'url(/imgs/consultation.webp)' }}
            >
                <div className="flex flex-col items-center w-full px-4 text-center">
                    <h2 className="text-[28px] sm:text-[40px] lg:text-[50px] font-semibold text-white leading-tight">
                        Не знаете, какую модель выбрать?
                    </h2>
                    <p className="text-white font-medium text-base lg:text-[20px] mt-3 mb-6">
                        Наши специалисты помогут подобрать идеальное устройство.
                    </p>
                    <ConsultationButton className="bg-white w-[260px] max-md:w-full lg:w-[300px] h-[52px] lg:h-[60px] rounded-[20px] text-[#222222] flex items-center justify-center hover:bg-[#D4A63A] transition-colors duration-200">
                        <p className="text-base lg:text-lg font-semibold">Получить консультацию</p>
                    </ConsultationButton>
                </div>
            </div>
        </div>
    )
}
