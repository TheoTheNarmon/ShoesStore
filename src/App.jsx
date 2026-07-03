import { Routes, Route } from "react-router-dom";
import Layout from './components/layout/layout'
import Menu from './pages/menu/menu'
import Product from './pages/product/product'
import Cart from './pages/cart/cart'
import MainPage from "./pages/main/main";
import Management from "./pages/management/management";
import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { db } from './firebase/config';
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";

function App(){

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productsDB = collection(db, "Shoes")

    getDocs(productsDB).then((resp) => {
      setProducts(
        resp.docs.map((doc) => {
          return{...doc.data(), id: doc.id}
        })
      );
    })
  }, []);

  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<MainPage />} />
        <Route path="/shop" element={<Menu products={products}/>} />
        <Route path="/product/:id" element={<Product products={products} />}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>} />

        <Route
        path="/management"
        element={
          <ProtectedRoute authorizedRoles={['admin']}>
            <Management/>
          </ProtectedRoute>}/>
      </Route>
    </Routes>
  )
}

export default App