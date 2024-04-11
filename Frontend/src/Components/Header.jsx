import React, { useState, useRef } from "react";
import "./Header.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import $ from "jquery";

const Header = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [convertedText, setConvertedText] = useState("");
    const convertedTextRef = useRef(null);

    const copyText = () => {
        var convertedTextElement = convertedTextRef.current;
        if (convertedTextElement && convertedTextElement.value.trim() !== "") {
            convertedTextElement.select();
            document.execCommand("copy");
            toast.success("Text has been copied to the clipboard");
        } else {
            toast.info("There is no text to copy.");
        }
    };

    const handleFileSelect = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(files);
        setConvertedText(""); // Reset converted text when new files are selected
    };

    const openFileUploader = () => {
        document.getElementById("image_file").click();
    };

    const extractText = () => {
        setSelectedFiles([]); // Reset selected files after extraction

        var files = document.getElementById("image_file").files;
        var formData = new FormData();
        var endpoint = "/api/v1/extract_text";

        if (files.length === 1) {
            formData.append("image", files[0]);
        } else {
            for (var i = 0; i < files.length; i++) {
                formData.append("image" + i.toString(), files[i]);
            }
        }

        var promise = new Promise(function (resolve, reject) {
            $.ajax({
                type: "POST",
                url: endpoint,
                data: formData,
                contentType: false,
                cache: false,
                processData: false,
                success: function (data) {
                    console.log("OCR API Response:", data);
                    resolve(data);
                },
                error: function (error) {
                    console.error("OCR API Error:", error);
                    reject(error);
                },
            });
        });

        promise
            .then(function (data) {
                console.log("Data received:", data);

                if (endpoint === "/api/v1/extract_text") {
                    setConvertedText(data.text); // Display extracted text in the textarea
                } else {
                    getConvertedFiles(data.task_id, data.num_files);
                }
            })
            .catch(function (error) {
                console.error("Error:", error);
            });
    };

    function getConvertedFiles(taskID, numFiles) {
        // Assuming the server provides an API endpoint to fetch the converted files
        const apiUrl = `/api/v1/bulk_output/${taskID}`;

        // Make a GET request to the API endpoint
        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                // Assuming the API response has the converted files in the 'output' field
                const textMap = data.output;

                // Handle the converted files (e.g., update state, display, etc.)
                console.log("Converted Files:", textMap);

                // For example, you can set the converted text in the state
                // setConvertedText(textMap['filename.txt']);
            })
            .catch((error) => {
                console.error("Error fetching converted files:", error);
            });
    }

    return (
        <div>
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
                    <div className="converted-text-container">
                        <label htmlFor="converted_text">Converted Text:</label>
                        {typeof convertedText === "string" ? (
                            <textarea
                                id="converted_text"
                                ref={convertedTextRef}
                                className="form-control"
                                rows="5"
                                readOnly
                                placeholder="Converted text will appear here"
                                value={convertedText}
                            ></textarea>
                        ) : (
                            <p>No text extracted yet. Press 'Extract Text' button.</p>
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
