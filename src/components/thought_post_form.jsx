import { useEffect, useState } from "react";
import { createThought } from "../auth_service";

const ThoughtPostForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    thought: "",
  });
  const [error, setError] = useState("");
  const [donorInfo, setDonorInfo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const storedDonorInfo = localStorage.getItem("donorInfo");
    console.log("Stored donor info:", storedDonorInfo);
    if (storedDonorInfo) {
      try {
        const parsedInfo = JSON.parse(storedDonorInfo);
        console.log("Parsed donor info:", parsedInfo);
        setDonorInfo(parsedInfo);
      } catch (e) {
        console.error("Error parsing donor info:", e);
        setError("Error retrieving donor information. Please log in again.");
      }
    } else {
      console.log("No donor info found in localStorage");
      setError("Donor information not found. Please log in again.");
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      console.log("Current donor info:", donorInfo);
      if (!donorInfo) {
        throw new Error("Donor information not found. Please log in again.");
      }
      const donor_id = donorInfo.id;
      const thoughtData = {
        ...formData,
        donor_id,
      };
      console.log("Submitting thought data:", thoughtData);
      const response = await createThought(thoughtData);
      console.log("Thought post created:", response);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onSubmit(response);
      }, 1500);
    } catch (error) {
      console.error("Error creating thought post:", error);
      setError(
        error.message || "Failed to create thought post. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error) {
    return (
      <div className="text-red-500 bg-red-100 border border-red-400 rounded p-4 w-full max-w-4xl mx-auto">
        {error}
      </div>
    );
  }

  return (
    <div className="relative bg-white p-8 rounded-lg shadow-md w-full max-w-6xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className={`space-y-6 transition-all duration-500 ease-in-out ${
          isSubmitting ? "opacity-50" : "opacity-100"
        }`}
      >
        <div>
          <label
            htmlFor="title"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
            required
            placeholder="Enter your thought title here..."
          />
        </div>
        <div>
          <label
            htmlFor="thought"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Thought Content
          </label>
          <textarea
            name="thought"
            id="thought"
            value={formData.thought}
            onChange={handleInputChange}
            rows={10}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
            required
            placeholder="Enter your thought content here..."
          ></textarea>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex justify-center py-3 px-6 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Posting..." : "Post Thought"}
          </button>
        </div>
      </form>

      {showSuccess && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
          <div className="bg-green-500 text-white px-8 py-4 rounded-lg shadow-lg text-xl font-semibold">
            Thought posted successfully!
          </div>
        </div>
      )}
    </div>
  );
};

export default ThoughtPostForm;
