import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const Form = () => {
  // State Variables
  const [textfield, setTextfield] = useState(""); // Holds search query
  const [data, setData] = useState([]); // Holds subject data
  const [filteredOptions, setFilteredOptions] = useState([]); // Filtered results
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [uploadedBy, setUploadedBy] = useState("");
  const [subjectname, setSubjectname] = useState("");
  const [unitname, setUnitname] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Fetch subject data
  const fetchData = async () => {
    try {
      const response = await fetch("/subjects.json");
      if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
      const subjects = await response.json();
      setData(subjects);
      setFilteredOptions(subjects); // Display all options by default
    } catch (err) {
      console.error("Error fetching subjects:", err.message);
      setError("Failed to load subjects. Please try again.");
    }
  };

  // Trigger fetch on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Handle subject search
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setTextfield(query);

    if (!data || data.length === 0) {
      setFilteredOptions([]); // No data available
      return;
    }

    // Filter based on subject name
    const filtered = data.filter((subject) =>
      subject.name?.toLowerCase().includes(query)
    );

    setFilteredOptions(filtered);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic validation
    if (
      !file ||
      !title.trim() ||
      !uploadedBy.trim() ||
      !textfield.trim() ||
      unitname === "Select Unit"
    ) {
      setError("Please fill in all fields and upload a file.");
      setLoading(false);
      return;
    }

    // File validation
    if (file.size > 30 * 1024 * 1024) {
      setError("File size must not exceed 30MB.");
      setLoading(false);
      return;
    }
    if (!["application/pdf"].includes(file.type)) {
      setError("Only PDF files are allowed.");
      setLoading(false);
      return;
    }

    try {
      // Step 1: Upload file
      const formData = new FormData();
      formData.append("notes", file);

      const uploadResponse = await fetch("https://ipk3-0-backend.onrender.com/contribute", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload file to Google Drive.");
      }

      const uploadData = await uploadResponse.json();
      const embededLink = uploadData.fileUrl; // Uploaded file link

      // Step 2: Save note details
      const noteDetails = {
        title,
        uploadedBy,
        embeded: embededLink,
        subjectname,
        unitname,
      };

      const saveResponse = await fetch("https://ipk3-0-backend.onrender.com/contribute/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteDetails),
      });

      if (!saveResponse.ok) {
        throw new Error("Failed to save note details.");
      }

      alert("Note uploaded successfully!");
      navigate(-1); // Redirect after success
    } catch (err) {
      console.error("Error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg border border-gray-300 relative">
      <h2 className="text-2xl font-bold mb-4 text-center">Upload Notes</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data" autocomplete="off">
        <div className="mb-4">
          <label htmlFor="title" className="block font-semibold mb-2">
            Note Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Enter note title"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="uploadedBy" className="block font-semibold mb-2">
            Uploaded By:
          </label>
          <input
            type="text"
            id="uploadedBy"
            value={uploadedBy}
            onChange={(e) => setUploadedBy(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Your name"
            required
          />
        </div>

        {/* Subject Search */}
        <div className="mb-4 relative">
          <label htmlFor="textfield" className="block font-semibold mb-2">
            Subject Name:
          </label>
          <input
            type="text"
            id="textfield"
            value={textfield}
            onChange={handleSearch}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="e.g., Mathematics"
            required
          />
          {textfield && filteredOptions.length > 0 && (
            <ul className="absolute bg-white border border-gray-300 rounded mt-1 max-h-40 overflow-auto w-full z-10">
              {filteredOptions.map((subject) => (
                <li
                  key={subject.id}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setTextfield(subject.name);
                    setSubjectname(subject.name);
                    setFilteredOptions([]);
                  }}
                >
                  {subject.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="unitname" className="block font-semibold mb-2">
            Unit Name:
          </label>
          <select
            id="unitname"
            className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring focus:ring-yellow-500"
            value={unitname}
            onChange={(e) => setUnitname(e.target.value)}
          >
            <option>Select Unit</option>
            <option>UNIT-1</option>
            <option>UNIT-2</option>
            <option>UNIT-3</option>
            <option>UNIT-4</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="file" className="block font-semibold mb-2">
            Upload File:
          </label>
          <input
            type="file"
            id="file"
            onDragEnter={handleFileChange}
            onChange={handleFileChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-green-500 text-white px-4 py-2 rounded-md font-semibold ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"
          }`}
        >
          {loading ? "Uploading..." : "Upload Note"}
        </button>
      </form>
    </div>
  );
};

export default Form;
