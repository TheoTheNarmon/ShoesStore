import React, {useState} from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const handleLogin = (event) => {
        event.preventDefault();

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;
            console.log("usuario logueado:", user);
            alert("Iniciada sesión");
            navigate('/');
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error en el login:", errorCode, errorMessage);
            alert("Error: " + errorMessage)
        });
    }
    return(
        <div>
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Ingresar</button>
            </form>

            <p>¿No tenés una cuenta? <Link to="/register">Registrate aquí</Link></p>
        </div>
    )
}

export default Login;