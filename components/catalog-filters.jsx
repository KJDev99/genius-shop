'use client'

import React, { useState } from 'react'

function CheckboxItem({ label, checked, onChange, swatch }) {
    return (
        <label className="flex items-center gap-3 cursor-pointer text-[#444444] text-base py-1 hover:text-[#222222] transition-colors duration-150">
            <span
                className={`relative w-5 h-5 rounded-[4px] border-2 shrink-0 transition-colors duration-150 ${checked
                    ? 'bg-[#D4A63A] border-[#D4A63A]'
                    : 'border-[#D4D4D4] bg-white'
                    }`}
            >
                {checked && (
                    <svg
                        className="absolute inset-0 m-auto"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                    >
                        <path
                            d="M2 6l3 3 5-6"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )}
            </span>
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="hidden"
            />
            {swatch && (
                <span
                    className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                    style={{ backgroundColor: swatch }}
                />
            )}
            {label}
        </label>
    )
}

function FilterSection({ title, children, defaultOpen = true }) {
    const [open, setOpen] = useState(defaultOpen)
    return (
        <div className="border-b border-[#F4F4FA] last:border-b-0 pb-4 mb-4 last:mb-0 last:pb-0">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="flex items-center justify-between w-full text-[#222222] font-semibold text-lg mb-3"
            >
                {title}
                <span className="text-[#888888] text-xl select-none">
                    {open ? '−' : '+'}
                </span>
            </button>
            {open && <div className="flex flex-col gap-2">{children}</div>}
        </div>
    )
}

// `value` is the parent's activeFilters object: { conditionIds, memoryIds, colorIds, priceMin, priceMax }.
// Checkbox toggles fire onChange immediately (live filtering → backend request).
// Price is applied via the "Применить" button (also closes the mobile drawer).
export default function CatalogFilters({ options, value, onChange, onApply, onReset }) {
    const { conditions = [], memories = [], colors = [] } = options || {}
    const conditionIds = value?.conditionIds || []
    const memoryIds = value?.memoryIds || []
    const colorIds = value?.colorIds || []

    const [priceFrom, setPriceFrom] = useState('')
    const [priceTo, setPriceTo] = useState('')

    function toggleId(key, current, id) {
        const exists = current.includes(id)
        const next = exists
            ? current.filter((x) => x !== id)
            : [...current, id]
        onChange?.({ [key]: next })
    }

    function reset() {
        setPriceFrom('')
        setPriceTo('')
        onReset?.()
    }

    function apply() {
        onApply?.({
            priceMin: priceFrom === '' ? null : Number(priceFrom),
            priceMax: priceTo === '' ? null : Number(priceTo),
        })
    }

    return (
        <aside className="bg-white rounded-[20px] p-6 flex flex-col">
            <h2 className="text-[#222222] font-bold text-2xl mb-6">Фильтры</h2>

            <div className="grow flex flex-col">
                <FilterSection title="Цены">
                    <div className="flex gap-2">
                        <input
                            type="number"
                            placeholder="от"
                            value={priceFrom}
                            onChange={(e) => setPriceFrom(e.target.value)}
                            className="w-full h-11 px-3 rounded-[12px] bg-[#F4F4FA] outline-none text-[#222222] placeholder:text-[#888888] focus:ring-2 focus:ring-[#D4A63A]/30"
                        />
                        <input
                            type="number"
                            placeholder="до"
                            value={priceTo}
                            onChange={(e) => setPriceTo(e.target.value)}
                            className="w-full h-11 px-3 rounded-[12px] bg-[#F4F4FA] outline-none text-[#222222] placeholder:text-[#888888] focus:ring-2 focus:ring-[#D4A63A]/30"
                        />
                    </div>
                </FilterSection>

                {conditions.length > 0 && (
                    <FilterSection title="Состояние">
                        {conditions.map((c) => (
                            <CheckboxItem
                                key={c.id}
                                label={c.name}
                                checked={conditionIds.includes(c.id)}
                                onChange={() =>
                                    toggleId('conditionIds', conditionIds, c.id)
                                }
                            />
                        ))}
                    </FilterSection>
                )}

                {memories.length > 0 && (
                    <FilterSection title="Память">
                        {memories.map((m) => (
                            <CheckboxItem
                                key={m.id}
                                label={m.name}
                                checked={memoryIds.includes(m.id)}
                                onChange={() =>
                                    toggleId('memoryIds', memoryIds, m.id)
                                }
                            />
                        ))}
                    </FilterSection>
                )}

                {colors.length > 0 && (
                    <FilterSection title="Цвет">
                        <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
                            {colors.map((c) => (
                                <CheckboxItem
                                    key={c.id}
                                    label={c.name}
                                    swatch={c.hex}
                                    checked={colorIds.includes(c.id)}
                                    onChange={() =>
                                        toggleId('colorIds', colorIds, c.id)
                                    }
                                />
                            ))}
                        </div>
                    </FilterSection>
                )}
            </div>

            <div className="flex gap-3 mt-6 pt-6 border-t border-[#F4F4FA]">
                <button
                    type="button"
                    onClick={reset}
                    className="flex-1 h-12 rounded-[12px] bg-[#F4F4FA] text-[#444444] font-medium hover:bg-[#EAEAF2] transition-colors duration-150"
                >
                    Сбросить
                </button>
                <button
                    type="button"
                    onClick={apply}
                    className="flex-1 h-12 rounded-[12px] bg-[#D4A63A] text-[#222222] font-semibold hover:brightness-95 active:brightness-90 transition"
                >
                    Применить
                </button>
            </div>
        </aside>
    )
}
