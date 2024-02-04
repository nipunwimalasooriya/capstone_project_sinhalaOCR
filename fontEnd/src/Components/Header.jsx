import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header-container" id="header">
      <h1>Sinhala Image to Text Converter</h1>
      <p className="header-text">
        Turn pictures into text with our free image to text converter. Simply
        upload your photos in our online OCR and extract text from the image
        with a single click.
      </p>
      <div className="upload-box">
        <div className="box-content">
          <p>Drag and drop images here</p>
          <p>Files supported: JPG | PNG | JPEG | GIF | JFIF | PDF</p>
          <button>Upload Image</button>
        </div>
      </div>
    </div>
  )
}

export default Header;