import React from "react";
import { BsCloudDownload } from "react-icons/bs";
const DownloadButton = ({ downloadLink }) => {
  // console.log(downloadLink)
  return (
    <div className="flex items-center justify-center">
      <div className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded ml-4 flex items-center">
        <BsCloudDownload className="mr-2" />
        <a href={"http://127.0.0.1:5000/download/transcription"} download>
          Download Transcript
        </a>
      </div>
    </div>
  );
};

export default DownloadButton;
