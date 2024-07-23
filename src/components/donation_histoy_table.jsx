import { useEffect, useRef, useState } from "react";
import {
  deleteDonationHistory,
  getDonationHistory,
  updateDonationHistory,
} from "../auth_service";
import Button from "./button";
import DonationHistoryForm from "./donation_history_form";
import Popup from "./popup";

const DonationHistoryTable = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    fetchDonationHistory();
  }, []);

  const fetchDonationHistory = async () => {
    try {
      const donorInfo = JSON.parse(localStorage.getItem("donorInfo"));
      if (donorInfo && donorInfo.id) {
        const data = await getDonationHistory(donorInfo.id);
        setDonations(data);
      } else {
        throw new Error("Donor information not found");
      }
    } catch (err) {
      setError("Failed to fetch donation history");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const filteredDonations = donations.filter((donation) => {
    if (!startDate && !endDate) return true;
    const donationDate = new Date(donation.donation_date);
    return (
      (!startDate || donationDate >= new Date(startDate)) &&
      (!endDate || donationDate <= new Date(endDate))
    );
  });

  const handleEllipsisClick = (donation) => {
    setSelectedDonation(donation);
    setShowDetailsPopup(true);
  };

  const handleEdit = () => {
    setShowDetailsPopup(false);
    setShowEditPopup(true);
  };

  const handleDelete = async () => {
    try {
      await deleteDonationHistory(selectedDonation.id);
      await fetchDonationHistory();
      setShowDetailsPopup(false);
    } catch (error) {
      console.error("Failed to delete donation:", error);
      setError("Failed to delete donation. Please try again.");
    }
  };

  const handleUpdate = async (updatedDonation) => {
    try {
      await updateDonationHistory(selectedDonation.id, updatedDonation);
      await fetchDonationHistory();
      setShowEditPopup(false);
    } catch (error) {
      console.error("Failed to update donation:", error);
      setError("Failed to update donation. Please try again.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowDetailsPopup(false);
        setShowEditPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error)
    return <div className="text-red-500 text-center mt-4">{error}</div>;

  return (
    <div className="w-full p-4">
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded w-full sm:w-auto"
          placeholder="Start Date"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded w-full sm:w-auto"
          placeholder="End Date"
        />
      </div>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Blood Type
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Volume
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredDonations.map((donation) => (
                <tr key={donation.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {formatDate(donation.donation_date)}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {donation.blood_type}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {donation.volume}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {donation.donation_type}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <button
                      onClick={() => handleEllipsisClick(donation)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      ⋮
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showDetailsPopup && selectedDonation && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div
            ref={popupRef}
            className="bg-white p-5 rounded-lg shadow-xl max-w-sm mx-auto"
          >
            <h3 className="text-lg font-semibold mb-4">Donation Details</h3>
            <p className="mb-2">
              Date: {formatDate(selectedDonation.donation_date)}
            </p>
            <p className="mb-2">Blood Type: {selectedDonation.blood_type}</p>
            <p className="mb-2">Volume: {selectedDonation.volume}</p>
            <p className="mb-2">Type: {selectedDonation.donation_type}</p>
            <p className="mb-4">Location: {selectedDonation.address}</p>
            <div className="flex justify-end space-x-2">
              <Button
                onClick={handleEdit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Edit
              </Button>
              <Button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      <Popup
        isOpen={showEditPopup}
        onClose={() => setShowEditPopup(false)}
        title="Edit Donation"
      >
        <DonationHistoryForm
          onSubmit={handleUpdate}
          onCancel={() => setShowEditPopup(false)}
          initialData={selectedDonation}
        />
      </Popup>
    </div>
  );
};

export default DonationHistoryTable;
