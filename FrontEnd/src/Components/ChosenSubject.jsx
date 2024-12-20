import React from 'react';
import dropdownBlack from '../icons/dropdownWHite.png'
import {FiArrowLeftCircle} from "react-icons/fi";
import { useNavigate, useParams } from 'react-router';

const ChosenSubject = (props) => {
  const subjects = [
    'UNIT-1',
    'UNIT-2',
    'UNIT-3',
    'UNIT-4'
  ];
  const navigate = useNavigate();
  const handleClick=()=>{
    navigate(-1)
  }
  const { course, sem, Branch, subject} = useParams();

  // const [unitname, setunitname] = useState(null)
  const handleUnit=(unit)=>{
    // props.selectedunit(unit);
    navigate(`/Course/${course}/${sem}/${Branch}/Subjects/${subject}/${unit}`)
    console.log("Unit selected ",unit)
  }

  return (
    <div className="bg-teal-700 p-6 rounded-lg mx-auto">
  <h2 className="text-2xl text-white font-semibold mb-4 text-center hover:cursor-pointer">
    <FiArrowLeftCircle className='cursor-pointer inline-block' onClick={handleClick}/> <span>{props.subjectname}</span></h2>
  <div className="space-y-2">
    {subjects.map((subject, index) => (
      <button
        key={index}
        className="bg-white w-full p-2 rounded text-start hover:bg-green-100 hover:font-semibold flex items-center justify-between"
        onClick={()=>handleUnit(subject)}
        >
        <span>{subject}</span>
        <img src={dropdownBlack} alt="arrow" className="w-3.5 h-3 -rotate-90" />
      </button>
    ))}
  </div>
</div>

  );
};

export default ChosenSubject;
