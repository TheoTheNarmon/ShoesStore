import Item from '../../components/item/item'
import ItemsContainer from '../../components/itemsContainer/itemsContainer'
import './menu.css'

function Menu({products}) {
  return (
    /*esta pagina tendra un buscador y un filtro */
    <div>
      <h1>Encuentra tu producto ideal</h1> 
      <ItemsContainer items={products}></ItemsContainer>
    </div>
  )
}


export default Menu
