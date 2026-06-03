import React from 'react'

const ICONS = {
    shield: (
        <path
            d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
            fill="#D4A63A"
        />
    ),
    pin: (
        <>
            <path
                d="M12 2c4 0 7 3 7 7 0 4.5-7 13-7 13S5 13.5 5 9c0-4 3-7 7-7z"
                fill="#D4A63A"
            />
            <circle cx="12" cy="9" r="2.4" fill="#fff" />
        </>
    ),
    truck: (
        <path
            d="M3 5h11v9H3V5zm11 3h4l3 3v3h-7V8zM7 18a2 2 0 100-4 2 2 0 000 4zm10 0a2 2 0 100-4 2 2 0 000 4z"
            fill="#D4A63A"
        />
    ),
    refresh: (
        <path
            d="M5 12a7 7 0 0111.9-5H14V5h6v6h-2V8.5A7 7 0 015 12zm14 0a7 7 0 01-11.9 5H10v2H4v-6h2v2.5A7 7 0 0019 12z"
            fill="#D4A63A"
        />
    ),
}

const ADVANTAGES = [
    {
        icon: 'shield',
        title: 'Гарантия магазина',
        text: 'Предоставляем гарантию до 365 дней на технику.',
    },
    {
        icon: 'pin',
        title: 'Выездной сервис',
        text: 'Наш специалист приедет в удобное время и место.',
    },
    {
        icon: 'truck',
        title: 'Быстрая доставка',
        text: 'Доставка по Санкт-Петербургу в день заказа или самовывоз.',
    },
    {
        icon: 'refresh',
        title: 'Trade-in техники',
        text: 'Обменяйте старое устройство на новое с выгодой.',
    },
]

export default function Advantages() {
    return (
        <section>
            <h2 className="text-[#222222] font-bold text-[28px] sm:text-[36px] lg:text-[50px] mb-6 lg:mb-8">
                Наши преимущества
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
                {ADVANTAGES.map((a) => (
                    <div
                        key={a.title}
                        className="bg-white rounded-[20px] p-6 flex flex-col gap-4"
                    >
                        <span className="w-14 h-14 rounded-[16px] bg-[#D4A63A]/15 flex items-center justify-center">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                                {ICONS[a.icon]}
                            </svg>
                        </span>
                        <h3 className="text-[#222222] font-bold text-lg lg:text-xl">
                            {a.title}
                        </h3>
                        <p className="text-[#888888] text-sm lg:text-base leading-[150%]">
                            {a.text}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}
