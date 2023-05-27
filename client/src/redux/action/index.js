// Add product to cart
export const addToCart = (product) => {
    return {
        type: "ADD_TO_CART",
        payload: product
    }
}

// Delete product to cart
export const removeFromCart = (product) => {
    return {
        type: "REMOVE_FROM_CART",
        payload: product
    }
}