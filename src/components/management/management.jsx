import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import FormContainer from '../../pages/shoeFrom/shoeForm'
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const Management = () => {
    const [prods, setProds] = useState([]);
    const initialStage = {
        name: "",
        brand:"",
        price: 0,
        imagen: ""
    };

    const handleDelete = async (id) => {
        const confirmation = window.confirm("¿estás seguuro que lo quieres eliminar?")
        if(confirmation){
            const docRef = doc(db, "Shoes", id)
            await deleteDoc(docRef);
            setProds(prods.filter(prod => prod.id !== id));
            alert("Producto eliminado")
        }
    }

    useEffect(() => {
        const fetchProducts = async () => {
            const prodRef = collection(db, "Shoes");

            const resp = await getDocs(prodRef)

            setProds(
                resp.docs.map((doc) => ({ ...doc.data(), id: doc.id}))
            );
    };
    fetchProducts();
    }, [prods])

    return(
        <div>
            <h2>Gestión de Productos</h2>
            <hr />
            <FormContainer dataForm={initialStage} />
            <hr />
            <h3>Lista de Productos</h3>
            <ul>
                {prods.map((prod) => (
                    <li key={prod.id}>
                        {prod.brand} {prod.name} - ${prod.price}
                        {/*acá agregaremos los botones de acción */}
                        <button onClick={() => handleDelete(prod.id)} style={{marginLeft: '10px'}}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Management