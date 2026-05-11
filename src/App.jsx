import { Routes, Route } from "react-router-dom";
import Layout from './components/layout/layout'
import Menu from './pages/menu/menu'
//import ItemsContainer from "./components/itemsContainer/itemsContainer";
import Product from './pages/product/product'
import { useEffect, useState } from "react";

function App(){

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/data/products.json')
      .then(answer => answer.json())
      .then(datos => {
        setProducts(datos);
        console.log('¡Productos cargados!', datos);
      })
      .catch(error => {
        console.error('error detectado:', error);
      });
  }, [])

  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<Menu products={products}/>} />
        <Route path="/product/:id" element={<Product products={products} />}/>
      </Route>
    </Routes>
  )
}

export default App