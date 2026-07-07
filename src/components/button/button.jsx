import { Link } from "react-router-dom";
import "./button.css"

function Button({link, text}){

    return(
        <Link
        to={link}
        className="button"
        >
            <h3>{text}</h3>
        </Link>
    )
}

export default Button