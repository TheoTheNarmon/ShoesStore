import CartItem from "../../components/cartItem/cartItem"
import Button from "../../components/button/button"
import { useCart } from '../../context/cartContext';
import './cart.css'

function Cart(){
    const { cart, clearCart, getCartTotal } = useCart();

    if (cart.length === 0) {
        return (
            <div className="no-cart-container">
            <h1>El carrito está vacío</h1>
            <Button link='/' text='Agrega productos para continuar la compra.'/>
            </div>
        );
    }

    return(
        <div className="cart-container">
            <div>
                {cart.map(item => (
                    <CartItem key={item.id} item={item} />
                ))}
            </div>
            <div className="checkout-section">
                <h2 className="total-price-text">Total a pagar: ${getCartTotal()}</h2>
                <div className="cart-button-actions">
                    <button className="button-confirm-buy">Comprar</button>
                    <button onClick={clearCart} className="button-trash-cart">Vaciar Carrito</button>
                </div>
            </div>
        </div>
    )
}

export default Cart