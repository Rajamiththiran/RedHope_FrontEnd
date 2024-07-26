import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import BloodCell from "./BloodCell";
import Button from "./button";

const CommonDashboard = () => {
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

  const handleGoBack = () => handleNavigation("/");

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
      </div>
      <div className="bg-gradient-to-br from-[#5b5b5b] to-[#3d3d3d] bg-opacity-80 rounded-lg shadow-lg p-8 max-w-2xl w-full z-10">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">
          Common Dashboard
        </h1>
        <p className="text-center mb-8 text-white">
          Welcome to the Common Dashboard. Here you can explore more about our
          blood donation platform and its features.
        </p>
        <div className="flex justify-center">
          <Button
            className="from-[#5b5b5b] text-white transition-all duration-200 ease-in-out transform hover:scale-105"
            onClick={handleGoBack}
          >
            Go Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommonDashboard;
