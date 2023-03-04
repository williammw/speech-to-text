import React, { useRef, useState } from "react";
import ProgressBar from "./ProgressBar";

const UploadForm = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInput = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    const formData = new FormData();
    formData.append("audio", file);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/transcribe`, {
        method: "POST",
        body: formData,
        onUploadProgress: (progressEvent) => {
          setProgress(Math.round((progressEvent.loaded / progressEvent.total) * 100));
        },
      });

      const data = await response.json();

      onUpload(data.transcription, data.downloadLink);
    } catch (error) {
      console.error(error);
    }

    setIsUploading(false);
  };

  const handleFileChange = () => {
    setFile(fileInput.current.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-4">
        <input
          type="file"
          ref={fileInput}
          onChange={handleFileChange}
          accept=".mp3"
          className="sr-only"
        />
        <label
          htmlFor="file-upload"
          className={`relative cursor-pointer px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            isUploading && "opacity-50 pointer-events-none"
          }`}
        >
          <span>Select a file</span>
          <span className="ml-2 text-gray-500">{file?.name || ""}</span>
        </label>
        <button
          type="submit"
          className={`inline-flex items-center px-4 py-2 ml-4 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            isUploading && "opacity-50 pointer-events-none"
          }`}
          disabled={!file || isUploading}
        >
          Upload
        </button>
      </div>
      {isUploading && <ProgressBar progress={progress} />}
    </form>
  );
};

export default UploadForm;
