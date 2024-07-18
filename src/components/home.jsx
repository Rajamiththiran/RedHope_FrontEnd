import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./button";

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Welcome to RedHope
      </h1>
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 justify-center">
        <Button
          className="text-black w-full md:w-auto transition-page"
          onClick={handleRegisterDonor}
        >
          Register as Donor
        </Button>
        <Button
          className="text-black w-full md:w-auto transition-page"
          onClick={handleRegisterHospital}
        >
          Register as Hospital
        </Button>
      </div>
    </div>
  );
};

export default Home;
