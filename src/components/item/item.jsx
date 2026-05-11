import './item.css'
import { Link } from 'react-router-dom'
import Button from '../button/button'

function Item({item}){

    return(
        <div to={'/product/' + item.id} className='shop-item'>
            <h2>{item.name}</h2>
            <img className='image' src={item.image}/>
            <p>${item.price}</p>
            <Button link={'/product/' + item.id} text="compra ahora"></Button>
        </div>
    )
}

export default Item