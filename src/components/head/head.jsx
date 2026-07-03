import { Link } from 'react-router-dom'
import { useCart } from '../../context/cartContext';
import './head.css'
import { useAuth } from '../../context/authContext';

function Head(){

    const { getCartQuantity } = useCart();
    const totalItems = getCartQuantity();
    const {user, logOut} = useAuth();

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
            {user ? (
                <>
                {user.rol === 'admin' && (
                    <Link to='/management' className='header-link-container'>Gestion</Link>
                )}
                <span>¡hola, {user.email}!</span>
                <button onClick={logOut}>Cerrar Sesion</button>
                </>):(
                    <Link to='/login' className='header-link-container'>Iniciar Sesion</Link>
                )
            }  
        </div>
    )
}

export default Head