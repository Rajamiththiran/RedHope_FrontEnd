import moment from "moment";
import { useState } from "react";
import { createEventPost } from "../auth_service";

const EventPostForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    start_time: "",
    end_time: "",
    location: "",
    description: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const hospitalInfo = JSON.parse(localStorage.getItem("hospitalInfo"));
      if (!hospitalInfo || !hospitalInfo.id) {
        throw new Error("Hospital information not found");
      }
      const eventData = {
        ...formData,
        hospital_id: hospitalInfo.id,
        start_time: moment(formData.start_time).format(),
        end_time: moment(formData.end_time).format(),
      };
      const response = await createEventPost(eventData);
      console.log("Event post created:", response);
      onSubmit(response);
    } catch (error) {
      console.error("Error creating event post:", error);
      setError("Failed to create event post. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        className="w-full p-2 border border-n-3 rounded-md focus:outline-none focus:ring-1 focus:ring-color-1 bg-white text-n-7"
        placeholder="Title"
        required
      />
      <input
        type="datetime-local"
        name="start_time"
        value={formData.start_time}
        onChange={handleInputChange}
        className="w-full p-2 border border-n-3 rounded-md focus:outline-none focus:ring-1 focus:ring-color-1 bg-white text-n-7"
        required
      />
      <input
        type="datetime-local"
        name="end_time"
        value={formData.end_time}
        onChange={handleInputChange}
        className="w-full p-2 border border-n-3 rounded-md focus:outline-none focus:ring-1 focus:ring-color-1 bg-white text-n-7"
        required
      />
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleInputChange}
        className="w-full p-2 border border-n-3 rounded-md focus:outline-none focus:ring-1 focus:ring-color-1 bg-white text-n-7"
        placeholder="Location"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        className="w-full p-2 border border-n-3 rounded-md focus:outline-none focus:ring-1 focus:ring-color-1 bg-white text-n-7"
        placeholder="Description"
      ></textarea>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex justify-end space-x-2">
        <button
          type="submit"
          className="bg-color-1 hover:bg-color-2 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Post Event
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-n-3 hover:bg-n-4 text-n-8 font-bold py-2 px-4 rounded transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EventPostForm;
