import { useState } from 'react'
import Item from '../../components/item/item'
import ItemsContainer from '../../components/itemsContainer/itemsContainer'
import './menu.css'

function Menu({products}) {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState(products);

  const handleSetSearch = (e) => {
    setSearch(e.target.value);
    if(search.trim() == '' || search == ' '){
      setItems(products);
      return;
    }
    handleSearch();
  }

  const handleSearch = () => {

    setItems(products.filter((product) => {
      const searchLower = search.trim().toLowerCase();
      const nameLower = product.name.toLowerCase();
      const brandLower = product.brand.toLowerCase();

      return (nameLower.includes(searchLower));
    }))
  }

  return (
    <div>
      <h1 className='tittle-shop'>Encuentra tu producto ideal</h1>
      <div className='search-container'>
        <input
          type='text'
          placeholder='Buscador...'
          value={search}
          onChange={handleSetSearch}
          className='shop-search'
        />
      </div> 
      <ItemsContainer items={items}></ItemsContainer>
      {!items && (
        <h3>Ningun producto encontrado...</h3>
      )}
    </div>
  )
}


export default Menu
