import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

const ChosenCourse = (props) => {
  const BtechSems = [
    "Select Semester",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
  ];
  const McaSems = ["Select Semester", "1", "2", "3", "4"];
  const Subjects = [
    "Computer Science",
    "Information Technology",
    "Electronics",
    "CSAI",
    "CSDS",
  ];

  const navigate = useNavigate();
  const { sem, Branch } = useParams(); // Single destructure for parameters

  // Initialize states with URL parameters or defaults
  const [semester, setSemester] = useState(sem || "Select Semester");
  const [branch, setBranch] = useState(Branch || "Select Branch");

  useEffect(() => {
    console.log(`Updated Semester: ${semester}, Updated Branch: ${branch}`);
  }, [semester, branch]);

  const handleSemesterChange = (e) => {
    const selectedSemester = e.target.value;
    if (selectedSemester !== "Select Semester") {
    setSemester(selectedSemester);
    navigate(`/Course/${props.chosencourse}/${selectedSemester}/${branch}`);
    }
  };

  const handleBranchChange = (e) => {
    const selectedBranch = e.target.value;
    if (selectedBranch !== "Select Branch") {
    setBranch(selectedBranch);
    navigate(`/Course/${props.chosencourse}/${semester}/${selectedBranch}/Subjects`);
    }
  };

  return (
    <div className="bg-teal-700 p-8 w-4/5 mx-auto rounded-lg mt-4 border-2 border-black">
      <h2 className="text-lg font-semibold mb-4 text-white">{props.chosencourse}</h2>
      <div className="space-y-6">
        <select
          className="w-full font-semibold py-2 px-4 bg-white rounded border"
          value={semester}
          onChange={handleSemesterChange}
        >
          {(props.chosencourse === "BTech" ? BtechSems : McaSems).map(
            (sems, index) => (
              <option key={index} value={sems}>
                {sems}
              </option>
            )
          )}
        </select>

        <select
          className="w-full font-semibold py-2 px-4 bg-white rounded border"
          value={branch}
          onChange={handleBranchChange}
        >
          <option value="Select Branch">Select Branch</option>
          {props.chosencourse === "BTech"
            ? Subjects.map((branchName, index) => (
                <option key={index} value={branchName}>
                  {branchName}
                </option>
              ))
            : (
                <option value="Software Engineering">Software Engineering</option>
              )}
        </select>
      </div>
    </div>
  );
};

export default ChosenCourse;
