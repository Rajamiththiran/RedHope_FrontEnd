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
  const handleRequestBlood = () => handleNavigation("/request-blood");
  const handleExploreMore = () => handleNavigation("/common-dashboard");

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-red-100 to-white overflow-hidden">
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
      <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-8">
        <div className="flex flex-col lg:flex-row justify-center items-stretch space-y-8 lg:space-y-0 lg:space-x-8 z-10 w-full max-w-6xl">
          {/* Description Card */}
          <div className="bg-gradient-to-br from-[#5b5b5b] to-[#3d3d3d] bg-opacity-80 rounded-lg shadow-lg p-8 w-full lg:w-1/2 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-center mb-6 text-white">
                RedHope: Connecting Requesters, Donors, and Hospitals for Blood
                Donation
              </h1>
              <p className="text-center mb-6 text-white">
                RedHope is a web-based platform that connects requesters,
                donors, and hospitals for seamless blood donation. Requesters
                can request blood without logging in or registering. Donors and
                hospitals can register to track their activities and
                contributions.
              </p>
            </div>
            <div className="text-center">
              <Button
                className="from-[#5b5b5b] text-white transition-all duration-200 ease-in-out transform hover:scale-105"
                onClick={handleRequestBlood}
              >
                Request Blood
              </Button>
            </div>
          </div>
          {/* Login and Register Card */}
          <div className="bg-gradient-to-br from-[#5b5b5b] to-[#3d3d3d] bg-opacity-80 rounded-lg shadow-lg p-8 w-full lg:w-1/2 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-center mb-6 text-white">
                Join RedHope
              </h2>
              <p className="text-center mb-8 text-white">
                Join our community and make a difference in someone`s life
                today.
              </p>
            </div>
            <div className="space-y-4">
              <Button
                className="w-full from-[#5b5b5b] text-white transition-all duration-200 ease-in-out transform hover:scale-105"
                onClick={handleLogin}
              >
                Login
              </Button>
              <p className="text-center text-white">
                If you haven`t got an account:
              </p>
              <Button
                className="w-full bg-red-500 text-white hover:bg-red-600 transition-all duration-200 ease-in-out transform hover:scale-105"
                onClick={handleRegisterDonor}
              >
                Register as Donor
              </Button>
              <Button
                className="w-full bg-red-500 text-white hover:bg-red-600 transition-all duration-200 ease-in-out transform hover:scale-105"
                onClick={handleRegisterHospital}
              >
                Register as Hospital
              </Button>
            </div>
          </div>
        </div>
        {/* Explore More Button */}
        <div className="w-full max-w-6xl px-4 mt-8">
          <button
            className="w-full bg-[#5b5b5b] text-white text-2xl font-bold py-6 px-16 rounded-full shadow-lg hover:bg-[#4a4a4a] transition-all duration-200 ease-in-out transform hover:scale-105"
            onClick={handleExploreMore}
          >
            Explore More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
