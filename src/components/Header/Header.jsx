import { Link } from "react-router-dom"
import './Header.css'

const Header = (props) => {
    return (
        <header>
            <nav className="nav">
                <Link to='/'>
                    <img className='logo' src="https://cdn-icons-png.flaticon.com/512/1/1394.png" />
                </Link>
            </nav>
        </header>
    )
}

export default Header