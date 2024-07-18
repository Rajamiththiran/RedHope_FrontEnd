import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./button";

const BloodCell = ({ className }) => (
  <svg
    className={`w-12 h-12 text-red-500 opacity-20 ${className}`}
    viewBox="0 0 100 100"
  >
    <circle cx="50" cy="50" r="40" fill="currentColor" />
  </svg>
);

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = useCallback(
    (path) => {
      document.body.classList.add("page-exit");
      setTimeout(() => {
        navigate(path);
        document.body.classList.remove("page-exit");
      }, 300); // Adjust this timing to match your transition duration
    },
    [navigate]
  );

  const handleRegisterDonor = () => handleNavigation("/donor-register");
  const handleRegisterHospital = () => handleNavigation("/hospital-register");

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
      <div className="relative container mx-auto px-4 py-8 z-10">
        <h1 className="text-4xl font-bold text-center mb-8 text-red-600">
          Welcome to RedHope
        </h1>
        <p className="text-xl text-center mb-12 text-gray-700">
          Join our community and make a difference in someone`s life today.
        </p>
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 justify-center">
          <Button
            className="bg-red-500 hover:bg-red-600 text-white w-full md:w-auto transition-page"
            onClick={handleRegisterDonor}
          >
            Register as Donor
          </Button>
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white w-full md:w-auto transition-page"
            onClick={handleRegisterHospital}
          >
            Register as Hospital
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
