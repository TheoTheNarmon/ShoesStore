import { useNavigate } from "react-router-dom";
import Button from "../../components/button/button";
import './main.css'

function MainPage(){
    const navigate = useNavigate();

    return(
        <div className="main-page">
            <h1>Bienvenido</h1>
            <Button link={'/shop'} text={'Empieza a comprar'}></Button>
        </div>
    )
}

export default MainPage