import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const SideNavMenu = ({ isOpen, onClose }) => {
  const sideNavRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sideNavRef.current && !sideNavRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={sideNavRef}
      className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      style={{ top: "60px" }} // Adjust this value to match your navbar height
    >
      <div className="p-4">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Menu</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link
                to="/donor-dashboard"
                className="block py-2 px-4 text-gray-800 hover:bg-red-100 rounded transition-colors"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="block py-2 px-4 text-gray-800 hover:bg-red-100 rounded transition-colors"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="/donation-history"
                className="block py-2 px-4 text-gray-800 hover:bg-red-100 rounded transition-colors"
              >
                Donation History
              </Link>
            </li>
            <li>
              <Link
                to="/notifications"
                className="block py-2 px-4 text-gray-800 hover:bg-red-100 rounded transition-colors"
              >
                Notifications
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="block py-2 px-4 text-gray-800 hover:bg-red-100 rounded transition-colors"
              >
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideNavMenu;
