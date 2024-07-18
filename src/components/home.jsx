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
        <BloodCell className="absolute top-2/5 right-2/5 animate-float-delay-1" />
        <BloodCell className="absolute bottom-2/5 left-3/5 animate-float" />
        <BloodCell className="absolute top-5/6 right-1/3 animate-float-delay-2" />
        <BloodCell className="absolute top-1/8 left-2/3 animate-float" />
        <BloodCell className="absolute bottom-1/2 right-3/4 animate-float-delay-1" />
        <BloodCell className="absolute top-3/5 left-1/5 animate-float-delay-2" />
      </div>
      <div className="relative container mx-auto px-4 py-12 z-10">
        <h1 className="h1 text-center mb-6 text-red-600 ">
          Welcome to RedHope
        </h1>
        <p className="body-1 text-center mb-12 text-gray-700">
          Join our community and make a difference in someone`s life today.
        </p>
        <div className="flex flex-col items-center space-y-6 mb-12">
          <Button
            className="bg-red-100 hover:bg-red-100 text-black w-full md:w-auto transition-page hover-scale glassmorphism "
            onClick={handleLogin}
          >
            Login
          </Button>
        </div>
        <p className="text-center mb-6 text-gray-600 ">
          If you haven`t got an account,
        </p>
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 justify-center">
          <Button
            className="bg-red-100 hover:bg-red-100 text-black w-full md:w-auto transition-page hover-scale glassmorphism"
            onClick={handleRegisterDonor}
          >
            Register as Donor
          </Button>
          <Button
            className="bg-red-100 hover:bg-red-100 text-black w-full md:w-auto transition-page hover-scale glassmorphism"
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
