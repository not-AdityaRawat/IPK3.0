import React from "react";
import { useNavigate} from "react-router";

const Course = () => {
  const navigate = useNavigate();
  const seletedCourse=(course)=>{
          if(course ==='BTech'){
              navigate(`/Course/${course}`)
              console.log(course)
          }
          else if(course==='MCA'){
              navigate(`/Course/${course}`)
              console.log(course)
          }
      }
  return (
    <div className="bg-teal-700 p-6 rounded-lg text-center text-white w-fit mx-auto mt-10 shadow-lg border-2 border-black">
      {/* Title */}
      <h1 className="text-lg font-bold mb-4">Choose Course</h1>

      {/* Options */}
      <div className="flex justify-center items-center space-x-8">
        {/* B.Tech Button */}
        <button
          className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-green-400 hover:text-white"
          onClick={() => {
            seletedCourse("BTech");
          }}
        >
          B.Tech
        </button>

        {/* Divider */}
        <div className="h-12 w-px bg-white"></div>

        {/* MCA Button */}
        <button
          className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-green-400 hover:text-white"
          onClick={() => {
            seletedCourse("MCA");
          }}
        >
          MCA
        </button>
      </div>
    </div>
  );
};

export default Course;
