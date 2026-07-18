import "./Navbar.css";
import logo from "../../assets/logo.png"

import { TfiMenu } from "react-icons/tfi";
import { FaUserAlt } from "react-icons/fa";

function Navbar() {
    return (
        <nav className="navbar">
            <nav className="navbar-container">
                <button className="menu">
                    <TfiMenu className="menu-icon"/>
                </button>

                <img 
                    src={logo}
                    alt="Sophie Baby Kids"
                    className="logo"
                />

                <FaUserAlt className="user-icon" />
            </nav>
        </nav>
    )
}

export default Navbar;