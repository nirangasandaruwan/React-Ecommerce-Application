import CartActionTypes from './cart.types.js';


export const toggleCartHidden = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN
});


export const addItem = item => ({
type: CartActionTypes.ADD_ITEM,
payload: item

});


export const removeItem = item => ({

    type: CartActionTypes.REMOVE_ITEM,
    payload: item

});

export const clearItemFromCart = item => ({

    type: CartActionTypes.CLEAR_ITEM_FROM_CAR,
    payload: item

});


export const clearCart = () => ({

    type: CartActionTypes.CLEAR_CART
});