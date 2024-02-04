import React, { useState } from "react";
import "./Faq.css";

const Faq = () => {
  const faqData = [
    {
      question: "How To Copy Text From Image?",
      answer: [
        "Follow these steps to get text from an image:",
        "1. Head to imagetotext.io.",
        "2. Upload or copy/paste your image into the input box.",
        "3. Press the submit button.",
        "4. Copy the extracted text, or download it as a text file.",
      ],
    },
    {
      question: "How does our Photo To Text Tools Works?",
      answer:
        "Photo to text converter is an online tool that converts a photo into text. " +
        "It works by analyzing the pixels of the image and then converting them into words. " +
        "The technology can be used to convert scanned documents into text or digital formats.",
    },
    {
      question: "Why Do We Need To Extract Text From Images?",
      answer:
        "Text extraction from images is crucial for creating accessible, searchable, editable, and shareable versions of the information contained in images. " +
        "By using an image to text converter, we can easily get text from images and make the information more usable and valuable.",
    },
  ];

  const [expandedQuestions, setExpandedQuestions] = useState([]);

  const handleQuestionClick = (index) => {
    setExpandedQuestions((prev) =>
      prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]
    );
  };

  return (
    <div className="faq-container" id="faq">
      <h2>Frequently Asked Questions (FAQs)</h2>
      {faqData.map((faq, index) => (
        <div
          key={index}
          className={`faq-box ${expandedQuestions.includes(index) ? "expanded" : ""}`}
          onClick={() => handleQuestionClick(index)}
        >
          <p>{faq.question}</p>
          {expandedQuestions.includes(index) && <div className="answer">{faq.answer}</div>}
        </div>
      ))}
    </div>
  );
};

export default Faq;