import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const SideNavMenu = ({ isOpen, onClose }) => {
  const sideNavRef = useRef(null);
  const navigate = useNavigate();

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

  const handleExplore = () => {
    navigate("/common-dashboard");
    onClose();
  };

  return (
    <div
      ref={sideNavRef}
      className={`fixed top-20 left-4 h-[calc(100vh-6rem)] w-64 bg-gradient-to-br from-[#5b5b5b] to-[#3d3d3d] bg-opacity-90 shadow-lg transform transition-all duration-300 ease-in-out z-40 rounded-2xl overflow-hidden ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-8 h-full overflow-y-auto">
        <h2 className="text-3xl font-bold text-white mb-6 font-sans">Menu</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to="/donors-feed"
                className="block py-2 px-4 text-white hover:bg-white hover:bg-opacity-20 rounded transition-colors"
              >
                My Feed
              </Link>
            </li>
            <li>
              <Link
                to="/my-calendar"
                className="block py-2 px-4 text-white hover:bg-white hover:bg-opacity-20 rounded transition-colors"
              >
                My Calendar
              </Link>
            </li>
            <li>
              <button
                onClick={handleExplore}
                className="block w-full text-left py-2 px-4 text-white hover:bg-white hover:bg-opacity-20 rounded transition-colors"
              >
                Explore
              </button>
            </li>
            <li>
              <Link
                to="/more-options"
                className="block py-2 px-4 text-white hover:bg-white hover:bg-opacity-20 rounded transition-colors"
              >
                More Options
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideNavMenu;
