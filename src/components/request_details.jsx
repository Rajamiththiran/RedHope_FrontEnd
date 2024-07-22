import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getRequestNotifications } from "../auth_service";
import BloodCell from "./BloodCell";
import Button from "./button";

const RequestDetails = () => {
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEntering, setIsEntering] = useState(true);
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    const fetchRequestDetails = async () => {
      if (location.state?.requestDetails) {
        setRequest(location.state.requestDetails);
        setLoading(false);
      } else {
        try {
          const donorInfo = JSON.parse(localStorage.getItem("donorInfo"));
          if (donorInfo && donorInfo.blood_type) {
            const notifications = await getRequestNotifications(
              donorInfo.blood_type
            );
            const requestDetails = notifications.find(
              (notif) => notif.id.toString() === id
            );
            if (requestDetails) {
              setRequest(requestDetails);
            } else {
              setError("Request not found");
            }
          } else {
            setError("Donor information not found");
          }
        } catch (err) {
          setError("Failed to fetch request details");
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRequestDetails();

    // Trigger entrance animation
    setIsEntering(true);
    const timer = setTimeout(() => setIsEntering(false), 100);
    return () => clearTimeout(timer);
  }, [id, location.state]);

  const handleMakeDonation = () => {
    console.log("Make donation history for request:", request);
    // TODO: Implement navigation to donation history creation
  };

  if (loading) {
    return <div className="text-center font-sans">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 font-sans">{error}</div>;
  }

  if (!request) {
    return (
      <div className="text-center font-sans">No request details available.</div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-red-100 to-white overflow-hidden flex justify-center items-center">
      <div className="absolute inset-0">
        <BloodCell
          className="absolute top-1/12 left-1/12 animate-float"
          size={14}
        />
        <BloodCell
          className="absolute top-3/4 right-1/12 animate-float-delay-1"
          size={16}
        />
        <BloodCell
          className="absolute bottom-1/6 left-1/2 animate-float-delay-2"
          size={12}
        />
        <BloodCell
          className="absolute top-1/5 right-1/4 animate-float"
          size={15}
        />
        <BloodCell
          className="absolute bottom-1/3 left-1/6 animate-float-delay-1"
          size={13}
        />
        <BloodCell
          className="absolute top-2/3 right-1/3 animate-float-delay-2"
          size={14}
        />
      </div>
      <div
        className={`relative z-10 w-full max-w-2xl px-4 transition-all duration-1000 ease-out ${
          isEntering ? "opacity-0 translate-y-20" : "opacity-100 translate-y-0"
        }`}
      >
        <div className="bg-gradient-to-br from-[#5b5b5b] to-[#3d3d3d] bg-opacity-80 rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-white mb-6 font-sans">
            Blood Request Details
          </h2>
          <div className="mb-6 text-white font-grotesk">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p>
                <strong className="font-sans">Blood Type:</strong>{" "}
                {request.blood_type_requested}
              </p>
              <p>
                <strong className="font-sans">Urgency:</strong>{" "}
                {request.urgency_level}
              </p>
              <p>
                <strong className="font-sans">Location:</strong>{" "}
                {request.location}
              </p>
              <p>
                <strong className="font-sans">Requester Name:</strong>{" "}
                {request.requester_name}
              </p>
              <p>
                <strong className="font-sans">Requester Email:</strong>{" "}
                {request.requester_email}
              </p>
              <p>
                <strong className="font-sans">Phone Number:</strong>{" "}
                {request.phone_number}
              </p>
              <p>
                <strong className="font-sans">NIC Number:</strong>{" "}
                {request.nic_number}
              </p>
              <p>
                <strong className="font-sans">Request Date:</strong>{" "}
                {new Date(request.created_at).toLocaleString()}
              </p>
            </div>
            <p className="mt-4">
              <strong className="font-sans">Description:</strong>{" "}
              {request.description || "No description provided"}
            </p>
          </div>
          <Button
            className="w-full bg-red-500 text-white hover:bg-red-600 transition-all duration-200 ease-in-out transform hover:scale-105 font-sans"
            onClick={handleMakeDonation}
          >
            Make Donation History
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RequestDetails;
