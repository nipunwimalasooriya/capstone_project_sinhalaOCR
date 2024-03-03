import React, { useState } from "react";
import "./Header.css";
// import $ from "jquery";

const Header = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [convertedText, setConvertedText] = useState("");
  const copyText = () => {
    var convertedText = document.getElementById("converted_text");
    if (convertedText.value.trim() !== "") {
      convertedText.select();
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

  const extractText = () => {
    // Logic to extract text from images
    console.log("Extracting text...");
    // Placeholder logic, update with your actual OCR extraction logic
    setConvertedText("Sample extracted text");
    // Reset selected files after extraction
    setSelectedFiles([]);

    // // Logic to extract text from images
    // console.log("Extracting text...");
    // // Placeholder logic, update with your actual OCR extraction logic
    // setConvertedText("Sample extracted text");
    // // Reset selected files after extraction
    // setSelectedFiles([]);

    // // Rest of the performOCR logic
    // var files = document.getElementById("image_file").files;
    // var formData = new FormData();
    // var endpoint = "/api/v1/extract_text";

    // if (files.length === 1) {
    //   formData.append("image", files[0]);
    // } else {
    //   for (var i = 0; i < files.length; i++) {
    //     formData.append("image" + i.toString(), files[i]);
    //   }
    //   endpoint = "/api/v1/bulk_extract_text";
    // }

    // // Use a promise to handle the asynchronous AJAX call
    // var promise = new Promise(function (resolve, reject) {
    //   $.ajax({
    //     type: "POST",
    //     url: endpoint,
    //     data: formData,
    //     contentType: false,
    //     cache: false,
    //     processData: false,
    //     success: function (data) {
    //       resolve(data);
    //     },
    //     error: function (error) {
    //       reject(error);
    //     },
    //   });
    // });

    // // After the AJAX call is successful, update the textarea
    // promise
    //   .then(function (data) {
    //     if (endpoint === "/api/v1/extract_text") {
    //       setConvertedText(data.text);
    //     } else {
    //       getConvertedFiles(data.task_id, data.num_files);
    //     }
    //   })
    //   .catch(function (error) {
    //     console.error("Error:", error);
    //   });
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
        {/* Converted Text Container */}
        {convertedText && (
          <div className="result-container box-content">
            <div className="converted-text-container ">
              <label htmlFor="converted_text">Converted Text:</label>
              <textarea
                id="converted_text"
                className="form-control"
                rows="5"
                readOnly
                placeholder="Converted text will appear here"
                value={convertedText}
              ></textarea>
            </div>
            <br />
            <div>
              <button className="copy-text-button" onClick={copyText}>
                Copy Text
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
