import './cartItem.css'
import { useCart } from '../../context/cartContext';

function CartItem({item}){

    return(
        <div className='cart-item'>
            <img className='cart-image' src={item.image}></img>
            <div className='cart-name'>
                <h4>{item.name}</h4>
                <h4>{item.brand}</h4>
                <h4>{item.quantity}</h4>
            </div>
            <div className='cart-price'><h3>${item.price * item.quantity}</h3></div>
        </div>
    )
}

export default CartItem