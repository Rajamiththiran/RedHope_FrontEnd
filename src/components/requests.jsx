import { useEffect, useState } from "react";
import { createBloodRequest, getRequestNotifications } from "../auth_service";
import BloodCell from "./BloodCell";
import Button from "./button";

const Request = () => {
  const [formData, setFormData] = useState({
    requester_name: "",
    requester_email: "",
    blood_type_requested: "",
    urgency_level: "",
    phone_number: "",
    country_code: "",
    location: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await getRequestNotifications();
      setNotifications(data);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await createBloodRequest({
        ...formData,
        request_date: new Date().toISOString(),
      });
      console.log("Request created successfully", response);
      setSuccess("Blood request created successfully");
      setFormData({
        requester_name: "",
        requester_email: "",
        blood_type_requested: "",
        urgency_level: "",
        phone_number: "",
        country_code: "",
        location: "",
        description: "",
      });
      fetchNotifications(); // Fetch updated notifications after successful request
    } catch (error) {
      setError("Failed to create request. Please try again.");
      console.error("Request creation error:", error);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-red-100 to-white overflow-hidden">
      <div className="absolute inset-0">
        <BloodCell className="absolute top-1/4 left-1/3 animate-float" />
        <BloodCell className="absolute top-1/2 right-1/4 animate-float-delay-1" />
        <BloodCell className="absolute bottom-1/4 left-1/2 animate-float-delay-2" />
        <BloodCell className="absolute top-1/3 right-1/3 animate-float" />
        <BloodCell className="absolute bottom-1/3 left-1/4 animate-float-delay-1" />
        <BloodCell className="absolute top-2/3 right-1/2 animate-float-delay-2" />
      </div>
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
          <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 w-full max-w-2xl">
            <h2 className="text-3xl font-bold text-center mb-4 text-red-600">
              Request Blood
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Requester Name"
                  id="requester_name"
                  type="text"
                  required
                  onChange={handleChange}
                  value={formData.requester_name}
                />
                <InputField
                  label="Requester Email"
                  id="requester_email"
                  type="email"
                  required
                  onChange={handleChange}
                  value={formData.requester_email}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Blood Type Requested"
                  id="blood_type_requested"
                  type="select"
                  required
                  onChange={handleChange}
                  value={formData.blood_type_requested}
                  options={[
                    { value: "A+", label: "A+" },
                    { value: "A-", label: "A-" },
                    { value: "B+", label: "B+" },
                    { value: "B-", label: "B-" },
                    { value: "O+", label: "O+" },
                    { value: "O-", label: "O-" },
                    { value: "AB+", label: "AB+" },
                    { value: "AB-", label: "AB-" },
                  ]}
                />
                <InputField
                  label="Urgency Level"
                  id="urgency_level"
                  type="select"
                  required
                  onChange={handleChange}
                  value={formData.urgency_level}
                  options={[
                    { value: "low", label: "Low" },
                    { value: "medium", label: "Medium" },
                    { value: "high", label: "High" },
                  ]}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Phone Number"
                  id="phone_number"
                  type="tel"
                  required
                  onChange={handleChange}
                  value={formData.phone_number}
                />
                <InputField
                  label="Country Code"
                  id="country_code"
                  type="text"
                  required
                  onChange={handleChange}
                  value={formData.country_code}
                />
              </div>
              <InputField
                label="Location"
                id="location"
                type="text"
                required
                onChange={handleChange}
                value={formData.location}
              />
              <InputField
                label="Description"
                id="description"
                type="textarea"
                onChange={handleChange}
                value={formData.description}
              />
              <Button className="w-full mt-4" type="submit">
                Submit Request
              </Button>
            </form>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            {success && (
              <p className="text-green-500 text-center mt-4">{success}</p>
            )}
          </div>
        </div>
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
  value,
  options,
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}:
    </label>
    {type === "select" ? (
      <select
        id={id}
        name={id}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
        required={required}
        onChange={onChange}
        value={value}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : type === "textarea" ? (
      <textarea
        id={id}
        name={id}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
        required={required}
        onChange={onChange}
        value={value}
      />
    ) : (
      <input
        type={type}
        id={id}
        name={id}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
        required={required}
        onChange={onChange}
        value={value}
      />
    )}
  </div>
);

export default Request;
