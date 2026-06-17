import { Link } from 'react-router-dom'
import { useCart } from '../../context/cartContext';
import './head.css'

function Head(){

    const { getCartQuantity } = useCart();
    const totalItems = getCartQuantity();

    return(
        <div className='header'>
            <Link to='/shop' className='header-link-container'>
                <h2 >tienda</h2>
            </Link>
            <Link to='/' className='header-link-container'>
                <h2 >Página principal</h2>
            </Link>
            <Link to='/cart' className='header-link-container'>
                <h2 >Carrito {totalItems}</h2>
            </Link>  
        </div>
    )
}

export default Head