import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"
import logo from "../images/Sinhala.png"

const Navbar = () => {
    return (
        <div className="navbar">
            <Link to="/">
            <div className="nav-logo">
                <img src={logo} alt="" />
            </div>
            </Link>
            <ul className="nav-menu">
                <li>How To Use</li>
                <li>About Us</li>
                <li>FAQ</li>
            </ul>
            {/* <div className="nav-login">
                <Link to='/login'><button>Login</button></Link>

            </div> */}
        </div>
    )
}

export default Navbar
