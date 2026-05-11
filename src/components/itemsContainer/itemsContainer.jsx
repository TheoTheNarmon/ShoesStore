import Item from "../item/item";
import './itemsContainer.css'

function ItemsContainer({items}){

    return(
        <div className="container">
            {items.map(item => (
                <Item key={item.id} item={item}/>
            ))}
        </div>
    )
}

export default ItemsContainer