import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";
// import * as Sentry from "@sentry/react";
import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart } from '../../store/cart/cart.action';

import './product-card.styles.scss'

import Button from '../button/button.component';


const ProductCard = ({ product }) => {
 
    const { name, price, imageUrl} = product;
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const [buttonText, setButtonText] = useState("Add to cart")

    const addProductToCart = () => {
        // Sentry.addBreadcrumb({
        //     category: "cart",
        //     message: `Custom Breadcrumb: Adding ${name} to Cart`,
        // });
        dispatch(addItemToCart(cartItems, product));
        setButtonText("Added ✅");
        setTimeout(() => setButtonText("Add to cart"), 1000);
    }

    return(
        <div aria-label="Product Card Container"className="product-card-container" style={{"border": "1px solid lightgray", "borderRadius": "4px", "paddingLeft": "5px", "paddingRight": "5px", "paddingTop": "5px"}}>
            <img aria-label={`${name} Image`} src={imageUrl} alt={`${name}`} style={{"aspectRatio": "1/1"}} />
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price' style={{"marginLeft": "10px"}}>${price}</span>
            </div>
            <Button aria-label={`Add ${name} To Cart Button`} buttonType='inverted' onClick={addProductToCart} style={{"margin": "auto"}}>
                {buttonText}
            </Button>
        </div>
    )

}

export default ProductCard;

