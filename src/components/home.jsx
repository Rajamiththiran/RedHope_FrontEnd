import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import BloodCell from "./BloodCell";
import Button from "./button";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = useCallback(
    (path) => {
      document.body.classList.add("page-exit");
      setTimeout(() => {
        navigate(path);
        document.body.classList.remove("page-exit");
      }, 300);
    },
    [navigate]
  );

  const handleLogin = () => handleNavigation("/login");
  const handleRegisterDonor = () => handleNavigation("/donor-register");
  const handleRegisterHospital = () => handleNavigation("/hospital-register");

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-red-100 to-white overflow-hidden flex justify-center items-center">
      <div className="absolute inset-0">
        <BloodCell
          className="absolute top-1/12 left-1/12 animate-float"
          size={14}
        />
        <BloodCell
          className="absolute top-3/4 right-1/12 animate-float-delay-1"
          size={16}
        />
        <BloodCell
          className="absolute bottom-1/6 left-1/2 animate-float-delay-2"
          size={12}
        />
        <BloodCell
          className="absolute top-1/5 right-1/4 animate-float"
          size={15}
        />
        <BloodCell
          className="absolute bottom-1/3 left-1/6 animate-float-delay-1"
          size={13}
        />
        <BloodCell
          className="absolute top-2/3 right-1/3 animate-float-delay-2"
          size={14}
        />
        <BloodCell
          className="absolute top-1/8 left-3/4 animate-float-delay-1"
          size={18}
        />
        <BloodCell
          className="absolute top-5/6 right-1/2 animate-float"
          size={11}
        />
        <BloodCell
          className="absolute bottom-1/4 left-5/6 animate-float-delay-2"
          size={15}
        />
        <BloodCell
          className="absolute top-2/5 right-1/6 animate-float-delay-1"
          size={13}
        />
        <BloodCell
          className="absolute bottom-1/2 left-1/3 animate-float"
          size={16}
        />
        <BloodCell
          className="absolute top-11/12 right-2/3 animate-float-delay-2"
          size={12}
        />
        <BloodCell
          className="absolute top-1/6 left-11/12 animate-float"
          size={17}
        />
        <BloodCell
          className="absolute bottom-2/3 right-5/6 animate-float-delay-1"
          size={14}
        />
        <BloodCell
          className="absolute top-7/8 left-2/5 animate-float-delay-2"
          size={15}
        />
      </div>

      <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-8 w-full max-w-md z-10">
        <h1 className="text-3xl font-bold text-center mb-6 text-red-600">
          Welcome to RedHope
        </h1>
        <p className="text-center mb-8 text-gray-700">
          Join our community and make a difference in someone`s life today.
        </p>
        <div className="space-y-4">
          <Button
            className="w-full bg-red-500 hover:bg-red-600 text-white transition-all duration-200 ease-in-out transform hover:scale-105"
            onClick={handleLogin}
          >
            Login
          </Button>
          <p className="text-center text-gray-600">
            If you haven`t got an account:
          </p>
          <Button
            className="w-full bg-red-100 hover:bg-red-200 text-red-700 transition-all duration-200 ease-in-out transform hover:scale-105"
            onClick={handleRegisterDonor}
          >
            Register as Donor
          </Button>
          <Button
            className="w-full bg-red-100 hover:bg-red-200 text-red-700 transition-all duration-200 ease-in-out transform hover:scale-105"
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
