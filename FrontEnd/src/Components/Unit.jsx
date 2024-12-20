import React, { useState, useEffect } from "react";
import { FiExternalLink, FiThumbsUp, FiArrowLeftCircle } from "react-icons/fi";
import { IoMdThumbsUp } from "react-icons/io";
import { useNavigate } from "react-router";

const Unit = (props) => {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [upvotedUnits, setUpvotedUnits] = useState({});
  const navigate = useNavigate();

  // Fetch unit notes from the server
  const fetchUnits = async () => {
    try {
      const response = await fetch("https://ipk3-0-backend.onrender.com/units"); // Route to fetch units
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      const data = await response.json();

      // Transform BSON-serialized integers to plain numbers
      const transformedData = data.map((unit) => ({
        ...unit,
        upvotes: parseInt(unit.upvotes?.$numberInt || unit.upvotes, 10), // Ensure `upvotes` is a plain number
      }));

      setUnits(transformedData);
    } catch (err) {
      console.error("Error fetching notes:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  const filteredUnits = units.filter((unit) => {
    return (
      unit.isValid &&
      unit.subjectname === props.subjectname &&
      unit.unitname === props.unitname
    );
  });

  const countUps = async (currentUpvotes, unitId) => {
    if (upvotedUnits[unitId]) return;

    setUpvotedUnits((prev) => ({
      ...prev,
      [unitId]: true,
    }));

    try {
      const response = await fetch(
        `https://ipk3-0-backend.onrender.com/contribute/upvote/${unitId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ increment: 1 }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update upvotes. Status: ${response.status}`);
      }

      setUnits((prevUnits) =>
        prevUnits.map((unit) =>
          unit.id === unitId ? { ...unit, upvotes: currentUpvotes + 1 } : unit
        )
      );
    } catch (err) {
      console.error("Error updating upvotes:", err.message);
      setError(err.message);
    }
  };

  return (
    <>
      <div className="bg-teal-700 p-6 rounded-lg mx-auto max-w-4xl">
        <h1 className="text-2xl text-white font-semibold mb-6 text-center">
          <FiArrowLeftCircle
            className="cursor-pointer inline-block"
            onClick={() => navigate(-1)}
          />{" "}
          {props.subjectname}
        </h1>

        <div className="mb-4">
          <button
            className="bg-green-200 text-green-800 px-4 py-2 rounded-xl font-semibold flex items-center gap-2 shadow-md"
            onClick={() => navigate(-1)}
          >
            {props.unitname} <span className="text-lg rotate-90">&gt;</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-96 scrollbar-thin scrollbar-thumb-zinc-900 scrollbar-track-transparent scrollbar-thumb-rounded-full">
          {loading ? (
            <p className="text-white font-mono">Loading...</p>
          ) : error ? (
            <p className="text-amber-600 font-semibold text-center">
              Error: {error}
            </p>
          ) : filteredUnits.length > 0 ? (
            filteredUnits.map((unit, index) => (
              <div
                key={index}
                className="bg-green-100 p-4 rounded-lg shadow-md break-words flex flex-col justify-between h-full"
              >
                <div>
                  <h2 className="text-lg font-semibold mb-2">{unit.title}</h2>
                  <p className="text-sm text-gray-600 mb-2">
                    Uploaded by {unit.uploadedBy}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-green-800">
                    {/* UPVOTES FEATURE */}
                    {upvotedUnits[unit.id] ? (
                      <button>
                        <IoMdThumbsUp size={20} className="inline-block" />
                        <span>{unit.upvotes}</span>
                      </button>
                    ) : (
                      <button onClick={() => countUps(unit.upvotes, unit.id)}>
                        <FiThumbsUp size={20} className="inline-block" />
                        <span> {unit.upvotes}</span>
                      </button>
                    )}
                  </div>
                  <a
                    href={unit.embeded}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-800 text-xl"
                  >
                    <FiExternalLink />
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white font-mono text-sm">
              No Notes available for the selected Unit.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Unit;
