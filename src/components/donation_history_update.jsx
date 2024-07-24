import moment from "moment";
import { useState } from "react";
import { updateDonationHistory } from "../auth_service";

const DonationHistoryUpdate = ({ onSubmit, onCancel, initialData = {} }) => {
  const [formData, setFormData] = useState({
    donation_date: initialData.donation_date
      ? moment(initialData.donation_date).format("YYYY-MM-DD")
      : "",
    address: initialData.address || "",
    blood_type: initialData.blood_type || "",
    volume: initialData.volume || "",
    donation_type: initialData.donation_type || "",
    description: initialData.description || "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const donorInfo = JSON.parse(localStorage.getItem("donorInfo"));
      if (!donorInfo || !donorInfo.id) {
        throw new Error("Donor information not found");
      }

      const donationData = {
        ...formData,
        donor_id: donorInfo.id,
        volume: parseFloat(formData.volume),
        donation_date: formData.donation_date, // Send the date as is, don't format it again
      };

      console.log("Updating donation data:", donationData);
      const response = await updateDonationHistory(
        initialData.id,
        donationData
      );
      console.log("Donation history updated:", response);
      onSubmit(response);
    } catch (error) {
      console.error("Error updating donation history:", error);
      let errorMessage = "Failed to update donation history. ";
      if (error.response) {
        errorMessage += `Server error: ${error.response.status} - ${
          error.response.data.message || error.response.data.error
        }`;
      } else if (error.request) {
        errorMessage += "No response received from server.";
      } else {
        errorMessage += error.message;
      }
      setError(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="date"
        name="donation_date"
        value={formData.donation_date}
        onChange={handleInputChange}
        className="w-full p-2 border border-n-3 rounded-md focus:outline-none focus:ring-1 focus:ring-color-1 bg-white text-n-7"
        required
      />
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleInputChange}
        className="w-full p-2 border border-n-3 rounded-md focus:outline-none focus:ring-1 focus:ring-color-1 bg-white text-n-7"
        placeholder="Address"
        required
      />
      <input
        type="text"
        name="blood_type"
        value={formData.blood_type}
        onChange={handleInputChange}
        className="w-full p-2 border border-n-3 rounded-md focus:outline-none focus:ring-1 focus:ring-color-1 bg-white text-n-7"
        placeholder="Blood Type"
        required
      />
      <input
        type="number"
        name="volume"
        value={formData.volume}
        onChange={handleInputChange}
        className="w-full p-2 border border-n-3 rounded-md focus:outline-none focus:ring-1 focus:ring-color-1 bg-white text-n-7"
        placeholder="Volume (mL)"
        required
      />
      <input
        type="text"
        name="donation_type"
        value={formData.donation_type}
        onChange={handleInputChange}
        className="w-full p-2 border border-n-3 rounded-md focus:outline-none focus:ring-1 focus:ring-color-1 bg-white text-n-7"
        placeholder="Donation Type"
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
          Update
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

export default DonationHistoryUpdate;
