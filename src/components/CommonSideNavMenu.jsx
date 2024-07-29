import { useEffect, useRef } from "react";

const CommonSideNavMenu = ({ isOpen, onClose }) => {
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

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      onClose();
    }
  };

  return (
    <div
      ref={sideNavRef}
      className={`fixed top-20 left-4 h-[calc(100vh-6rem)] w-64 bg-gradient-to-br from-green-500 to-green-700 bg-opacity-90 shadow-lg transform transition-all duration-300 ease-in-out z-40 rounded-2xl overflow-hidden ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-8 h-full overflow-y-auto">
        <h2 className="text-3xl font-bold text-white mb-6 font-sans">Menu</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => scrollToSection("donation-events")}
                className="block w-full text-left py-2 px-4 text-white hover:bg-white hover:bg-opacity-20 rounded transition-colors"
              >
                Donation Events Posts
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("donor-thoughts")}
                className="block w-full text-left py-2 px-4 text-white hover:bg-white hover:bg-opacity-20 rounded transition-colors"
              >
                Thoughts of Donors
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("hospital-knowledge")}
                className="block w-full text-left py-2 px-4 text-white hover:bg-white hover:bg-opacity-20 rounded transition-colors"
              >
                Knowledges from Hospitals
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("graphs")}
                className="block w-full text-left py-2 px-4 text-white hover:bg-white hover:bg-opacity-20 rounded transition-colors"
              >
                Graphs
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default CommonSideNavMenu;
