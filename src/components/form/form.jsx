import React from "react";

export function FormProd({dataForm, handleChange, handleSubmit, handleImageChange}){
    return(
        <form className="form" onSubmit={handleSubmit} >
            <h3>Añade tu producto</h3>
            <div>
                <label>Nombre: </label>
                <input type='text' required minLength={4} placeholder="Nombre del producto" name="name" value={dataForm.name} onChange={handleChange}></input>
            </div>
            <div>
                <label>Marca: </label>
                <input type='text' required minLength={4} placeholder="Marca del producto" name="brand" value={dataForm.brand} onChange={handleChange}></input>
            </div>
            <div>
                <label>precio: </label>
                <input type='number' required min={1000} placeholder="ej: 9000" name="price" value={dataForm.price} onChange={handleChange}></input>
            </div>
            <div>
                <label>imagen: </label>
                <input type='file' name="imageFile" onChange={handleImageChange}></input>
            </div>
            <button type="submit">Guardar</button>
        </form>
    )
}