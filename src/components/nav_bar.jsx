import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoSvg from "../assets/svg/LogoSvg";
import Button from "./button";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleRequestBlood = () => {
    // TODO: Implement request blood functionality
    console.log("Request Blood clicked");
  };

  const handleRegisterDonor = () => {
    navigate("/donor-register");
  };

  const handleRegisterHospital = () => {
    navigate("/hospital-register");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <nav className="flex flex-wrap items-center justify-between p-4 bg-white shadow-md">
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={handleLogoClick}
      >
        <LogoSvg className="w-8 h-8" />
        <span className="text-xl font-bold">
          <span className="text-red-500">Red</span>
          <span className="text-green-500">Hope</span>
        </span>
      </div>

      {/* Hamburger menu for mobile */}
      <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Navigation links */}
      <div
        className={`w-full lg:flex lg:items-center lg:w-auto ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4 mt-4 lg:mt-0">
          <Button
            className="text-black w-full lg:w-auto"
            onClick={handleRequestBlood}
          >
            Request Blood
          </Button>
          <Button
            className="text-black w-full lg:w-auto"
            onClick={handleRegisterDonor}
          >
            Register as Donor
          </Button>
          <Button
            className="text-black w-full lg:w-auto"
            onClick={handleRegisterHospital}
          >
            Register as Hospital
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
