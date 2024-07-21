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
    request_date: "",
    description: "",
  });
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await getRequestNotifications();
      setNotifications(data);
    } catch (err) {
      setError("Failed to fetch notifications");
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const response = await createBloodRequest(formData);
      console.log("Request created successfully", response);
      // Clear form or show success message
      setFormData({
        requester_name: "",
        requester_email: "",
        blood_type_requested: "",
        urgency_level: "",
        phone_number: "",
        country_code: "",
        location: "",
        request_date: "",
        description: "",
      });
      // Fetch updated notifications
      fetchNotifications();
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
        <BloodCell className="absolute top-1/6 left-1/6 animate-float-delay-1" />
        <BloodCell className="absolute top-3/4 right-1/6 animate-float" />
        <BloodCell className="absolute bottom-1/6 left-3/4 animate-float-delay-2" />
      </div>
      <div
        className={`relative z-10 transition-page ${
          isVisible ? "page-enter-active" : "page-enter"
        }`}
      >
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
                  type="text"
                  required
                  onChange={handleChange}
                  value={formData.blood_type_requested}
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
                label="Request Date"
                id="request_date"
                type="datetime-local"
                required
                onChange={handleChange}
                value={formData.request_date}
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

            <h3 className="text-xl font-bold mt-8 mb-4">Notifications</h3>
            {notifications.length > 0 ? (
              <ul className="space-y-2">
                {notifications.map((notification, index) => (
                  <li key={index} className="p-2 bg-red-100 rounded">
                    {notification.message}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No notifications</p>
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
