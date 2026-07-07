import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { FormProd } from '../../components/form/form';
import { collection, getDocs, deleteDoc, doc, updateDoc, addDoc } from "firebase/firestore";

const Management = () => {
    const [prods, setProds] = useState([]);
    const [toEdit, setToEdit] = useState(null);
    const [dataForm, setDataForm] = useState({
            name: '',
            brand: '',
            price: 0
            });
    const initialStage = {
        name: "",
        brand:"",
        price: 0
    };

    const [imageFile, setImageFile] = useState(null);

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

    useEffect(() => {
            if(toEdit){
                setDataForm(toEdit);
            } else{setDataForm(initialStage)}
    }, [toEdit]);

    const handleDelete = async (id) => {
        const confirmation = window.confirm("¿estás seguuro que lo quieres eliminar?")
        if(confirmation){
            const docRef = doc(db, "Shoes", id)
            await deleteDoc(docRef);
            setProds(prods.filter(prod => prod.id !== id));
            alert("Producto eliminado")
        }
    }

    const handleEditClick = (prod) =>{
        setToEdit(prod);
    }

    const cancelEdition = () => {
        setToEdit(null);
    };
    
    const handleChange = (event) =>{
        const {name, value} = event.target;
            setDataForm({
                ...dataForm,
                [name]:value
            });
    }
    
    const handleImageChange = (event) => {
        if(event.target.files && event.target.files[0]){
            setImageFile(event.target.files[0])
            console.log("Archivo actual en el estado:", imageFile);
        }
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        let urlImage = dataForm.image;
    
        if(!imageFile && !toEdit){
            alert("ingrese una imagen")
            return;
        }

        if(imageFile){
            const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
            const formData = new FormData();
            formData.append('image', imageFile);
        
        try{
            console.log("subiendo imagen a Imgbb");
            const answerImgbb = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                method: 'POST',
                body: formData,
            });
    
            const dataImgbb = await answerImgbb.json();
    
            if(dataImgbb.success){
                urlImage = dataImgbb.data.url
                console.log("imagen subida con exito", urlImage)
            }
            else{
                throw new Error('Subida Fallida');
            }

        } catch(error){
            console.error("Error en el proceso de envio", error);
            alert("Hubo un error en la subida, intenta de nuevo");
            return;
        };
        }

        const fullProd = { ...dataForm, image:urlImage}

        try{
            if(toEdit){
                const docRef = doc(db, "Shoes", toEdit.id);
                await updateDoc(docRef, fullProd);
                alert("producto actualizado con exito");
            }
            else{
                await addDoc(collection(db,"Shoes"), fullProd);
                alert("producto agregado con exito");
            }
        } catch (error){
            console.error("Error: ", error);
        }
    };

    return(
        <div>
            <h2>Gestión de Productos</h2>
            <hr />
            <FormProd
                    dataForm={dataForm}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handleImageChange={handleImageChange}
            ></FormProd>
            {toEdit && (
                <button onClick={cancelEdition}>cancelEdition</button>
            )}
            <hr />
            <h3>Lista de Productos</h3>
            <ul>
                {prods.map((prod) => (
                    <li key={prod.id}>
                        {prod.brand} {prod.name} - ${prod.price}
                        <button onClick={() => handleEditClick(prod)} style={{marginLeft: '10px'}}>Editar</button>
                        <button onClick={() => handleDelete(prod.id)} style={{marginLeft: '10px'}}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Management