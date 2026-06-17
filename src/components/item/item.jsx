import './item.css'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/cartContext';
import Button from '../button/button'

function Item({item}){

    const { addToCart } = useCart();

    const HandleAdd =() =>{
        addToCart(item, 1)
    }

    return(
        <div to={'/product/' + item.id} className='shop-item'>
            <h2>{item.name}</h2>
            <img className='image' src={item.image}/>
            <p>${item.price}</p>
            <button onClick={HandleAdd}> COMPRA AHORA </button>
        </div>
    )
}

export default Item