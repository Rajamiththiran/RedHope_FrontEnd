const DonorDashboard = () => {
  return (
    <div className="min-h-screen bg-red-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Donor Dashboard
        </h1>
        <p className="text-gray-700">
          Welcome to your donor dashboard. Here you can manage your donations
          and schedule new appointments.
        </p>
      </div>
    </div>
  );
};

export default DonorDashboard;
