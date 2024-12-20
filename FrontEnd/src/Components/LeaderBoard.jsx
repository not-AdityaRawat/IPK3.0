import React, { useState, useEffect } from "react";
import { FaGithub } from "react-icons/fa";

const LeaderBoard = () => {
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);
  const [contribution, setcontribution] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://ipk3-0-backend.onrender.com/Leaderboard`);
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      console.log("this is response", response);
      const data = await response.json();
      setcontribution(data);
    } catch (err) {
      console.error("Error fetching contributions:", err);
      seterror(err.message || "An error occurred");
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full cursor-pointer sm:w-1/2 md:w-3/4 space-y-4 p-4 bg-white shadow-md rounded-xl hover:shadow-xl hover:transition-shadow duration-300 hover:shadow-amber-400 hover">
      <h1 className="font-mono font-bold text-xl max-h-80 text-center text-gray-800">
        Contributors <FaGithub className="inline-block" />
      </h1>
      <div className="max-h-52 md:max-h-80 overflow-y-scroll p-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent scrollbar-thumb-rounded-full">
        <ul className="list-decimal">
          {loading ? (
            <li>Fetching Data...</li>
          ) : error ? (
            <li>Error: {error}</li>
          ) : (
            Object.entries(contribution).map(([contributor, counts]) => (
              <li key={contributor} className="mb-3">
                <span className="text-base font-semibold">{contributor} :</span>{" "}
                {counts} Notes Uploaded
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default LeaderBoard;
