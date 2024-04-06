import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../images/logo.png";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config.js";
import { useDispatch } from "react-redux";
import { setUser } from "../store/usersSlice.js";

const Navbar = () => {
  const dispatch = useDispatch();

  function handleSignOut() {
    if (window.confirm("Are you sure you want to log out?")) {
      signOut(auth)
        .then(() => {
          dispatch(setUser(null));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <div className="navbar">
      <Link to="/">
        <div className="nav-logo">
          <img src={logo} alt="" />
        </div>
      </Link>
      <ul className="nav-menu">
        <li>
          <Link to="/how-to-use">How To Use</Link>
        </li>
        <li>
          <Link to="/about-us">About Us</Link>
        </li>
        <li>
          <Link to="/faq">FAQ</Link>
        </li>
      </ul>
      <button className="nav-login-button" onClick={handleSignOut}>Logout</button>
    </div>
  );
};

export default Navbar;
