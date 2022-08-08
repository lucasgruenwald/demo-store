import { createAction, withMatcher, ActionWithPayload } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES, CartItem  } from './cart.types';
import { CategoryItem } from "../categories/categories.types";

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
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

const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem): CartItem[] => {
  const cartItemFound = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (cartItemFound && cartItemFound.quantity === 1) {
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

const clearCartItem = (cartItems: CartItem[], cartItemToClear: CartItem): CartItem[] =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);


export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;
export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => 
  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems));

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;
export const setIsCartOpen = withMatcher((boolean: boolean): SetIsCartOpen =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean));


export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
  const newCart = addCartItem(cartItems, productToAdd);
  return setCartItems(newCart);
};

export const removeItemFromCart = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
  const newCart = removeCartItem(cartItems, cartItemToRemove);
  return setCartItems(newCart);
};

export const clearItemFromCart = (cartItems: CartItem[], cartItemToClear: CartItem) => {
  const newCart = clearCartItem(cartItems, cartItemToClear);
  return setCartItems(newCart);
};
  