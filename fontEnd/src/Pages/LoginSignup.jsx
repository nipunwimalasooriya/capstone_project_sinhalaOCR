import React, { useState } from "react";
import "./LoginSignup.css"
import Footer from "../Components/Footer";

const LoginSignup = () => {

    const[state,setState] = useState("Login");

    return (
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state==="Sign Up"?<input type="text" placeholder="Your Name" />:<></>}
                    <input type="email" placeholder="Email Asdress" />
                    <input type="password" placeholder="Password" />
                </div>
                <div className="loginsignup-agree">
                    <input type="checkbox" name='' id='' />
                    <p>By Continue, I Agree to the Terms of use & Privacy Policy</p>
                </div>
                <button>Continue</button>
                {state==="Sign Up"?<p className="loginsignup-login">Already have an accont <span onClick={()=>{setState("Login")}}> Login Here </span></p>
                :<p className="loginsignup-login">Create an Account <span onClick={()=>{setState("Sign Up")}}> Click Here </span></p>}    
            </div>
            <Footer />

        </div>
    )
}

export default LoginSignup