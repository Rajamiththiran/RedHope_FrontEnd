import { useEffect, useState } from "react";
import BloodCell from "./BloodCell";
import HospitalSideNavMenu from "./HospitalSideNavMenu";
import HospitalSideNavToggle from "./HospitalSideNavToggle";

const HospitalDashboard = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  useEffect(() => {
    document.body.classList.add("hospital-dashboard");
    return () => {
      document.body.classList.remove("hospital-dashboard");
    };
  }, []);

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex flex-col relative overflow-hidden">
      <HospitalSideNavToggle isOpen={isSideNavOpen} onClick={toggleSideNav} />
      <HospitalSideNavMenu
        isOpen={isSideNavOpen}
        onClose={() => setIsSideNavOpen(false)}
      />
      <div className="flex-grow flex items-center justify-center">
        <div className="absolute inset-0">
          <BloodCell className="absolute top-1/4 left-1/3 animate-float" />
          <BloodCell className="absolute top-1/2 right-1/4 animate-float-delay-1" />
          <BloodCell className="absolute bottom-1/4 left-1/2 animate-float-delay-2" />
          <BloodCell className="absolute top-1/3 right-1/3 animate-float" />
          <BloodCell className="absolute bottom-1/3 left-1/4 animate-float-delay-1" />
          <BloodCell className="absolute top-2/3 right-1/2 animate-float-delay-2" />
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg z-10">
          <h1 className="text-3xl font-bold text-blue-600 mb-4">
            Hospital Dashboard
          </h1>
          <p className="text-gray-700">
            Welcome to your hospital dashboard. Here you can manage blood
            requests and view donor information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;
