import React, { useState, useRef } from "react";
import "./Header.css";


const Header = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [convertedText, setConvertedText] = useState("");
  const convertedTextRef = useRef(null);



  const copyText = () => {
    var convertedTextElement = convertedTextRef.current;
    if (convertedTextElement && convertedTextElement.value.trim() !== "") {
      convertedTextElement.select();
      document.execCommand("copy");
      console.log(
        "Copied!",
        "Text has been copied to the clipboard",
        "success"
      );
    } else {
      console.log("Text Area Empty", "There is no text to copy.", "info");
    }
  };

  const handleFileSelect = (event) => {
    // Logic to handle the selected files
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
    // Reset converted text when new files are selected
    setConvertedText("");
  };

  const openFileUploader = () => {
    document.getElementById("image_file").click();
  };

  const extractText = async () => {
    // Reset selected files after extraction
    setSelectedFiles([]);
  
    // Rest of the performOCR logic
    const files = document.getElementById("image_file").files;
    const formData = new FormData();
    const endpoint = "http://127.0.0.1:8000/api/v1/extract_text";
  
    if (files.length === 1) {
      formData.append("image", files[0]);
    } else {
      for (let i = 0; i < files.length; i++) {
        formData.append(`image${i}`, files[i]);
      }
    }
  
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("OCR API Response:", data);
  
      if (endpoint === "http://127.0.0.1:8000/api/v1/extract_text") {
        // Assuming data.image contains the image URL or data
        setConvertedText(data.text);
      } else {
        getConvertedFiles(data.task_id, data.num_files);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  function getConvertedFiles(taskID, numFiles) {
    // ... (existing code remains unchanged)
  }

  return (
    <div>
      {/* Header Container */}
      <div className="header-container" id="header">
        <h1>Sinhala Image to Text Converter</h1>
        <p className="header-text">
          Turn pictures into text with our free image to text converter. Simply
          upload your photos in our online OCR and extract text from the image
          with a single click.
        </p>
        <div className="upload-box">
          <div className="box-content">
            {selectedFiles.length === 0 && (
              <div className="text-area-container">
                <p>Click Upload to select files</p>
                <p>Files supported: JPG | PNG | JPEG | GIF | JFIF | PDF</p>
              </div>
            )}
            {selectedFiles.map((file, index) => (
              <div key={index} className="selected-file">
                {file.name}
              </div>
            ))}
            <button className="custom-file-upload" onClick={openFileUploader}>
              Upload Files
            </button>
            <button className="extract-text-button" onClick={extractText}>
              Extract Text
            </button>
            <input
              type="file"
              id="image_file"
              name="myfile"
              multiple
              onChange={handleFileSelect}
              className="file-input"
            />
          </div>
        </div>
      </div>
      <div className="divider">
        <div className="result-container box-content">
          <div className="converted-text-container ">
            <label htmlFor="converted_text">Converted Text:</label>
            {typeof convertedText === "string" ? (
              <img src={convertedText} alt="Scaned text" />
            ) : (
              <textarea
                id="converted_text"
                ref={convertedTextRef}
                className="form-control"
                rows="5"
                readOnly
                placeholder="Converted text will appear here"
                value={convertedText}
              ></textarea>
            )}
          </div>
          <br />
          <div>
            <button className="copy-text-button" onClick={copyText}>
              Copy Text
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
