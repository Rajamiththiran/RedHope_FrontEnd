import { useEffect, useState } from "react";
import BloodCell from "./BloodCell";
import HospitalSideNavMenu from "./HospitalSideNavMenu";
import HospitalSideNavToggle from "./HospitalSideNavToggle";
import Button from "./button";

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

  const handlePostDonationEvent = () => {
    // Implement post donation event functionality
    console.log("Post donation event clicked");
  };

  const handlePostKnowledge = () => {
    // Implement post knowledge functionality
    console.log("Post knowledge clicked");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex flex-col relative overflow-hidden">
      <HospitalSideNavToggle isOpen={isSideNavOpen} onClick={toggleSideNav} />
      <HospitalSideNavMenu
        isOpen={isSideNavOpen}
        onClose={() => setIsSideNavOpen(false)}
      />
      <div className="flex-grow flex items-center justify-center p-4">
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
        <div className="bg-gradient-to-br from-[#5b5b5b] to-[#3d3d3d] bg-opacity-90 rounded-lg shadow-lg p-10 w-full max-w-3xl flex flex-col justify-between z-10">
          <h1 className="text-4xl font-bold text-blue-400 mb-6 text-center">
            Hospital Dashboard
          </h1>
          <div className="bg-[#8c8c8c] p-8 rounded-lg mb-8">
            <h2 className="text-3xl font-semibold text-blue-300 mb-4 text-center">
              Our Future Work at Hospital Dashboard
            </h2>
            <p className="text-white text-lg text-center">
              In the future, we would like to make subscriptions available for
              private hospitals. This feature will enhance our services and
              provide more opportunities for collaboration within the healthcare
              community.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center space-y-6 sm:space-y-0 sm:space-x-6">
            <Button
              className="text-white transition-colors text-lg py-3 px-8"
              onClick={handlePostDonationEvent}
            >
              Post Donation Event
            </Button>
            <Button
              className="text-white transition-colors text-lg py-3 px-8"
              onClick={handlePostKnowledge}
            >
              Post a Knowledge
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;
