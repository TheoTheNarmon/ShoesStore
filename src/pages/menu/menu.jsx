import { useState, useEffect } from 'react'
import Item from '../../components/item/item'
import ItemsContainer from '../../components/itemsContainer/itemsContainer'
import './menu.css'
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore'; 
import { db } from '../../firebase/config';

function Menu() {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState(products);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setLoading(true);
    const productsDB = collection(db, "Shoes");

    getDocs(productsDB)
      .then((resp) => {
        const productList = resp.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        
        setProducts(productList);
        setItems(productList);
      })
      .catch((error) => console.error("Error cargando productos:", error))
      .finally(() => {
        setLoading(false);
      });
    }, []);

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

  if (loading){
        return(<h1>Cargando...</h1>)
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
