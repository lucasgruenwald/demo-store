import { createContext, useState, useEffect } from 'react';

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
    cartItemCount: 0,
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    const [cartItems, setCartItems] = useState([]);

    const [cartItemCount, setCartItemCount] = useState(0);

    useEffect(() => {
        const count = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity, 0
        );
        
        setCartItemCount(count);
    }, [cartItems]);

    const addItemToCart = (product) => setCartItems(addCartItem(cartItems, product));

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartItemCount, };

    return(
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};