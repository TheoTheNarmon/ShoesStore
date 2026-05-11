import { Link } from "react-router-dom";
import "./button.css"

function Button({link, text}){

    return(
        <Link
        to={link}
        className="button"
        >
            <p>{text}</p>
        </Link>
    )
}

export default Button