import React from "react";
import Courses from "./Course";
import ChosenCourse from "./ChosenCourse";
import Unit from './Unit'

const Home = () => {


  return (
    <div className="min-h-screen p-8">
      <div className="sm:grid sm:grid-cols-2 sm:gap-10">
        <div className="mb-10">
          <Courses
          />
            <ChosenCourse
              chosencourse="BTech"
            />
        </div>
        <div className="mt-10">
      <Unit/>
        </div>
      </div>
    </div>
  );
};

export default Home;