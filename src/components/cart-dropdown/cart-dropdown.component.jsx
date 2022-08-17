import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectCartItems, selectIsCartOpen } from '../../store/cart/cart.selector'
import { setIsCartOpen } from '../../store/cart/cart.action';

import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'

// import * as Sentry from "@sentry/react";

import './cart-dropdown.styles.scss'

const CartDropdown = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartItems = useSelector(selectCartItems);

    const goToCheckoutHandler = () => {
        // Sentry.addBreadcrumb({
        //     category: "cart",
        //     message: "Custom Breadcrumb: Going To Checkout & Closing Preview",
        // });
        toggleIsCartOpen();
        navigate('/checkout');
    }

    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

    return(
    <div className='cart-dropdown-container'>
        <div className='cart-items'>
            {cartItems.length ? 
            (cartItems.map((cartItem) => (
                <CartItem key={cartItem.id} cartItem={cartItem} /> 
            )))
            :
            (<span className='empty-message'>Your cart is empty 🙁 </span>)
            }
        </div>
        <Button aria-label="Dropdown Checkout Button" onClick={goToCheckoutHandler}>Checkout</Button>
    </div>
    )
};

export default CartDropdown;
