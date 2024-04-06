import React from "react";
import "./Footer.css";
import footer_logo from '../images/logo.png'
import footer_icon1 from '../images/footicon1.png'
import footer_icon2 from '../images/footicon2.png'
import footer_icon3 from '../images/footicon3.png'
import footer_icon4 from '../images/footicon4.png'

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-logo">
                <img src={footer_logo} alt="" />
            </div>
            <ul className="footer-links">
                <li>How to Use</li>
                <li>About Us</li>
                <li>FAQ</li>
                <li>Privacy Policy</li>
                <li>Terms and Conditions</li>
            </ul>
            <div className="footer-social-icon">
                <div className="footer-icons-container">
                    <img src={footer_icon1} alt="" />
                </div>
                <div className="footer-icons-container">
                    <img src={footer_icon2} alt="" />
                </div>
                <div className="footer-icons-container">
                    <img src={footer_icon3} alt="" />
                </div>
                <div className="footer-icons-container">
                    <img src={footer_icon4} alt="" />
                </div>
            </div>
            <div className="footer-copyright">
                <hr />
                <p>
                    Copyright @ 2024 - All Right Researved
                </p>
            </div>
        </div>
    )
}

export default Footer