import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LogoSvg from "../assets/svg/LogoSvg";
import NotificationLogoSvg from "../assets/svg/NotificationLogoSvg";
import { getRequestNotifications } from "../auth_service";
import Button from "./button";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleRequestBlood = () => handleNavigation("/request-blood");
  const handleLogoClick = () => handleNavigation("/");

  const fetchNotifications = async () => {
    try {
      const donorInfo = JSON.parse(localStorage.getItem("donorInfo"));
      if (donorInfo && donorInfo.blood_type) {
        const data = await getRequestNotifications(donorInfo.blood_type);
        setNotifications(data);
      }
    } catch (err) {
      setError("Failed to fetch notifications");
      console.error(err);
    }
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      fetchNotifications();
    }
  };

  const handleNotificationClick = (notification) => {
    // Handle the click event for each notification
    console.log("Clicked notification:", notification);
    // You can add more functionality here, like navigating to a details page
  };

  return (
    <nav className="flex flex-wrap items-center justify-between p-4 bg-white shadow-md">
      <div
        className="flex items-center space-x-2 cursor-pointer transition-page"
        onClick={handleLogoClick}
      >
        <LogoSvg className="w-8 h-8" />
        <span className="text-xl font-bold">
          <span className="text-red-500">Red</span>
          <span className="text-green-500">Hope</span>
        </span>
      </div>

      <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <div
        className={`w-full lg:flex lg:items-center lg:w-auto ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4 mt-4 lg:mt-0">
          <Button
            className="text-black w-full lg:w-auto transition-page"
            onClick={handleRequestBlood}
          >
            Request Blood
          </Button>

          {location.pathname === "/donor-dashboard" && (
            <div className="relative">
              <button
                onClick={toggleNotifications}
                className="focus:outline-none p-2"
              >
                <NotificationLogoSvg className="w-6 h-6 cursor-pointer" />
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-10">
                  <div className="py-2 max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification, index) => (
                        <div
                          key={index}
                          className="px-4 py-3 hover:bg-red-200 bg-red-100 cursor-pointer mb-2 rounded"
                          onClick={() => handleNotificationClick(notification)}
                        >
                          <p className="font-semibold">
                            Blood Type: {notification.blood_type_requested}
                          </p>
                          <p>Urgency: {notification.urgency_level}</p>
                          <p>Location: {notification.location}</p>
                          <p>Phone Number: {notification.phone_number}</p>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2">No new notifications</div>
                    )}
                    {error && (
                      <div className="px-4 py-2 text-red-500">{error}</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
