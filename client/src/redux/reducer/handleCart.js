const cart = [];

const handleCart = (state = cart, action) => {
    const product = action.payload;
    const exist = state.find(p => p.id === product.id);
    switch (action.type) {
        case "ADD_TO_CART":
            if (exist) {
                // Increase the quantity
                return state.map(p => p.id === product.id ? {...p, qty: p.qty+1} : p);
            } else {
                // Add the product
                return [...state, {...product, qty: 1}];
            }
        case "REMOVE_FROM_CART":
            if (exist.qty === 1) {
                // Decrease the quantity
                return state.filter(p => p.id !== product.id);
            } else {
                // Decrease the quantity
                return state.map(p => p.id === product.id ? {...p, qty: p.qty-1} : p);
            }
        default:
            return state;
    }
}

export default handleCart;