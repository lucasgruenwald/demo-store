import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as Sentry from "@sentry/react";
import { selectCurrentUser } from '../../store/user/user.selector';
import { signOutStart } from "../../store/user/user.action";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'

import './navigation.styles.scss'

const Navigation = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);

    const signOutUser = () => {
      Sentry.addBreadcrumb({
        category: "auth",
        message: "Custom Breadcrumb: Clicked Sign Out",
      });
      dispatch(signOutStart());
    }

    return(
      <Fragment>
  
        <div className='navigation'>
            <Link className='logo-container' to='/'>
                <img alt="dog logo" style={{"width": "50px"}} src="https://cdn.shopify.com/s/files/1/0280/2145/6994/products/GolderRetriever_300x300.png?v=1610292518"/>
            </Link>



            <div className='nav-links-container'>
              <Link className='nav-link shop-link' to='/shop'>
                SHOP
              </Link>
              { currentUser ? (
                <Link className='nav-link signout-link' to='/' onClick={signOutUser}>
                SIGN OUT
                </Link>
              ):(
                <Link className='nav-link signin-link' to='/sign-in'>
                SIGN IN
                </Link>
              )}
              <CartIcon/>
            </div>
            {isCartOpen && <CartDropdown /> }
        </div>
  
        <Outlet />
  
      </Fragment>
    )
}

export default Navigation;