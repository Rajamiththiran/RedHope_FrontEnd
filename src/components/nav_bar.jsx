import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LogoSvg from "../assets/svg/LogoSvg";
import NotificationLogoSvg from "../assets/svg/NotificationLogoSvg";
import ProfileLogoSvg from "../assets/svg/ProfileLogoSvg";
import { getRequestNotifications } from "../auth_service";
import Button from "./button";
import Popup from "./popup";

const NavBar = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");
  const [notificationCount, setNotificationCount] = useState(0);
  const [lastViewedCount, setLastViewedCount] = useState(() => {
    const saved = localStorage.getItem("lastViewedCount");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  const profileRef = useRef(null);
  const notificationRef = useRef(null);
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

  const handleRequestBlood = () => {
    handleNavigation("/request-blood");
    setShowProfileMenu(false);
  };
  const handleLogoClick = () => handleNavigation("/");

  const fetchNotifications = async () => {
    try {
      const donorInfo = JSON.parse(localStorage.getItem("donorInfo"));
      if (donorInfo && donorInfo.blood_type) {
        const data = await getRequestNotifications(donorInfo.blood_type);
        setNotifications(data);
        const newCount = data.length - lastViewedCount;
        setNotificationCount(newCount > 0 ? newCount : 0);
      }
    } catch (err) {
      setError("Failed to fetch notifications");
      console.error(err);
    }
  };

  useEffect(() => {
    if (location.pathname === "/donor-dashboard") {
      fetchNotifications();
      const intervalId = setInterval(fetchNotifications, 60000);
      return () => clearInterval(intervalId);
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
    if (!showProfileMenu) {
      setShowNotifications(false);
    }
  };

  const toggleNotifications = (e) => {
    e.stopPropagation();
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      setLastViewedCount(notifications.length);
      setNotificationCount(0);
      localStorage.setItem("lastViewedCount", notifications.length.toString());
    }
  };

  const handleNotificationClick = useCallback(
    (notification, e) => {
      e.stopPropagation();
      console.log("Clicked notification:", notification);
      handleNavigation(`/request-details/${notification.id}`);
      setShowNotifications(false);
      setShowProfileMenu(false);
    },
    [handleNavigation]
  );

  const handleLogout = () => {
    setShowLogoutConfirmation(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("donorInfo");
    handleNavigation("/");
    setShowLogoutConfirmation(false);
    setShowProfileMenu(false);
  };

  const cancelLogout = () => {
    setShowLogoutConfirmation(false);
  };

  const isDonorDashboard = location.pathname === "/donor-dashboard";

  const renderNotifications = () => (
    <div
      className="py-2 max-h-96 overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div
            key={notification.id}
            className="px-4 py-3 hover:bg-red-200 bg-red-100 cursor-pointer mb-2 rounded"
            onClick={(e) => handleNotificationClick(notification, e)}
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
      {error && <div className="px-4 py-2 text-red-500">{error}</div>}
    </div>
  );

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md">
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

      <div className="flex items-center space-x-4">
        <div className="hidden md:block">
          <Button
            className="text-black transition-page"
            onClick={handleRequestBlood}
          >
            Request Blood
          </Button>
        </div>

        {isDonorDashboard && (
          <div className="flex items-center space-x-2">
            {/* Notification icon for all devices */}
            <div className="relative" ref={notificationRef}>
              <Button
                className="p-2 relative hover:bg-transparent"
                onClick={toggleNotifications}
              >
                <NotificationLogoSvg className="w-6 h-6 cursor-pointer text-[#4d4d4d] hover:text-color-1 transition-colors" />
                {notificationCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-green-500 rounded-full">
                    {notificationCount}
                  </span>
                )}
              </Button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-10">
                  {renderNotifications()}
                </div>
              )}
            </div>

            {/* Profile icon */}
            <div className="relative" ref={profileRef}>
              <Button
                className="p-2 relative hover:bg-transparent"
                onClick={toggleProfileMenu}
              >
                <ProfileLogoSvg className="w-6 h-6 cursor-pointer text-[#4d4d4d] hover:text-color-1 transition-colors" />
              </Button>
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <div className="py-1">
                    <button
                      onClick={handleRequestBlood}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 md:hidden"
                    >
                      Request Blood
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <Popup
        isOpen={showLogoutConfirmation}
        onClose={cancelLogout}
        title="Confirm Logout"
      >
        <p className="mb-4">Are you sure you want to log out?</p>
        <div className="flex justify-end space-x-2">
          <Button onClick={cancelLogout} className="bg-gray-300 text-black">
            Cancel
          </Button>
          <Button onClick={confirmLogout} className="bg-red-500 text-white">
            Logout
          </Button>
        </div>
      </Popup>
    </nav>
  );
};

export default NavBar;
