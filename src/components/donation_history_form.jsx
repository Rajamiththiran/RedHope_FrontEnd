import React from "react";

const DonationHistoryForm = ({ onSubmit, onCancel, initialData = {} }) => {
  const [formData, setFormData] = React.useState({
    donation_date: "",
    address: "",
    blood_type: "",
    volume: "",
    donation_type: "",
    description: "",
    ...initialData,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="date"
        name="donation_date"
        value={formData.donation_date}
        onChange={handleInputChange}
        className="w-full p-2 border border-n-3 rounded-md focus:outline-none focus:ring-1 focus:ring-color-1 bg-white text-n-7"
        placeholder="Donation Date"
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
      <div className="flex justify-end space-x-2">
        <button
          type="submit"
          className="bg-color-1 hover:bg-color-2 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Submit
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

export default DonationHistoryForm;
