import React from 'react'
import { TbError404Off } from "react-icons/tb";
import { PiAlienDuotone  } from "react-icons/pi";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center ">
        <TbError404Off size={204}/>
      {/* <div className=""> */}
        {/* Large 404 text */}
        

        {/* Broken robot illustration */}
        <div className="flex flex-col items-center">
          <div className="bg-teal-700 p-5 rounded-lg shadow-lg">
            <div className="text-white justify-center items-center">
              <PiAlienDuotone  className="text-6xl mb-3 justify-self-center"/>
              <h2 className="text-xl font-bold mb-1 text-wrap">You have Entered Uncharted Territories</h2>
              <p className="text-gray-200">
                This Page has not been added yet!
              </p>
            </div>
          {/* </div> */}
        </div>
      </div>

      {/* Go back home button */}
      <button
        className="mt-6 bg-yellow-400 text-black font-medium py-2 px-4 rounded hover:bg-blue-600 transition"
        onClick={() => (window.location.href = "/")}
      >
        Go Back Home
      </button>
    </div>
  )
}

export default Error