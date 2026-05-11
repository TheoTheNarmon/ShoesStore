import { useParams } from 'react-router-dom'
import Button from '../../components/button/button'
import './product.css'

function productInfo({products}){
    const {id} = useParams();
    
    const foundProd =products.find(p => p.id == Number(id))

    if (!foundProd){
        return(<h1>ERROR producto no encontrado</h1>)
    }
    return(
        <div className='product'>
            <h1>{foundProd.name}</h1>
            <h3>{foundProd.brand}</h3>
            <img className='photo' src={foundProd.image}/>

            <h4>${foundProd.price}</h4>

            <Button
                link='/cart'
                text="¡Compra ahora!"
            />
        </div>
    )
}

export default productInfo