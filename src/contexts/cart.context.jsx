import { createContext, useState, useEffect } from 'react';

function existingCartItem(cartItems, productToAdd){
    return cartItems.find((cartItem) => cartItem.id === productToAdd.id)
}

export const addCartItem = (cartItems, productToAdd) => {
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

export const removeCartItem = (cartItems, productToRemove) => {
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


export const CartContext = createContext({
    isCartOpen: false,
    setIsOpen: () => { },
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    cartItemCount: 0,
    cartTotal: 0,
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    const [cartItems, setCartItems] = useState([]);

    const [cartItemCount, setCartItemCount] = useState(0);

    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const count = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity, 0
        );
        
        setCartItemCount(count);
    }, [cartItems]);

    useEffect(() => {
        const newCartTotal = cartItems.reduce(
          (total, cartItem) => total + cartItem.quantity * cartItem.price,
          0
        );
        setCartTotal(newCartTotal);
      }, [cartItems]);

    const addItemToCart = (product) => setCartItems(addCartItem(cartItems, product));

    const removeItemFromCart = (product) => setCartItems(removeCartItem(cartItems, product));

    const value = { isCartOpen, setIsCartOpen, cartItems, 
        addItemToCart, removeItemFromCart, cartItemCount, cartTotal, };

    return(
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};