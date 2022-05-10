import { createSelector } from "reselect";

const selectCartReducer = (state) => state.cart;

// use reselect to memoize if inputs pass strict equality 

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.selectIsCartOpen
);

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total, cartItem) => total + (cartItem.quantity * cartItem.price), 0
  )
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);