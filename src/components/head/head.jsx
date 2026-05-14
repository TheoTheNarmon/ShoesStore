import { Link } from 'react-router-dom'
import './head.css'

function Head(){
    return(
        <div className='header'>
            <Link to='/shop' className='header-link-container'>
                <h2 >tienda</h2>
            </Link>
            <Link to='/' className='header-link-container'>
                <h2 >Página principal</h2>
            </Link>
            <Link to='/cart' className='header-link-container'>
                <h2 >Carrito</h2>
            </Link>  
        </div>
    )
}

export default Head