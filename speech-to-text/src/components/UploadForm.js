import React, { useRef, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setDownloadLink } from "../apiSlice";
import { useSelector } from "react-redux";
import { selectApiState } from "../apiSlice";
import DownloadButton from "../components/DownloadButton";
const UploadForm = () => {
  const fileInput = useRef(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();
const { downloadLink } =
    useSelector(selectApiState);
  const handleUpload = async (event) => {
    event.preventDefault();
    setError(null);

    const file = fileInput.current.files[0];

    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("audio", file);

    setIsUploading(true);

    try {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/transcribe`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(progress);
      },
    }
  );

  console.log(response.data);
  dispatch(setDownloadLink(response.data)); // dispatch setDownloadLink action with the download link value
} catch (error) {
  console.error(error);
  setError("An error occurred while uploading the file.");
}

    setIsUploading(false);
  };

  const handleDragEnter = (event) => {
    console.log('1')
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event) => {
    console.log('2')
    event.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (event) => {
    console.log('3')
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const droppedFile = event.dataTransfer.files[0];
    const fileList = new DataTransfer();
    fileList.items.add(droppedFile);
    fileInput.current.files = fileList.files;
    setSelectedFile(droppedFile);
  };


  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-lg font-medium mb-4">Upload an audio file</h2>
      <form onSubmit={handleUpload}>
        <div
          className={`border-4 ${
            dragging ? "border-green-500" : "border-gray-300"
          } rounded-md py-6 px-4 mb-4`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="flex items-center justify-center">
            <svg
              className={`w-12 h-12 ${
                dragging ? "text-green-500" : "text-gray-300"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="text-center text-sm mt-2">
            <p>Drag and drop your audio file here or</p>
            <label
              htmlFor="audio-file"
              className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition duration-150 ease-in-out"
            >
              select a file from your computer
            </label>
          </div>
          <input
            type="file"
            id="audio-file"
            name="audio-file"
            accept=".mp3"
            className="sr-only"
            ref={fileInput}
            onChange={() => {
              const file = fileInput.current.files[0];
              setSelectedFile(file);
            }}
          />
          {/* <button
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
            onClick={() => fileInput.current.click()}
          >
            Select
          </button> */}
          {selectedFile && (
            <p className="text-gray-500 text-lg text-center mt-2">{selectedFile.name}</p>
          )}

          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
        </div>
        {isUploading && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Uploading...
            </label>
            <progress value={uploadProgress} max="100" className="w-full" />
          </div>
        )}
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded"
          disabled={isUploading || !selectedFile}
        >
          {isUploading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {downloadLink && <DownloadButton downloadLink={downloadLink} />}
    </div>
  );
};
export default UploadForm;