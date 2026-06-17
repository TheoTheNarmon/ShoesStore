import CartItem from "../../components/cartItem/cartItem"
import Button from "../../components/button/button"
import { useCart } from '../../context/cartContext';
import './cart.css'

function Cart(){
    const { cart, clearCart, getCartTotal } = useCart();

    if (cart.length === 0) {
        return (
            <div>
            <h1>El carrito está vacío</h1>
            <Button link='/' text='Agrega productos para continuar la compra.'/>
            </div>
        );
    }

    return(
        <div>
            <div className="cart-container">
                {cart.map(item => (
                    <CartItem key={item.id} item={item}/>
                ))}
            </div>
            <h3>Total a pagar: ${getCartTotal()}</h3>
            <button onClick={clearCart}>Vaciar Carrito</button>
        </div>
    )
}

export default Cart