import React from "react";
import "./Aboutus.css";
import image1 from "../images/image1.jpg"
import image2 from "../images/image2.jpg"
import image3 from "../images/image3.jpg"
import image4 from "../images/image4.jpg"

const Aboutus = () => {
  return (
    <div className="about-us-container" id="aboutus">
      <div className="about-section">
        <h2>About Us</h2>
        <p>
          Sinhala image to text converter converts any image into editable text.
          We have developed this tool using OCR (Optical Character Recognition).
          Tesseract and other Python libraries are used to refine the extracted
          text.
        </p>
      </div>

      <div className="team-section">
        <h3>Our Expert Team</h3>
        <p>
          Welcome to Our Website, a dynamic team of passionate individuals
          dedicated to breaking barriers through innovation. Our journey began
          with a shared vision to make technology accessible to everyone,
          particularly in the realm of linguistic diversity. We take pride in
          introducing our groundbreaking Sinhala Image to Text OCR, a product of
          collective expertise and unwavering commitment.
        </p>
        <div className="team-members">
          <div className="team-member">
          <img src={image1} alt="" />
            <p>Name1</p>
          </div>
          <div className="team-member">
          <img src={image2} alt="" />
            <p>Name2</p>
          </div>
          <div className="team-member">
            <img src={image3} alt="" />
            <p>Name3</p>
          </div>
          <div className="team-member">
            <img src={image4} alt="" />
            <p>Name4</p>
          </div>
        </div>
      </div>

      <div className="mission-section">
        <h3>Our Mission</h3>
        <p>
          Our mission is to bridge the gap between language and technology. We
          believe that every language deserves equal representation in the
          digital landscape. With this ethos, we set out to develop a Sinhala
          Image to Text OCR that not only recognizes characters but also
          fosters seamless communication for Sinhala speakers worldwide.
        </p>
      </div>
    </div>
  )
}

export default Aboutus;