import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'

import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';

// import * as Sentry from "@sentry/react";

import './cart-icon.styles.scss'

const CartIcon = () => {
    const dispatch = useDispatch();
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartItemCount = useSelector(selectCartCount);

    const toggleIsCartOpen = () => {
        // Sentry.addBreadcrumb({
        //     category: "cart",
        //     message: "Custom Breadcrumb: Toggling Cart Preview",
        // });
        dispatch(setIsCartOpen(!isCartOpen));
    }
    
    return(
        <div aria-label="Cart Icon Button" className='cart-icon-container' onClick={toggleIsCartOpen}>
            <ShoppingIcon aria-label="Cart Icon Button" className='shopping-icon'/>
            <span aria-label="Cart Icon Button" className='item-count'>{cartItemCount}</span>
        </div>
    );
};

export default CartIcon;