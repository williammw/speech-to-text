import React from "react";

const ExportButton = ({ onClick }) => {
  // console.log(downloadLink)
  return (
    <div className="mt-6" onClick={onClick}>
      <a
        href="#"
        className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded"
      >
        Export Edited Transcript
      </a>
    </div>
  );
};

export default ExportButton;
