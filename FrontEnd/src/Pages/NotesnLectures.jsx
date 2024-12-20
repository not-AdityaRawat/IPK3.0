import React from 'react'
import Courses from '../Components/Course'
import ChosenCourse from '../Components/ChosenCourse'
import { useParams } from 'react-router'
import Unit from '../Components/Unit'
import Lectures from '../Components/Lectures'

const Unitpage = () => {
    const {sem,Branch,course,subject, unit}=useParams();
  return (
    <div>
      <div className="min-h-screen p-8">
        <div className="sm:grid sm:grid-cols-2 sm:gap-10">
          <div className="mb-10">
            <Courses />
              <ChosenCourse chosencourse={course}/>
          </div>
          <div className="mt-10">
              <Unit subjectname={subject} unitname={unit}/>
              <Lectures subjectname={subject} unitname={unit}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Unitpage