import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteEventPost,
  getEventPost,
  updateEventPost,
} from "../auth_service";
import BloodCell from "./BloodCell";
import Popup from "./popup";

const EventView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [updatedEvent, setUpdatedEvent] = useState({
    title: "",
    start_time: "",
    end_time: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getEventPost(id);
        setEvent(eventData);
        setUpdatedEvent({
          title: eventData.title,
          start_time: moment(eventData.start_time).format("YYYY-MM-DDTHH:mm"),
          end_time: moment(eventData.end_time).format("YYYY-MM-DDTHH:mm"),
          location: eventData.location,
          description: eventData.description,
        });
      } catch (err) {
        setError("Failed to fetch event details");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formattedEvent = {
        ...updatedEvent,
        start_time: moment(updatedEvent.start_time).format(
          "YYYY-MM-DDTHH:mm:ss.SSSZ"
        ),
        end_time: moment(updatedEvent.end_time).format(
          "YYYY-MM-DDTHH:mm:ss.SSSZ"
        ),
      };
      await updateEventPost(id, formattedEvent);
      setEvent({ ...event, ...formattedEvent });
      setShowUpdatePopup(false);
    } catch (err) {
      setError("Failed to update event");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteEventPost(id);
      navigate("/hospital-feed");
    } catch (err) {
      setError("Failed to delete event");
    }
  };

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
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setShowUpdatePopup(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
            >
              Update
            </button>
            <button
              onClick={() => setShowDeleteConfirmation(true)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {(showUpdatePopup || showDeleteConfirmation) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      )}

      <Popup
        isOpen={showUpdatePopup}
        onClose={() => setShowUpdatePopup(false)}
        title="Update Event"
      >
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={updatedEvent.title}
              onChange={(e) =>
                setUpdatedEvent({ ...updatedEvent, title: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Time
            </label>
            <input
              type="datetime-local"
              value={updatedEvent.start_time}
              onChange={(e) =>
                setUpdatedEvent({ ...updatedEvent, start_time: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Time
            </label>
            <input
              type="datetime-local"
              value={updatedEvent.end_time}
              onChange={(e) =>
                setUpdatedEvent({ ...updatedEvent, end_time: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              value={updatedEvent.location}
              onChange={(e) =>
                setUpdatedEvent({ ...updatedEvent, location: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={updatedEvent.description}
              onChange={(e) =>
                setUpdatedEvent({
                  ...updatedEvent,
                  description: e.target.value,
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows="3"
            ></textarea>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => setShowUpdatePopup(false)}
              className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </Popup>

      <Popup
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        title="Confirm Deletion"
      >
        <p className="mb-4">Are you sure you want to delete this event?</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
          >
            Delete
          </button>
          <button
            onClick={() => setShowDeleteConfirmation(false)}
            className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </Popup>
    </div>
  );
};

export default EventView;
