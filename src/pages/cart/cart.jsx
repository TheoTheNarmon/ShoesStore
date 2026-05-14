import CartItem from "../../components/cartItem/cartItem"
import './cart.css'

function Cart({items}){
    return(
        <div className="cart-container">
            {items.map(item => (
                <CartItem key={item.id} item={item}/>
            ))}
        </div>
    )
}

export default Cart