import { format, getDay, parse, startOfWeek } from "date-fns";
import enUS from "date-fns/locale/en-US";
import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";

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

// Ensure Modal is accessible
Modal.setAppElement("#root");

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: new Date(),
    end: new Date(),
    address: "",
    description: "",
    color: "#3174ad",
  });

  const handleAddEvent = () => {
    setEvents([...events, newEvent]);
    setIsModalOpen(false);
    setNewEvent({
      title: "",
      start: new Date(),
      end: new Date(),
      address: "",
      description: "",
      color: "#3174ad",
    });
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsDetailsModalOpen(true);
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
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
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
            onClick={handleAddEvent}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Event
          </button>
        </form>
      </Modal>
      <Modal
        isOpen={isDetailsModalOpen}
        onRequestClose={() => setIsDetailsModalOpen(false)}
        contentLabel="Event Details"
        className="modal-content fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-96"
        overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50"
      >
        {selectedEvent && (
          <div>
            <h2 className="text-2xl font-bold mb-4">{selectedEvent.title}</h2>
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
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MyCalendar;
