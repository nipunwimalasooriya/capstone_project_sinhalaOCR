import React, { useState } from "react";
import "./LoginSignup.css";
import Footer from "../Components/Footer";

const LoginSignup = () => {
    const [state, setState] = useState("Login");

    const handleSignup = async () => {
        const userData = {
            name: document.querySelector('input[name="name"]').value,
            email: document.querySelector('input[name="email"]').value,
            password: document.querySelector('input[name="password"]').value,
        };

        // Make a POST request to the backend
        const response = await fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const result = await response.json();
        console.log(result);
    };

    return (
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state === "Sign Up" ? <input type="text" name="name" placeholder="Your Name" /> : <></>}
                    <input type="email" name="email" placeholder="Email Address" />
                    <input type="password" name="password" placeholder="Password" />
                </div>
                <div className="loginsignup-agree">
                    <input type="checkbox" name='' id='' />
                    <p>By Continue, I Agree to the Terms of use & Privacy Policy</p>
                </div>
                <button onClick={handleSignup}>Continue</button>
                {state === "Sign Up" ? <p className="loginsignup-login">Already have an account <span onClick={() => { setState("Login") }}> Login Here </span></p>
                    : <p className="loginsignup-login">Create an Account <span onClick={() => { setState("Sign Up") }}> Click Here </span></p>}
            </div>
            <Footer />
        </div>
    );
};

export default LoginSignup;
