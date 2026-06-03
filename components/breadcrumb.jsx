import Link from 'next/link'
import React from 'react'

export default function Breadcrumb({ items }) {
    return (
        <nav className="flex flex-wrap items-center gap-x-2 text-sm text-[#888888]">
            {items.map((item, idx) => {
                const isLast = idx === items.length - 1
                return (
                    <React.Fragment key={item.href || item.name}>
                        {item.href && !isLast ? (
                            <Link
                                href={item.href}
                                className="hover:text-[#222222] transition-colors duration-150"
                            >
                                {item.name}
                            </Link>
                        ) : (
                            <span className={isLast ? 'text-[#888888]' : ''}>
                                {item.name}
                            </span>
                        )}
                        {!isLast && <span className="text-[#888888]">•</span>}
                    </React.Fragment>
                )
            })}
        </nav>
    )
}
