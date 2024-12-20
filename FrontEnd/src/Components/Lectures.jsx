import React, {useState, useEffect} from 'react'
import {FiExternalLink} from "react-icons/fi";

const Lectures = (props) => {

  const [loading, setLoading] = useState(true); // To track loading state
  const [error, setError] = useState(null); // To handle fetch errors
  const [Lecture, setLecture] = useState([]);

  const fetchLecData = async () => {
    try {
      const responseLec = await fetch('/Lecture.json');
      if (!responseLec.ok) {
        throw new Error(`HTTP Error :${responseLec.status}`);
      }
      const dataLec = await responseLec.json();  // Added await here
      setLecture(dataLec);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setError(error.message);
    } finally {
      setLoading(false); // Ensure loading state is false after data is fetched
    }
  };

  useEffect(() => {
    fetchLecData();
  }, []);
  console.log(Lecture)

  const filteredLectures = Lecture.filter((lec) => {
    return lec.isValid && lec.subjectname === props.subjectname ;
  });

  return (
    <div>
      <div className="mt-10 bg-teal-700 p-6 rounded-lg mx-auto max-w-4xl h-max">
        <h1 className="text-2xl text-white font-semibold mb-6 text-center">
          Lecture Videos
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 max-h-96 h-max overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-900 scrollbar-track-transparent scrollbar-thumb-rounded-full">
          {/* Handling loading state */}
          {loading ? (
            <p className="text-white font-mono ">Loading...</p>
          ) : error ? (
            <p className="text-red-400">Error: {error}</p>
          ) : filteredLectures.length > 0 ? (
            filteredLectures.map((lec, index) => (
              <div
                key={index}
                className="bg-green-100 p-4 rounded-lg shadow-md flex flex-col justify-between"
              >
                <img src={lec.Lecturevidimg} alt={lec.Lecturevidname} className="h-3/4 w-3/4 rounded-md border border-black border-spacing-5 shadow-lg" />
                <p className="text-sm text-gray-600 mb-2">
                  Uploaded by {lec.uploadedBy}
                </p>
                <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 mb-2 font-bold">
                  {lec.Lecturevidname}
                </p>
                
                  {/* lecture upvotes were here but removed */}
                  {/* lecture upvotes were here but removed */}
                    <FiExternalLink size={30} className="text-green-800 inline text-xl cursor-pointer" onClick={()=>{window.open(lec.Lecturevidurl)}}/>
                
                </div>
              </div>
            ))
          ) : (
            <p className="text-white font-mono text-sm">
              No Lectures available for the selected Unit.
            </p>
          )}
        </div>
        </div>
    </div>
  )
}

export default Lectures
