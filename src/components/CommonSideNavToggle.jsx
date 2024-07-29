const CommonSideNavToggle = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed top-16 left-0 z-50 bg-gradient-to-r from-green-500 to-green-700 p-2 rounded-r-md shadow-lg transition-transform duration-300 ease-in-out"
      style={{ transform: isOpen ? "translateX(256px)" : "translateX(0)" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-6 w-6 transition-transform duration-300 ${
          isOpen ? "rotate-180" : ""
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  );
};

export default CommonSideNavToggle;
