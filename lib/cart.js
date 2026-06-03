// Shared cart + wishlist helpers backed by localStorage.
// Item shapes match those used by components/product-card.jsx and the basket page.

export function getCart() {
    try {
        return JSON.parse(localStorage.getItem('cart') || '[]')
    } catch {
        return []
    }
}

export function getWishlist() {
    try {
        return JSON.parse(localStorage.getItem('wishlist') || '[]')
    } catch {
        return []
    }
}

export function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('cart-updated'))
}

export function updateCartQuantity(variantId, quantity) {
    const cart = getCart().map((i) =>
        i.variantId === variantId ? { ...i, quantity: Math.max(1, quantity) } : i
    )
    setCart(cart)
}

// Removes one or more items by variantId.
export function removeFromCart(variantIds) {
    const ids = Array.isArray(variantIds) ? variantIds : [variantIds]
    const cart = getCart().filter((i) => !ids.includes(i.variantId))
    setCart(cart)
}

export function isInCart(variantId) {
    return getCart().some((item) => item.variantId === variantId)
}

export function isInWishlist(productId) {
    return getWishlist().some((item) => item.productId === productId)
}

// Adds the item if absent, removes it if already present. Returns true when added.
export function toggleCart(item) {
    const cart = getCart()
    const idx = cart.findIndex((i) => i.variantId === item.variantId)
    if (idx !== -1) {
        cart.splice(idx, 1)
    } else {
        cart.push({ quantity: 1, ...item })
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('cart-updated'))
    return idx === -1
}

export function clearWishlist() {
    localStorage.setItem('wishlist', '[]')
    window.dispatchEvent(new Event('wishlist-updated'))
}

// Toggles a product in the wishlist (keyed by productId). Returns true when added.
export function toggleWishlist(item) {
    const list = getWishlist()
    const idx = list.findIndex((i) => i.productId === item.productId)
    if (idx !== -1) {
        list.splice(idx, 1)
    } else {
        list.push(item)
    }
    localStorage.setItem('wishlist', JSON.stringify(list))
    window.dispatchEvent(new Event('wishlist-updated'))
    return idx === -1
}
