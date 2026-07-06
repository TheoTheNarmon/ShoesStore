import { useNavigate, useParams } from 'react-router-dom'
import { useCart } from '../../context/cartContext';
import Button from '../../components/button/button'
import './product.css'

function productInfo({products}){
    const {id} = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    
    const foundProd =products.find(p => p.id == id);

    const handleBuy = () => {
        addToCart(foundProd, 1);
        navigate('/cart');
    }

    if (!foundProd){
        return(<h1>ERROR producto no encontrado</h1>)
    }

    return(
        <div className='product'>
            <h1>{foundProd.name}</h1>
            <h3>{foundProd.brand}</h3>
            <img className='photo' src={foundProd.image}/>

            <h3>${foundProd.price}</h3>

            <button className='prod-button' onClick={handleBuy}>Compra ahora</button>
        </div>
    )
}

export default productInfo