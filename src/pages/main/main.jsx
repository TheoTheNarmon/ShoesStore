import { useNavigate } from "react-router-dom";
import Button from "../../components/button/button";
import './main.css'

function MainPage(){
    const navigate = useNavigate();

    return(
        <div className="main-page">
            <h1>Bienvenido</h1>
            <button className="main-button" onClick={() => navigate('/shop')}>Empieza a comprar</button>
        </div>
    )
}

export default MainPage