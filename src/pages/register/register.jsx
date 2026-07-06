import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import '../login/login.css'

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
        <div className="login-page">
            <h2>Crea una cuenta</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <div>
                    <input
                        className="login-input"
                        type='email'
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        className="login-input"
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        placeholder='Contraseña'
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button className="login-button" type="submit">Registrarse</button>
            </form>
        </div>
    )
}

export default Register