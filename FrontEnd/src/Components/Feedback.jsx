import React, { useState } from "react";
import { VscFeedback } from "react-icons/vsc";
import { BiSolidParty } from "react-icons/bi";

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    rating: "",
    feedback: "",
    bugReport: "",
    choice: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [contribute, setcontribute] = useState(false)
  const handleOptions=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if(e.target.value === "Yes" || "Maybe"){
      setcontribute(!contribute);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
//https://docs.google.com/forms/d/e/1FAIpQLSdBrO7xaLonWCBlxMBZVWEmYnCxuxMiPxKd2mK9rBxz9aUpmw/viewform?usp=pp_url&entry.1223500353=name&entry.950711038=5&entry.2111188053=feedback&entry.971845161=report&entry.1941915455=Yes
    const formUrl =
      "https://docs.google.com/forms/d/e/1FAIpQLSdBrO7xaLonWCBlxMBZVWEmYnCxuxMiPxKd2mK9rBxz9aUpmw/formResponse";

    const formBody = new URLSearchParams({
      "entry.1223500353": formData.name, 
      "entry.950711038": formData.rating,
      "entry.2111188053": formData.feedback, 
      "entry.971845161": formData.bugReport, 
      "entry.1941915455": formData.choice, 
    });

    setIsSubmitting(true);

    try {
      const response = await fetch(formUrl, {
        method: "POST",
        body: formBody,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert("Thank you for your feedback!");
      setFormData({
        name: "",
        rating: "",
        feedback: "",
        bugReport: "",
        choice: "",
      });
    } catch (error) {
      // console.error("Error submitting form:", error);
      alert("Thank You for your Feedback!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-purple-500 p-4 rounded-lg shadow-md flex flex-col items-center">
      <h2 className="font-bold mb-4 text-2xl">
        Feedback Form <VscFeedback className="inline-block" />
      </h2>
      <form onSubmit={handleSubmit} autoComplete="off" className="w-full max-w-md space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-white mb-1">
            Your Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 rounded border"
            disabled={isSubmitting}
            placeholder="Kindly Enter Your Name"
          />
        </div>

        {/* Rating Field */}
        <div>
          <label htmlFor="rating" className="block text-white mb-1">
            Rate the project (out of 5):
          </label>
          <select
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
            className="w-full p-2 rounded border"
            disabled={isSubmitting}
          >
            <option value="" disabled>
              Select a rating
            </option>
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>
                {star}
              </option>
            ))}
          </select>
        </div>

        {/* Feedback Field */}
        <div>
          <label htmlFor="feedback" className="block text-white mb-1">
           Kindly Provide your Feedback:
          </label>
          <textarea
            id="feedback"
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            required
            className="w-full p-2 rounded border"
            disabled={isSubmitting}
            placeholder="Help this website improve"
          />
        </div>

        {/* Bug Report Field */}
        <div>
          <label htmlFor="bugReport" className="block text-white mb-1">
            Report a Bug or issue:
          </label>
          <textarea
            id="bugReport"
            name="bugReport"
            value={formData.bugReport}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            placeholder="Notify any bug related to responsiveness, backend server issue, any spammer, or others"
            disabled={isSubmitting}
          />
        </div>

        {/* Multiple Choice Field */}
        <div>
          <label className="block text-white mb-1">Would you like to Contribute to the project:</label>
          <div className="space-y-2">
            {["Yes", "No", "Maybe"].map((option, index) => (
              <label key={index} className="text-white flex items-center">
                <input
                  type="radio"
                  name="choice"
                  value={option}
                  checked={formData.choice === option}
                  onChange={handleOptions}
                  required
                  className="mr-2"
                  disabled={isSubmitting}
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className={`bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          Submit
        </button>
        {contribute && <button
          type="submit"
          className={`bg-yellow-400 hover:bg-yellow-500  text-black font-bold py-2 px-4 rounded w-full`}
          disabled={isSubmitting}
        >
          Contribute to the project <BiSolidParty color="black" className="inline-block"/>
        </button>}
      </form>
    </div>
  );
};

export default Feedback;
