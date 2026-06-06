'use client'

import { useEffect, useState } from 'react'
import { getCart } from '@/lib/cart'

// Total number of products in the cart (sum of quantities).
// Re-reads on every `cart-updated` event (same tab) and `storage` event
// (other tabs), so the badge updates instantly when an item is added/removed.
export function useCartCount() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        function update() {
            const cart = getCart()
            setCount(cart.reduce((sum, item) => sum + (item.quantity || 1), 0))
        }
        update()
        window.addEventListener('cart-updated', update)
        window.addEventListener('storage', update)
        return () => {
            window.removeEventListener('cart-updated', update)
            window.removeEventListener('storage', update)
        }
    }, [])

    return count
}
