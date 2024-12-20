import React, { useState, useEffect } from "react";
import { useNavigate} from "react-router";

const Subjects = (props) => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const navigate = useNavigate();

  // Fetch data from subjects.json
  const fetchData = async () => {
    try {
      let response = await fetch("/subjects.json");
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      let data = await response.json();
      setSubjects(data);
    } catch (error) {
      console.error("Error Fetching data:", error);
    }
  };

  // Fetch subjects data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Filter subjects based on Semester and Branch
  const filteredSubjects = subjects.filter((subject) => {
    const isCourseMatch = subject.course === props.chosencourse;
    const isSemesterMatch = subject.sem === parseInt(props.Semester);
    const isBranchMatch = Array.isArray(subject.branch)
      ? subject.branch.includes(props.Branch)
      : subject.branch === props.Branch;

    return isCourseMatch && isSemesterMatch && isBranchMatch;
  });
  
  // Handle subject selection
  const handleClick = (subject) => {
    setSelectedSubject(subject.name);
    console.log("Selected Subject:", subject.name);
    // props.onsubjectSelect(subject.name)
    navigate(`/Course/${props.chosencourse}/${props.Semester}/${props.Branch}/Subjects/${subject.name}`)
  };


  return (
    <div className="bg-green-100 p-6 rounded-lg mx-auto">
      <h2 className="text-lg font-semibold mb-4">Choose Subject</h2>
      <div className="space-y-2">
        {/* Display the filtered subjects */}
        {filteredSubjects.length > 0 ? (
          filteredSubjects.map((subject, index) => (
            <button
              key={index}
              className={`w-full py-2 rounded p-2 ${
                selectedSubject === subject
                  ? "bg-green-500 font-semibold text-white"
                  : "bg-white hover:bg-green-400 hover:font-semibold"
              }`}
              onClick={() => handleClick(subject)}
            >
              ({subject.code}) {subject.name}
              <span className="text-xs font-mono text-green-800">
                {" "}
                Credits: {subject.credits}
              </span>
            </button>
          ))
        ) : (
          <p>No subjects available for the selected semester and branch.</p>
        )}
      </div>
    </div>
  );
};

export default Subjects;
