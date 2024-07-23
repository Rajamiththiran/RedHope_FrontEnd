import { useEffect, useRef, useState } from "react";

const DonationHistoryTable = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedDonation, setSelectedDonation] = useState(null);
  const popupRef = useRef(null);

  // Mock data for demonstration
  const donations = [
    {
      id: 1,
      donationDate: "2024-07-05",
      address: "123 Main St, Anytown, USA",
      bloodType: "A+",
      volume: "450 mL",
      donationType: "Whole Blood",
      description: "Regular donation at local blood drive",
    },
    // Add more mock data as needed
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const filteredDonations = donations.filter((donation) => {
    if (!startDate && !endDate) return true;
    const donationDate = new Date(donation.donationDate);
    return (
      (!startDate || donationDate >= new Date(startDate)) &&
      (!endDate || donationDate <= new Date(endDate))
    );
  });

  const handleEdit = () => {
    console.log(`Edit donation with id: ${selectedDonation.id}`);
    setSelectedDonation(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setSelectedDonation(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
                    {formatDate(donation.donationDate)}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {donation.bloodType}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {donation.volume}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {donation.donationType}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <button
                      onClick={() => setSelectedDonation(donation)}
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

      {selectedDonation && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div
            ref={popupRef}
            className="bg-white p-5 rounded-lg shadow-xl max-w-sm mx-auto"
          >
            <h3 className="text-lg font-semibold mb-4">Edit Donation</h3>
            <p className="mb-2">
              Date: {formatDate(selectedDonation.donationDate)}
            </p>
            <p className="mb-2">Blood Type: {selectedDonation.bloodType}</p>
            <p className="mb-2">Volume: {selectedDonation.volume}</p>
            <p className="mb-4">Type: {selectedDonation.donationType}</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleEdit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => setSelectedDonation(null)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationHistoryTable;
