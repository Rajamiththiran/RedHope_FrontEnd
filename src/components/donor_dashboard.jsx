// File: donor_dashboard.jsx
import { useEffect, useState } from "react";
import BloodCell from "./BloodCell";
import SideNavMenu from "./SideNavMenu";
import SideNavToggle from "./SideNavToggle";
import Button from "./button";
import DonationHistoryTable from "./donation_histoy_table";
import Popup from "./popup";
import ThoughtPostForm from "./thought_post_form";

const DonorDashboard = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [showThoughtPostPopup, setShowThoughtPostPopup] = useState(false);
  const [notification, setNotification] = useState(null);
  const [recentThoughts, setRecentThoughts] = useState([]);

  useEffect(() => {
    document.body.classList.add("donor-dashboard");
    return () => {
      document.body.classList.remove("donor-dashboard");
    };
  }, []);

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  const handlePostThought = () => {
    setShowThoughtPostPopup(true);
  };

  const handleThoughtPostSubmit = (thoughtData) => {
    console.log("Thought post submitted:", thoughtData);
    setShowThoughtPostPopup(false);

    // Update UI with new thought
    setRecentThoughts((prevThoughts) => [
      thoughtData,
      ...prevThoughts.slice(0, 4),
    ]);

    // Show notification
    setNotification("Thought posted successfully!");
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-white flex flex-col relative overflow-hidden">
      <SideNavToggle isOpen={isSideNavOpen} onClick={toggleSideNav} />
      <SideNavMenu
        isOpen={isSideNavOpen}
        onClose={() => setIsSideNavOpen(false)}
      />

      <div className="flex-grow flex items-center justify-center p-4">
        <div className="absolute inset-0">
          <BloodCell
            className="absolute top-1/12 left-1/12 animate-float z-1"
            size={14}
          />
          <BloodCell
            className="absolute top-3/4 right-1/12 animate-float-delay-1 z-1"
            size={16}
          />
          <BloodCell
            className="absolute bottom-1/6 left-1/2 animate-float-delay-2 z-1"
            size={12}
          />
          <BloodCell
            className="absolute top-1/5 right-1/4 animate-float z-1"
            size={15}
          />
          <BloodCell
            className="absolute bottom-1/3 left-1/6 animate-float-delay-1 z-1"
            size={13}
          />
          <BloodCell
            className="absolute top-2/3 right-1/3 animate-float-delay-2 z-1"
            size={14}
          />
        </div>
        <div className="bg-gradient-to-br from-[#5b5b5b] to-[#3d3d3d] bg-opacity-90 rounded-lg shadow-lg p-10 w-full max-w-3xl flex flex-col justify-between z-5">
          <h1 className="text-4xl font-bold text-red-400 mb-6 text-center">
            Donor Dashboard
          </h1>

          {notification && (
            <div className="bg-green-500 text-white p-4 rounded-md mb-4 transition-all duration-300 ease-in-out">
              {notification}
            </div>
          )}

          <div className="bg-[#8c8c8c] p-8 rounded-lg mb-8">
            <h2 className="text-3xl font-semibold text-red-300 mb-4 text-center">
              Your Donation History
            </h2>
            <DonationHistoryTable />
          </div>

          {recentThoughts.length > 0 && (
            <div className="bg-[#8c8c8c] p-8 rounded-lg mb-8">
              <h3 className="text-2xl font-semibold text-red-300 mb-4">
                Recent Thoughts
              </h3>
              <ul className="space-y-2">
                {recentThoughts.map((thought, index) => (
                  <li key={index} className="text-white">
                    <span className="font-bold">{thought.title}</span> -{" "}
                    {new Date(thought.created_at).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-center space-y-6 sm:space-y-0 sm:space-x-6">
            <Button
              className="text-white transition-colors text-lg py-3 px-8"
              onClick={handlePostThought}
            >
              Post A Thought
            </Button>
          </div>
        </div>
      </div>
      <Popup
        isOpen={showThoughtPostPopup}
        onClose={() => setShowThoughtPostPopup(false)}
        title="Post a Thought"
      >
        <ThoughtPostForm
          onSubmit={handleThoughtPostSubmit}
          onCancel={() => setShowThoughtPostPopup(false)}
        />
      </Popup>
    </div>
  );
};

export default DonorDashboard;
