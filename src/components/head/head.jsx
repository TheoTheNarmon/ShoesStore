import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/cartContext';
import './head.css'
import { useAuth } from '../../context/authContext';
import { FaShoppingCart } from "react-icons/fa";

function Head(){

    const { getCartQuantity } = useCart();
    const totalItems = getCartQuantity();
    const {user, logOut} = useAuth();
    const navigate = useNavigate();


    const HandleClickLogin = () =>{
        navigate('/login')
    }
    const HandleClickShop = () =>{
        navigate('/shop')
    }
    const HandleClickInit = () =>{
        navigate('/')
    }
    const HandleClickManagement = () =>{
        navigate('/management')
    }
    const HandleClickCart = () =>{
        navigate('/cart')
    }

    return (
        <div className='header-content'>
            <header className="header">
                {user ? (
                    <div className='wellcome-container'>
                    <span className="wellcome">Bienvenido {user.email} </span> 
                    <button className="button-init" onClick={logOut}>Cerrar Sesión</button>
                    </div>
                ):(
                    <div className='wellcome-container'>
                    <span className="wellcome">Bienvenido</span>
                    <button className="button-init" onClick={HandleClickLogin}>Iniciar Sesión</button>
                    </div>
                )}
                <div onClick={HandleClickCart} className='cart-icon-container'>
                    <FaShoppingCart />
                    <div className='cart'><h2>{getCartQuantity()}</h2></div>
                </div>
            </header>

            <nav className="nav-menu">
                <a href="#" onClick={HandleClickInit} className="nav-menu">Página principal</a>
            <span>|</span>
                <a href="#" onClick={HandleClickShop} className="nav-menu">Tienda</a>
                {(user && user.rol === 'admin') && (
                    <>
                    <span>|</span>
                    <a href="#" onClick={HandleClickManagement} className="nav-menu">Gestión</a>
                    </>
                )}
            </nav>
        </div>
    )
    /*return(
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
    )*/
}

export default Head