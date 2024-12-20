import React, { useState } from "react";

const UploadForm = ({ onUploadSuccess }) => {
  
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4 text-center">Share Your Notes</h2>
      <div className="bg-white shadow-lg rounded-lg p-4 mb-8 w-full text-center hover:shadow-xl transition drop-shadow-xl">
        <button
          htmlFor="fileInput"
          className="px-4 py-2 bg-green-700 text-white font-medium rounded hover:bg-green-800 transition-colors cursor-pointer"
          onClick={()=>{onUploadSuccess(true)}}>
          Upload the Notes PDF
        </button>
       
        
        <p className="mt-2 font-serif text-gray-600">"You never know, your lecture notes might save someone’s semester"</p>
      </div>
    </div>
  );
};

export default UploadForm;
