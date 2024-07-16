import { useState } from "react";
import DecoratorSvg from "../assets/svg/DecoratorSvg";
import Button from "./button";

const DonorRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    country_code: "",
    phone_number: "",
    blood_type: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    // Handle form submission logic here
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen bg-white">
      <div className="w-full lg:w-2/5 p-4 md:p-8 lg:p-12">
        <DecoratorSvg className="w-full h-auto" />
      </div>
      <div className="w-full lg:w-3/5 p-4 md:p-8 lg:p-12 flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 w-full max-w-xl lg:max-w-2xl">
          <h2 className="text-3xl font-bold text-center mb-4">
            Get started completely free »
          </h2>
          <p className="text-center mb-6 text-n-3">
            Already have an account?{" "}
            <a href="/login" className="text-color-1 hover:underline">
              Login
            </a>
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Name"
                id="name"
                type="text"
                required
                onChange={handleChange}
                value={formData.name}
              />
              <InputField
                label="Blood Type"
                id="blood_type"
                type="text"
                required
                onChange={handleChange}
                value={formData.blood_type}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Email"
                id="email"
                type="email"
                required
                onChange={handleChange}
                value={formData.email}
              />
              <InputField
                label="Password"
                id="password"
                type="password"
                minLength="6"
                required
                onChange={handleChange}
                value={formData.password}
              />
            </div>
            <InputField
              label="Address"
              id="address"
              type="text"
              required
              onChange={handleChange}
              value={formData.address}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Country Code"
                id="country_code"
                type="text"
                required
                onChange={handleChange}
                value={formData.country_code}
              />
              <InputField
                label="Phone Number"
                id="phone_number"
                type="text"
                required
                onChange={handleChange}
                value={formData.phone_number}
              />
            </div>
            <Button className="w-full mt-4" type="submit">
              Create Account
            </Button>
          </form>
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
  minLength,
  onChange,
  value,
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-n-4 mb-1">
      {label}:
    </label>
    <input
      type={type}
      id={id}
      name={id}
      className="w-full px-3 py-2 border border-n-3 rounded-md focus:outline-none focus:ring-1 focus:ring-color-1 bg-white text-n-7"
      required={required}
      minLength={minLength}
      onChange={onChange}
      value={value}
    />
  </div>
);

export default DonorRegister;
