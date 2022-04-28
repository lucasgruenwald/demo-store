import { createContext, useState, useReducer } from 'react';

import { createAction } from '../utils/reducer/reducer.utils'

function existingCartItem(cartItems, productToAdd){
    return cartItems.find((cartItem) => cartItem.id === productToAdd.id)
}

const addCartItem = (cartItems, productToAdd) => {
    // increment by 1 if you already have item in cart
    if (existingCartItem(cartItems, productToAdd)){
        return( cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id 
            ? 
            { ...cartItem, quantity: cartItem.quantity + 1 }
            :
            cartItem
            )
        )
    }

    // if first of item, set quantity to 1
    return [...cartItems, {...productToAdd, quantity: 1 }];
}

const removeCartItem = (cartItems, productToRemove) => {
        // double check item exists in cart, either reduce count or remove item.
        let item = existingCartItem(cartItems, productToRemove)

        if (item.quantity > 1){
            return( cartItems.map((cartItem) => 
                cartItem.id === productToRemove.id 
                ? 
                { ...cartItem, quantity: cartItem.quantity - 1 }
                :
                cartItem
                )
            )
        } else if (item.quantity === 1){
            return( cartItems.filter((cartItem) => 
                cartItem.id !== productToRemove.id 
                )
            )
        } else {
            alert('You already removed this item');
        }
}

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
}


/////////////////////

  
const CART_ACTION_TYPES = {
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_CART_COUNT: 'SET_CART_COUNT',
    SET_CART_TOTAL: 'SET_CART_TOTAL',
  };
  
  const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
  }
  
  const cartReducer = (state, action) => {

    const { type, payload } = action;
  
    switch (type) {
      case CART_ACTION_TYPES.SET_CART_ITEMS:
        return {
          ...state,
          ...payload,
        };
      default:
        throw new Error(`Unhandled type ${type} in cartReducer`);
    }
  };


/////////////////////


export const CartContext = createContext({
    isCartOpen: false,
    setIsOpen: () => { },
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartItemCount: 0,
    cartTotal: 0,
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);


    const [{ cartCount, cartTotal, cartItems }, dispatch] = useReducer(
        cartReducer,
        INITIAL_STATE
      );
    
    const updateCartItemsReducer = (cartItems) => {
        const newCartCount = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity, 0
        );

        const newCartTotal = cartItems.reduce(
          (total, cartItem) => total + cartItem.quantity * cartItem.price,
          0
        );
        
        const payload = {
            cartItems, 
            cartCount: newCartCount, 
            cartTotal: newCartTotal,
        }

        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload));
    }

    const addItemToCart = (item) => {
        const newItems = addCartItem(cartItems, item);
        updateCartItemsReducer(newItems);
    } 

    const removeItemFromCart = (item) => {
        const newItems = removeCartItem(cartItems, item);
        updateCartItemsReducer(newItems);
    } 

    const clearItemFromCart = (item) => {
        const newItems = clearCartItem(cartItems, item);
        updateCartItemsReducer(newItems);
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart,
        cartItems, cartCount, cartTotal, };

    return(
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};