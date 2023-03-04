import React from "react";

const DownloadButton = ({ downloadLink }) => {
  return (
    <div className="mt-6">
      <a
        href={downloadLink}
        download
        className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded"
      >
        Download Transcript
      </a>
    </div>
  );
};

export default DownloadButton;
