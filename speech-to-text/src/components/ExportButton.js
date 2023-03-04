import React from "react";
// import { FaArrowUp } from "react-icons/fa";
const ExportButton = ({ onClick }) => {
  // console.log(downloadLink)
  return (
    <div className="mt-6" onClick={onClick}>
      <a
        href="javascript:void(0)"
        className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded"
      >
        {/* <FaArrowUp className="mr-2" /> */}
        Export Edited Transcript
      </a>
    </div>
  );
};

export default ExportButton;
