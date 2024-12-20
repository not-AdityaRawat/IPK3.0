import React from 'react'
import Courses from '../Components/Course'
import ChosenCourse from '../Components/ChosenCourse'
import { useParams } from 'react-router'
import ChosenSubject from '../Components/ChosenSubject'

const Unitpage = () => {
    const {sem,Branch,course,subject}=useParams();
  return (
    <div>
      <div className="min-h-screen p-8">
        <div className="sm:grid sm:grid-cols-2 sm:gap-10">
          <div className="mb-10">
            <Courses />
              <ChosenCourse chosencourse={course}/>
          </div>
          <div className="mt-10">
              <ChosenSubject subjectname={subject}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Unitpage