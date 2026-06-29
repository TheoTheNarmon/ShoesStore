import React, {useState} from 'react';
import { FormProd } from '../../components/form/form';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

function FormContainer(){
    const [dataForm, setDataForm] = useState({
        name: '',
        brand: '',
        price: 0,
        });

    const [imageFile, setImageFile] = useState(null);

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

        if(!imageFile){
            alert("ingrese una imagen")
            return;
        }
        const apiKey = '9411a76634b52789345a7b0c0f934a51';
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
                console.log("imagen subida con exito", dataImgbb.data.url)

                const fullProd = {
                    ...dataForm,
                    image: dataImgbb.data.url
                }
                console.log('Enviando Poducto a Firebase:', fullProd);
                const db = getFirestore();
                const prods = collection(db, "Shoes");

                await addDoc(prods, fullProd);
            }
            else{
                throw new Error('Subida Fallida');
            }
        } catch(error){
            console.error("Error en el proceso de envio", error);
            alert("Hubo un error en la subida, intenta de nuevo")
        };
    };

    return (
        <FormProd
        dataForm={dataForm}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleImageChange={handleImageChange}
        ></FormProd>
    )
}

export default FormContainer