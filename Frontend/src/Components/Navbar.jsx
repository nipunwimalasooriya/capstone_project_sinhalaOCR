import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../images/Sinhala.png";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config.js";
import { useDispatch } from "react-redux";
import { setUser } from "../store/usersSlice.js";

const Navbar = () => {
  const dispatch = useDispatch();  // Move useDispatch outside the function

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
        <li>How To Use</li>
        <li>About Us</li>
        <li>FAQ</li>
      </ul>
      <button onClick={handleSignOut}>Logout</button>
    </div>
  );
};

export default Navbar;
