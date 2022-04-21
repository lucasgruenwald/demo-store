import { createContext, useState } from 'react';

export const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    )

    // increment by 1 if you already have item in cart
    if (existingCartItem){
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

export const CartContext = createContext({
    isCartOpen: false,
    setIsOpen: () => { },
    cartItems: [],
    addItemToCart: () => {},
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (product) => setCartItems(addCartItem(cartItems, product));

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart };

    return(
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};