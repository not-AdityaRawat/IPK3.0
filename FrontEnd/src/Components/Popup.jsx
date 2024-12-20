import React, { useState } from "react";
import UploadForm from "./UploadForm";
import Form from "./Form";
import { FaStar } from "react-icons/fa6";
const Popup = ({ onClose }) => {
  const [isUploaded, setIsUploaded] = useState(false);

  return (
    <div className="fixed inset-0 z-10 flex justify-end">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Popup Container */}
      <div
        className={`relative w-full max-w-sm bg-yellow-200 h-full p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-900 scrollbar-track-transparent scrollbar-thumb-rounded-full transform transition-transform duration-300 ease-in-out translate-x-0`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-black font-bold text-xl hover:scale-110 transition-transform"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="mt-8">
          {isUploaded ? (
            <Form />
          ) : (
            <UploadForm onUploadSuccess={() => setIsUploaded(true)} />
          )}
           
        </div>


        <div className="mt-8">

          
          {/* <h2 className="text-2xl font-bold mb-4 text-center">
            Share a Youtube Lecture Link
          </h2> */}

          {/* Lecture Link Form */}
          {/* <form className="bg-white shadow-lg rounded-lg p-4 mb-5 w-max drop-shadow-xl hover:shadow-xl">
            <div className="w-full space-y-4 mb-8 flex flex-col items-center">
              <input
                type="text"
                placeholder="Insert the Playlist/video link"
                className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring focus:ring-yellow-500 transition-all"
              />
              <input
                type="text"
                placeholder="Add a Description"
                className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring focus:ring-yellow-500 transition-all"
              />

              <div className="flex space-x-4 mb-4">
                <select className="w-1/2 p-3 border border-gray-400 rounded focus:outline-none focus:ring focus:ring-yellow-500">
                  <option>Select Subject</option>
                  <option>Mathematics</option>
                  <option>Physics</option>
                </select> */}

                {/* User Selects the Units */}
                {/* <select className="w-1/2 p-3 border border-gray-400 rounded focus:outline-none focus:ring focus:ring-yellow-500">
                  <option>Select Unit</option>
                  <option>Unit-1</option>
                  <option>Unit-2</option>
                  <option>Unit-3</option>
                  <option>Unit-4</option>
                </select>
              </div>
              <button className="px-4 py-2 bg-green-700 text-white font-medium rounded hover:bg-green-800 transition-colors">
                Submit Link
              </button>
            </div>
          </form> */}


          {/* Github Repo & Contribution */}
          <button className=" py-3 w-full bg-green-700 text-white font-bold rounded-lg hover:bg-green-800 hover:scale-105 transition-all " onClick={()=>{window.open('https://github.com/not-AdityaRawat/IP-Survivor-s-Kit-3.0','_blank')}}>
            Contribute To The Project <FaStar color="gold" className="inline-block"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
