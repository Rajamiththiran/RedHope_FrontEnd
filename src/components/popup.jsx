import React, { useEffect, useRef } from "react";

const Popup = ({ isOpen, onClose, children, title }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div
        ref={popupRef}
        className="bg-white p-5 rounded-lg shadow-xl max-w-md mx-auto"
      >
        <h3 className="text-lg font-semibold mb-4 text-n-8">{title}</h3>
        {children}
      </div>
    </div>
  );
};

export default Popup;
