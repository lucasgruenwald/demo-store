import { useDispatch, useSelector } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart } from '../../store/cart/cart.action';

import './product-card.styles.scss'

import Button from '../button/button.component';


const ProductCard = ({ product }) => {
 
    const { name, price, imageUrl} = product;
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

    return(
        <div style={{"border": "1px solid lightgray", "borderRadius": "4px", "paddingLeft": "5px", "paddingRight": "5px", "paddingTop": "5px"}}>
            <img src={imageUrl} alt={`${name}`} style={{"maxWidth": "100%", "aspectRatio": "1/1"}} />
            <div className='footer' style={{"display": "flex", "justifyContent": "center"}}>
                <span className='name'>{name}</span>
                <span className='price' style={{"marginLeft": "10px"}}>${price}</span>
            </div>
            <Button buttonType='inverted' onClick={addProductToCart} style={{"margin": "auto", "marginTop": "10px"}}>
                Add to cart
            </Button>
        </div>
    )

}

export default ProductCard;

