import React from "react";

const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full bg-gray-100 rounded-md overflow-hidden">
      <div className="h-2 bg-blue-500" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;
