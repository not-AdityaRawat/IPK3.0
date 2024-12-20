import React, { useState } from "react";
import { FaQuestion } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { DiAptana } from "react-icons/di";
import { PiTargetDuotone } from "react-icons/pi"
import { VscFeedback } from "react-icons/vsc";
import Feedback from "./Feedback";

const About = () => {
  const [first, setfirst] = useState(false);
  const handleHover = () => {
    setfirst(true);
  };
  const handleHoverleave = () => {
    setfirst(false);
  };
  return (
    <div className="min-h-screen p-6 sm:p-8">
      {/* Contributors Section */}
      <div className="text-center mb-8">
        <h1
          className={`text-xl sm:text-2xl font-bold ${
            first ? "text-violet-800 " : "text-black"
          }`}
        >
          {first ? "You Can Be a Contributor Too..." : "Project Contributors:"}
        </h1>

        <div className="flex justify-center space-x-4 mt-4">
          <img
            src="https://avatars.githubusercontent.com/u/119433044?v=4"
            alt=""
            className="bg-gray-300 rounded-full w-16 h-16 sm:w-16 sm:h-16 flex items-center justify-center hover:scale-110 transition-transform duration-300 hover:shadow-2xl hover:shadow-purple-600 cursor-pointer"
            onClick={() =>
              window.open("https://github.com/not-AdityaRawat", "__blank")
            }
          />

          <div className="bg-gray-300 rounded-full blur-sm w-16 h-16 sm:w-16 sm:h-16 flex items-center justify-center">
            <FaRegUser
              size={45}
              onMouseOver={handleHover}
              onMouseLeave={handleHoverleave}
            />
          </div>
          <div className="bg-gray-300 rounded-full blur-sm w-16 h-16 sm:w-16 sm:h-16 flex items-center justify-center">
            <FaQuestion
              size={45}
              onMouseOver={handleHover}
              onMouseLeave={handleHoverleave}
            />
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 h-max">
        {/* Features Section */}
        <div className="bg-teal-700 p-4 rounded-lg shadow-md h-max">
          <h2 className="text-2xl font-bold mb-4 text-white text-center">Features <DiAptana className="inline-block"/></h2>
          <ul className="list-disc pl-4 text-white text-md font-mono cursor-pointer">
            <li className="hover:bg-yellow-400 hover:text-black text-center"> Accessibility of notes and video lectures.</li>
            <li className="hover:bg-yellow-400 hover:text-black"> Upload notes and get your name reflected.</li>
            <li className="hover:bg-yellow-400 hover:text-black"> Open for contribution from users.</li>
            <li className="hover:bg-yellow-400 hover:text-black">
               A workplace where users can:
              <ul className="list-decimal pl-10">
                <li>Gather all notes and lecture videos.</li>
                <li>Set timers and mark a datasheet.</li>
                <li>Create a to-do list (feature under development).</li>
              </ul>
            </li>
          </ul>
        </div>

        {/* Aim Section */}
        <div className="bg-teal-700 p-4 rounded-lg shadow-md text-white h-max">
          <h2 className="text-2xl font-bold mb-4 text-center">Aim <PiTargetDuotone className="inline-block"/></h2>
          <p>This website aim is to provide Notes & Lecture videos to students. As the Test season approaches every student has searches for Notes everywhere.</p>
          <p className="mt-3 text-center"><span className="text-lg font-medium text-yellow-500">IP Survivor's Kit</span> provides the a platform where you can 
          upload your Notes and Lectures Videos to your Colleagues and Juniors and get credits of being a Contributor</p>

        </div>

        {/* Feedback Form Section */}
        <Feedback/>
      </div>
    </div>
  );
};

export default About;
