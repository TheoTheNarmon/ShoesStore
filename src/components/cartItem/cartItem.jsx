import './cartItem.css'
import { useCart } from '../../context/cartContext';

function CartItem({item}){

    const {cart, removeFromCart} = useCart();

    return(
        <div className='cart-item'>
            <div className='cart-image-container'>
                <img className='cart-image' src={item.image}></img>
            </div>
            <div className='cart-item-details'>
                <h3 className='cart-item-name'>{item.name}</h3>
                <p className='cart-item-brand'>{item.brand}</p>
                <h3 className='cart-item-price'>{item.price * item.quantity}</h3>
            </div>
            <div className='cart-item-controls'>
                <button className='cart-rest' onClick={() => {removeFromCart(item.id)}} >-</button>
                <p className='cart.item.cant'>{item.quantity}</p>
            </div>
        </div>
    )
}

export default CartItem