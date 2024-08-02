import moment from "moment";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { createEventPost } from "../auth_service";

const EventPostForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    start_time: new Date(),
    end_time: new Date(),
    hospital_name: "",
    location: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [hospitalInfo, setHospitalInfo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedHospitalInfo = localStorage.getItem("hospitalInfo");
    console.log("Stored hospital info:", storedHospitalInfo);
    if (storedHospitalInfo) {
      try {
        const parsedInfo = JSON.parse(storedHospitalInfo);
        console.log("Parsed hospital info:", parsedInfo);
        setHospitalInfo(parsedInfo);
      } catch (e) {
        console.error("Error parsing hospital info:", e);
        setError("Error retrieving hospital information. Please log in again.");
      }
    } else {
      console.log("No hospital info found in localStorage");
      setError("Hospital information not found. Please log in again.");
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date, name) => {
    setFormData({ ...formData, [name]: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      console.log("Current hospital info:", hospitalInfo);
      if (!hospitalInfo) {
        throw new Error("Hospital information not found. Please log in again.");
      }
      const hospital_id = hospitalInfo.id || 1;
      const eventData = {
        ...formData,
        hospital_id,
        start_time: moment(formData.start_time).format(),
        end_time: moment(formData.end_time).format(),
      };
      console.log("Submitting event data:", eventData);
      const response = await createEventPost(eventData);
      console.log("Event post created:", response);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onSubmit(response);
      }, 1500);
    } catch (error) {
      console.error("Error creating event post:", error);
      setError(
        error.message || "Failed to create event post. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  if (error) {
    return (
      <div className="text-red-500">
        {error}
        <button
          onClick={() => navigate("/login")}
          className="ml-2 text-blue-500 underline"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        className={`space-y-4 transition-all duration-500 ease-in-out ${
          isSubmitting ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}
      >
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label
            htmlFor="start_time"
            className="block text-sm font-medium text-gray-700"
          >
            Start Date and Time
          </label>
          <DatePicker
            selected={formData.start_time}
            onChange={(date) => handleDateChange(date, "start_time")}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="end_time"
            className="block text-sm font-medium text-gray-700"
          >
            End Date and Time
          </label>
          <DatePicker
            selected={formData.end_time}
            onChange={(date) => handleDateChange(date, "end_time")}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            value={formData.location}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label
            htmlFor="hospital_name"
            className="block text-sm font-medium text-gray-700"
          >
            Hospital Name
          </label>
          <input
            type="text"
            name="hospital_name"
            id="hospital_name"
            value={formData.hospital_name}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isSubmitting}
          >
            Post Event
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
        </div>
      </form>

      {showSuccess && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-semibold transition-all duration-500 ease-in-out opacity-100 scale-100">
            Event posted successfully!
          </div>
        </div>
      )}
    </div>
  );
};

export default EventPostForm;
