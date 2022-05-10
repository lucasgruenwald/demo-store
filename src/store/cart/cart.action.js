import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from './cart.types';

const addCartItem = (cartItems, productToAdd) => {
  const cartItemFound = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  // simply increase quantity if already in cart
  if (cartItemFound) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id ? 
      { ...cartItem, quantity: cartItem.quantity + 1 }
      : 
      cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  const cartItemFound = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (cartItemFound.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // decrease quantity instead if there is more than one of them
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id ? 
    { ...cartItem, quantity: cartItem.quantity - 1 }
    : 
    cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const addItemToCart = (cartItems, productToAdd) => {
  const newCart = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCart);
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const newCart = removeCartItem(cartItems, cartItemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCart);
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
  const newCart = clearCartItem(cartItems, cartItemToClear);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCart);
};

export const setIsCartOpen = (boolean) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);
  