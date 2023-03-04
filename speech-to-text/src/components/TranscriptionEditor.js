import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ExportButton from "./ExportButton";

function TranscriptionEditor({ showEditor, setShowEditor, handleClose }) {
  const [text, setText] = useState("");
  const [editorText, setEditorText] = useState("");

  const handleChange = (value) => {
    setEditorText(value);
  };

  useEffect(() => {
    const fetchTranscription = async () => {
      const response = await fetch("http://127.0.0.1:5000/api/transcriptions");
      const data = await response.json();
      setText(data[0]);
    };
    fetchTranscription();
  }, []);

  useEffect(() => {
    setEditorText(text);
  }, [text]);

  const handleExport = () => {
    const element = document.createElement("a");
    const file = new Blob([editorText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "edited-transcription.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <div className="fixed z-50 top-0 left-0 w-full h-full overflow-auto bg-gray-800 bg-opacity-75">
      <div className="relative w-full max-w-2xl mx-auto mt-10 mb-4">
        <div className="flex justify-between items-center px-4 py-3 bg-white rounded-t-md">
          <h3 className="text-lg font-medium text-gray-800">
            Transcription Editor
          </h3>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-600 focus:outline-none"
            onClick={handleClose}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18.707 3.293a1 1 0 00-1.414 0L10 10.586 3.707 4.293a1 1 0 00-1.414 1.414L8.586 12l-6.293 6.293a1 1 0 000 1.414 1 1 0 001.414 0L10 13.414l6.293 6.293a1 1 0 001.414 0 1 1 0 000-1.414L11.414 12l6.293-6.293a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="px-4 py-3 bg-white rounded-b-md">
          <ReactQuill value={editorText} onChange={handleChange} />
          <ExportButton
            text={editorText}
            filename="transcription.txt"
            onClick={handleExport}
            label="Download edited transcription"
          />
        </div>
      </div>
    </div>
  );
}

export default TranscriptionEditor;
