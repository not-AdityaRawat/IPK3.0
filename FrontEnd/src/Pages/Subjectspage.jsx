import React from "react";
import Courses from "../Components/Course";
import ChosenCourse from "../Components/ChosenCourse";
import Subjects from "../Components/Subjects";
import { useParams } from "react-router";

const Subjectspage = () => {
  const {sem,Branch,course}=useParams();
  return (
    <div>
      <div className="min-h-screen p-8">
        <div className="sm:grid sm:grid-cols-2 sm:gap-10">
          <div className="mb-10">
            <Courses />
              <ChosenCourse chosencourse={course}/>
          </div>
          <div className="mt-10">
              <Subjects
                chosencourse={course}
                Semester={sem}
                Branch={Branch}
              />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subjectspage;
