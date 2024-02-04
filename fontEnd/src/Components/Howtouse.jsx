import React from "react";
import "./Howtouse.css";
import icon1 from "../images/icon1.png"
import icon2 from "../images/icon2.png"
import icon3 from "../images/icon3.png"

const Howtouse = () => {
  return (
    <div className="how-to-use-container" id="howtouse">
      <div className="header-container">
        <h2>How does this tool work</h2>
        <p>Follow the steps below to extract text from an image:</p>
      </div>

      <div className="steps-container">
        <div className="step-box">
          <div className="step-number">1</div>
          <div className="icon">
            <img src={icon1} alt="" />
          </div>
          <div className="step-content">
            <div className="heading3">Upload Images</div>
            <p>
              You can upload Images into the input box above or select images from your local device. Supported image formats are JPG, PNG, JPEG, BMP, GIF, and TIFF.
            </p>
          </div>
        </div>

        <div className="step-box">
          <div className="step-number">2</div>
          <div className="icon">
            <img src={icon2} alt="" />
          </div>
          <div className="step-content">
          <div className="heading3">Extract Text from Images</div>
            <p>
              Click on the "Extract" button to start the OCR process. The tool will analyze the images and extract text from them.
            </p>
          </div>
        </div>

        <div className="step-box">
          <div className="step-number">3</div>
          <div className="icon">
            <img src={icon3} alt="" />
          </div>
          <div className="step-content">
          <div className="heading3">Copy the Text</div>
            <p>
              After processing, you can copy the extracted text. The copy option will be provided after the OCR process is complete.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Howtouse;