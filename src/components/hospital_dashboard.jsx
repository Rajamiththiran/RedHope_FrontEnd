import { useEffect, useState } from "react";
import BloodCell from "./BloodCell";
import HospitalSideNavMenu from "./HospitalSideNavMenu";
import HospitalSideNavToggle from "./HospitalSideNavToggle";
import Button from "./button";
import EventPostForm from "./event_post_form";
import Popup from "./popup";

const HospitalDashboard = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [showEventPostPopup, setShowEventPostPopup] = useState(false);
  const [notification, setNotification] = useState(null);
  const [recentEvents, setRecentEvents] = useState([]);

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
    setShowEventPostPopup(true);
  };

  const handleEventPostSubmit = (eventData) => {
    console.log("Event post submitted:", eventData);
    setShowEventPostPopup(false);

    // Update UI with new event
    setRecentEvents((prevEvents) => [eventData, ...prevEvents.slice(0, 4)]);

    // Show notification
    setNotification("Event post created successfully!");
    setTimeout(() => setNotification(null), 3000);
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
        </div>
        <div className="bg-gradient-to-br from-[#5b5b5b] to-[#3d3d3d] bg-opacity-90 rounded-lg shadow-lg p-10 w-full max-w-3xl flex flex-col justify-between z-10">
          <h1 className="text-4xl font-bold text-blue-400 mb-6 text-center">
            Hospital Dashboard
          </h1>

          {notification && (
            <div className="bg-green-500 text-white p-4 rounded-md mb-4 transition-all duration-300 ease-in-out">
              {notification}
            </div>
          )}

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

          {recentEvents.length > 0 && (
            <div className="bg-[#8c8c8c] p-8 rounded-lg mb-8">
              <h3 className="text-2xl font-semibold text-blue-300 mb-4">
                Recent Events
              </h3>
              <ul className="space-y-2">
                {recentEvents.map((event, index) => (
                  <li key={index} className="text-white">
                    <span className="font-bold">{event.title}</span> -{" "}
                    {new Date(event.start_time).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            </div>
          )}

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
      <Popup
        isOpen={showEventPostPopup}
        onClose={() => setShowEventPostPopup(false)}
        title="Post Donation Event"
      >
        <EventPostForm
          onSubmit={handleEventPostSubmit}
          onCancel={() => setShowEventPostPopup(false)}
        />
      </Popup>
    </div>
  );
};

export default HospitalDashboard;
