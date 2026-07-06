import './item.css'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/cartContext';
import Button from '../button/button'

function Item({item}){
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const HandleAdd =() =>{
        addToCart(item, 1)
    }
    const HandleGo = () => {
        navigate('/product/' + item.id)
    }

    return(
        <div to={'/product/' + item.id} className='shop-item'>
            <h2>{item.name}</h2>
            <div className='image-container'>
                <img className='image' src={item.image}/>
            </div>
            <p>${item.price}</p>
            <button onClick={HandleGo}> Mas info</button>
            <button onClick={HandleAdd}> COMPRA AHORA </button>
        </div>
    )
}

export default Item