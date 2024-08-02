import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventPost } from "../auth_service";
import BloodCell from "./BloodCell";

const CommonEventView = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getEventPost(id);
        setEvent(eventData);
      } catch (err) {
        setError("Failed to fetch event details");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return <div className="text-center font-sans">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 font-sans">{error}</div>;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-100 to-white overflow-hidden flex justify-center items-center">
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

      <div className="relative z-10 w-full max-w-2xl px-4">
        <div className="bg-gradient-to-br from-[#5b5b5b] to-[#3d3d3d] bg-opacity-80 rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-blue-300 mb-6 font-sans">
            Event Details
          </h2>
          <div className="mb-6 text-white font-grotesk">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p>
                <strong className="font-sans">Title:</strong> {event.title}
              </p>
              <p>
                <strong className="font-sans">Start Time:</strong>{" "}
                {moment(event.start_time).format("MMMM D, YYYY h:mm A")}
              </p>
              <p>
                <strong className="font-sans">End Time:</strong>{" "}
                {moment(event.end_time).format("MMMM D, YYYY h:mm A")}
              </p>
              <p>
                <strong className="font-sans">Location:</strong>{" "}
                {event.location}
              </p>
            </div>
            <p className="mt-4">
              <strong className="font-sans">Description:</strong>{" "}
              {event.description}
            </p>
          </div>
          <div className="mt-6">
            <p className="text-blue-300 font-sans">
              <strong>Hospital:</strong> {event.hospital_name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonEventView;
