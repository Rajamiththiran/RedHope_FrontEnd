import { format, getDay, parse, startOfWeek } from "date-fns";
import enUS from "date-fns/locale/en-US";
import moment from "moment";
import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../auth_service";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

Modal.setAppElement("#root");

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: new Date(),
    end: new Date(),
    address: "",
    description: "",
    color: "#3174ad",
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const donorInfo = JSON.parse(localStorage.getItem("donorInfo"));
      if (donorInfo && donorInfo.id) {
        const fetchedEvents = await getEvents(donorInfo.id);
        setEvents(
          fetchedEvents.map((event) => ({
            ...event,
            start: moment(event.start_time).toDate(),
            end: moment(event.end_time).toDate(),
          }))
        );
      } else {
        setError("Donor information not found");
      }
    } catch (err) {
      console.error("Failed to fetch events:", err);
      setError("Failed to fetch events. Please try again.");
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      const donorInfo = JSON.parse(localStorage.getItem("donorInfo"));
      if (!donorInfo || !donorInfo.id) {
        throw new Error("Donor information not found");
      }
      const eventData = {
        title: newEvent.title,
        start_time: moment(newEvent.start).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
        end_time: moment(newEvent.end).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
        address: newEvent.address,
        description: newEvent.description,
        color: newEvent.color,
        donor_id: donorInfo.id,
      };
      await createEvent(eventData);
      await fetchEvents();
      setIsModalOpen(false);
      setNewEvent({
        title: "",
        start: new Date(),
        end: new Date(),
        address: "",
        description: "",
        color: "#3174ad",
      });
    } catch (error) {
      console.error("Error adding event:", error);
      setError("Failed to add event. Please try again.");
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsDetailsModalOpen(true);
    setIsEditing(false);
  };

  const handleEditEvent = async (e) => {
    e.preventDefault();
    try {
      const updatedEvent = {
        id: selectedEvent.id,
        title: selectedEvent.title,
        start_time: moment(selectedEvent.start).format(
          "YYYY-MM-DDTHH:mm:ss.SSSZ"
        ),
        end_time: moment(selectedEvent.end).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
        address: selectedEvent.address,
        description: selectedEvent.description,
        color: selectedEvent.color,
        donor_id: selectedEvent.donor_id,
      };
      await updateEvent(selectedEvent.id, updatedEvent);
      await fetchEvents();
      setIsDetailsModalOpen(false);
      setSelectedEvent(null);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating event:", error);
      setError("Failed to update event. Please try again.");
    }
  };

  const handleDeleteEvent = async () => {
    try {
      await deleteEvent(selectedEvent.id);
      await fetchEvents();
      setIsDetailsModalOpen(false);
      setSelectedEvent(null);
    } catch (error) {
      console.error("Error deleting event:", error);
      setError("Failed to delete event. Please try again.");
    }
  };

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: event.color,
        borderRadius: "5px",
        opacity: 0.8,
        color: "white",
        border: "0px",
        display: "block",
      },
    };
  };

  return (
    <div className="h-screen p-4 bg-gradient-to-br from-red-100 to-white">
      <h1 className="text-3xl font-bold text-red-600 mb-4">My Calendar</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Make an Event
        </button>
      </div>
      <div className="calendar-container">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={handleEventClick}
        />
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Add Event"
        className="modal-content fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-96"
        overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50"
      >
        <h2 className="text-2xl font-bold mb-4">Add New Event</h2>
        <form onSubmit={handleAddEvent} className="space-y-4">
          <div>
            <label className="block mb-1">Title:</label>
            <input
              type="text"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Start Date and Time:</label>
            <DatePicker
              selected={newEvent.start}
              onChange={(date) => setNewEvent({ ...newEvent, start: date })}
              showTimeSelect
              dateFormat="Pp"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">End Date and Time:</label>
            <DatePicker
              selected={newEvent.end}
              onChange={(date) => setNewEvent({ ...newEvent, end: date })}
              showTimeSelect
              dateFormat="Pp"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Address:</label>
            <input
              type="text"
              value={newEvent.address}
              onChange={(e) =>
                setNewEvent({ ...newEvent, address: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Description:</label>
            <textarea
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Color:</label>
            <input
              type="color"
              value={newEvent.color}
              onChange={(e) =>
                setNewEvent({ ...newEvent, color: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Event
          </button>
        </form>
      </Modal>
      <Modal
        isOpen={isDetailsModalOpen}
        onRequestClose={() => {
          setIsDetailsModalOpen(false);
          setIsEditing(false);
        }}
        contentLabel="Event Details"
        className="modal-content fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-96"
        overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50"
      >
        {selectedEvent && (
          <div>
            <h2 className="text-2xl font-bold mb-4">{selectedEvent.title}</h2>
            {isEditing ? (
              <form onSubmit={handleEditEvent} className="space-y-4">
                <div>
                  <label className="block mb-1">Title:</label>
                  <input
                    type="text"
                    value={selectedEvent.title}
                    onChange={(e) =>
                      setSelectedEvent({
                        ...selectedEvent,
                        title: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Start Date and Time:</label>
                  <DatePicker
                    selected={selectedEvent.start}
                    onChange={(date) =>
                      setSelectedEvent({ ...selectedEvent, start: date })
                    }
                    showTimeSelect
                    dateFormat="Pp"
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">End Date and Time:</label>
                  <DatePicker
                    selected={selectedEvent.end}
                    onChange={(date) =>
                      setSelectedEvent({ ...selectedEvent, end: date })
                    }
                    showTimeSelect
                    dateFormat="Pp"
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Address:</label>
                  <input
                    type="text"
                    value={selectedEvent.address}
                    onChange={(e) =>
                      setSelectedEvent({
                        ...selectedEvent,
                        address: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Description:</label>
                  <textarea
                    value={selectedEvent.description}
                    onChange={(e) =>
                      setSelectedEvent({
                        ...selectedEvent,
                        description: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Color:</label>
                  <input
                    type="color"
                    value={selectedEvent.color}
                    onChange={(e) =>
                      setSelectedEvent({
                        ...selectedEvent,
                        color: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <p>
                  <strong>Start:</strong> {format(selectedEvent.start, "PPpp")}
                </p>
                <p>
                  <strong>End:</strong> {format(selectedEvent.end, "PPpp")}
                </p>
                <p>
                  <strong>Address:</strong> {selectedEvent.address}
                </p>
                <p>
                  <strong>Description:</strong> {selectedEvent.description}
                </p>
                <div className="mt-4">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDeleteEvent}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MyCalendar;
