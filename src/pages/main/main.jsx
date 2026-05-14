import Button from "../../components/button/button";

function MainPage(){
    return(
        <div>
            <h1>Bienvenido</h1>
            <Button link={'/shop'} text={'Empieza a comprar'}></Button>
        </div>
    )
}

export default MainPage