import { useState } from "react";
import { Link } from "react-router-dom";
import loginBg from "../assets/photos/loginbg.png"; // Adjust the import path as needed
import Button from "./button";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here
    console.log(formData);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-red-600">
          Login to RedHope
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Email"
            id="email"
            type="email"
            required
            onChange={handleChange}
          />
          <InputField
            label="Password"
            id="password"
            type="password"
            required
            onChange={handleChange}
          />
          <Button
            className="w-full bg-red-500 hover:bg-red-600 text-white transition-all duration-200 ease-in-out transform hover:scale-105"
            type="submit"
          >
            Login
          </Button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/"
            className="text-red-500 hover:text-red-700 transition-colors duration-200"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

const InputField = ({ label, id, type, required, onChange }) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}:
    </label>
    <input
      type={type}
      id={id}
      name={id}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
      required={required}
      onChange={onChange}
    />
  </div>
);

export default Login;
