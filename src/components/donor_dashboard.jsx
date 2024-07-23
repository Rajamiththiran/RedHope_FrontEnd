import DonationHistoryTable from "./donation_histoy_table";

const DonorDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-700 to-red-300 flex flex-col">
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 w-full max-w-4xl">
          <h1 className="text-2xl sm:text-3xl font-bold text-red-600 mb-4 text-center">
            Donor Dashboard
          </h1>
          <p className="text-sm sm:text-base text-gray-700 mb-6 text-center">
            Welcome to your donor dashboard. Here you can view your donation
            history and manage your profile.
          </p>
          <div className="flex justify-center">
            <DonationHistoryTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
