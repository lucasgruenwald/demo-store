import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'

import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';

import * as Sentry from "@sentry/react";

import './cart-icon.styles.scss'

const CartIcon = () => {
    const dispatch = useDispatch();
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartItemCount = useSelector(selectCartCount);

    const toggleIsCartOpen = () => {
        dispatch(setIsCartOpen(!isCartOpen));

        Sentry.addBreadcrumb({
            category: "cart",
            message: "Custom Breadcrumb: Toggled cart",
        });
    }
    return(
        <div className='cart-icon-container' onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>{cartItemCount}</span>
        </div>
    );
};

export default CartIcon;