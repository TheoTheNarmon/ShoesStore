import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const auth = getAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try{
            await createUserWithEmailAndPassword(auth,email,password);
            navigate('/');
        }catch(error){
            if(error.code === 'auth/email-already-in-use'){
                const tryToLog = window.confirm('Este correo ya está en uso ¿quiere iniciar sesión?');
                if(quiereLoguearse){
                    nagigate('login')
                }else{
                    return;
                }
            }else{
                setError("Ocurrió un error al registar, verifique sus datos e intente de nuevo");
                console.error("Error:",error.message);
            }
        }
    };

    return (
        <div>
            <h2>Crea una cuenta</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Correo electrónico</label>
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña</label>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        placeholder='Mínimo 6 carácteres'
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Registrarse</button>
            </form>
        </div>
    )
}

export default Register