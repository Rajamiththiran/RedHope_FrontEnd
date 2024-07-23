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
    {
      id: 1,
      donationDate: "2024-07-05",
      address: "123 Main St, Anytown, USA",
      bloodType: "A+",
      volume: "450 mL",
      donationType: "Whole Blood",
      description: "Regular donation at local blood drive",
    },
    {
      id: 1,
      donationDate: "2024-07-05",
      address: "123 Main St, Anytown, USA",
      bloodType: "A+",
      volume: "450 mL",
      donationType: "Whole Blood",
      description: "Regular donation at local blood drive",
    },
    {
      id: 1,
      donationDate: "2024-07-05",
      address: "123 Main St, Anytown, USA",
      bloodType: "A+",
      volume: "450 mL",
      donationType: "Whole Blood",
      description: "Regular donation at local blood drive",
    },
    {
      id: 1,
      donationDate: "2024-07-05",
      address: "123 Main St, Anytown, USA",
      bloodType: "A+",
      volume: "450 mL",
      donationType: "Whole Blood",
      description: "Regular donation at local blood drive",
    },
    {
      id: 1,
      donationDate: "2024-07-05",
      address: "123 Main St, Anytown, USA",
      bloodType: "A+",
      volume: "450 mL",
      donationType: "Whole Blood",
      description: "Regular donation at local blood drive",
    },
    {
      id: 1,
      donationDate: "2024-07-05",
      address: "123 Main St, Anytown, USA",
      bloodType: "A+",
      volume: "450 mL",
      donationType: "Whole Blood",
      description: "Regular donation at local blood drive",
    },
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
    return date.toLocaleDateString("en-GB"); // This will format as DD/MM/YYYY
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
    // Implement edit functionality
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
    <div className="p-4">
      <div className="flex space-x-4 mb-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded"
          placeholder="Start Date"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded"
          placeholder="End Date"
        />
      </div>
      <div className="h-64 overflow-y-auto">
        <table className="w-full bg-white">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="px-4 py-2">Donation Date</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Blood Type</th>
              <th className="px-4 py-2">Volume</th>
              <th className="px-4 py-2">Donation Type</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredDonations.map((donation) => (
              <tr key={donation.id}>
                <td className="px-4 py-2">
                  {formatDate(donation.donationDate)}
                </td>
                <td className="px-4 py-2">{donation.address}</td>
                <td className="px-4 py-2">{donation.bloodType}</td>
                <td className="px-4 py-2">{donation.volume}</td>
                <td className="px-4 py-2">{donation.donationType}</td>
                <td className="px-4 py-2">{donation.description}</td>
                <td className="px-4 py-2 relative">
                  <button
                    onClick={() => setSelectedDonation(donation)}
                    className="text-gray-500 hover:text-gray-700 font-bold"
                  >
                    ⋮
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedDonation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div ref={popupRef} className="bg-white p-6 rounded-lg shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Edit Donation</h3>
            <p>Donation Date: {formatDate(selectedDonation.donationDate)}</p>
            <p>Blood Type: {selectedDonation.bloodType}</p>
            <p>Volume: {selectedDonation.volume}</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => setSelectedDonation(null)}
                className="ml-2 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
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
