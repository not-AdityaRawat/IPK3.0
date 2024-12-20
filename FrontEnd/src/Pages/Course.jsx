import React from 'react'
import {useParams } from 'react-router'
import Courses from '../Components/Course'
import ChosenCourse from '../Components/ChosenCourse'

const Course = () => {
    const {course}=useParams();
  return (
    <>
    <div className="min-h-screen p-8">
      <div className="sm:grid sm:grid-cols-2 sm:gap-10">
        <div className="mb-10">
          <Courses/>
          <ChosenCourse chosencourse={course}/>
        </div>
        <div className="mt-10"></div>
      </div>
    </div>
    </>
  )
}

export default Course