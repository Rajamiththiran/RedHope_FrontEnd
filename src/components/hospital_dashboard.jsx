const HospitalDashboard = () => {
  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Hospital Dashboard
        </h1>
        <p className="text-gray-700">
          Welcome to your hospital dashboard. Here you can manage blood requests
          and view donor information.
        </p>
      </div>
    </div>
  );
};

export default HospitalDashboard;
