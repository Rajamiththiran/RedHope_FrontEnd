import { useState } from "react";
import Button from "./button"; // Adjust the import path as needed

const Request = () => {
  const [formData, setFormData] = useState({
    requester_name: "",
    requester_email: "",
    request_date: "",
    blood_type_requested: "",
    urgency_level: "",
    description: "",
    phone_number: "",
    country_code: "",
    location: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center mb-4">Request Blood</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex space-x-4">
            <InputField
              label="Requester Name"
              id="requester_name"
              type="text"
              required
              onChange={handleChange}
              className="flex-1"
            />
            <InputField
              label="Requester Email"
              id="requester_email"
              type="email"
              required
              onChange={handleChange}
              className="flex-1"
            />
          </div>
          <InputField
            label="Request Date"
            id="request_date"
            type="datetime-local"
            required
            onChange={handleChange}
          />
          <div className="flex space-x-4">
            <InputField
              label="Country Code"
              id="country_code"
              type="text"
              required
              onChange={handleChange}
              className="flex-1"
            />
            <InputField
              label="Phone Number"
              id="phone_number"
              type="tel"
              required
              onChange={handleChange}
              className="flex-1"
            />
          </div>
          <div className="flex space-x-4">
            <InputField
              label="Blood Type Requested"
              id="blood_type_requested"
              type="text"
              required
              onChange={handleChange}
              className="flex-1"
            />
            <InputField
              label="Urgency Level"
              id="urgency_level"
              type="text"
              required
              onChange={handleChange}
              className="flex-1"
            />
          </div>
          <InputField
            label="Description"
            id="description"
            type="textarea"
            required
            onChange={handleChange}
          />
          <InputField
            label="Location"
            id="location"
            type="text"
            required
            onChange={handleChange}
          />
          <Button className="w-full" type="submit">
            Submit Request
          </Button>
        </form>
      </div>
    </div>
  );
};

const InputField = ({
  label,
  id,
  type,
  required,
  onChange,
  className = "",
}) => (
  <div className={className}>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}:
    </label>
    {type === "textarea" ? (
      <textarea
        id={id}
        name={id}
        className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        required={required}
        onChange={onChange}
      />
    ) : (
      <input
        type={type}
        id={id}
        name={id}
        className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        required={required}
        onChange={onChange}
      />
    )}
  </div>
);

export default Request;
