import React from "react";

const DownloadButton = ({ downloadLink }) => {
  // console.log(downloadLink)
  return (
    <div className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded ml-4">
      <a href={"http://127.0.0.1:5000/download/transcription"} download>
        Download Transcript
      </a>
    </div>
  );
};

export default DownloadButton;
