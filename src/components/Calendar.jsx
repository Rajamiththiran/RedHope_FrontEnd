import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import DatePicker from "react-datepicker";
import Modal from "react-modal";

import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";

const localizer = momentLocalizer(moment);

function CalendarComponent() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [alarmTime, setAlarmTime] = useState(new Date());

  useEffect(() => {
    // Request notification permission when the component mounts
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  const handleDateSelect = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    setAlarmTime(slotInfo.start);
    setShowModal(true);
  };

  const handleEventSubmit = () => {
    const newEvent = {
      title: eventTitle,
      description: eventDescription,
      start: selectedDate,
      end: selectedDate,
      alarm: alarmTime,
    };

    setEvents([...events, newEvent]);
    scheduleNotification(newEvent);
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setEventTitle("");
    setEventDescription("");
    setAlarmTime(new Date());
  };

  const scheduleNotification = (event) => {
    const now = new Date().getTime();
    const alarmTime = new Date(event.alarm).getTime();
    const delay = alarmTime - now;

    if (delay > 0) {
      setTimeout(() => {
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification(event.title, {
            body: event.description,
            icon: "/path/to/icon.png",
          });
        }
      }, delay);
    }
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectSlot={handleDateSelect}
        selectable
      />
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Register Event"
      >
        <h2>Register Event</h2>
        <input
          type="text"
          placeholder="Event Title"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
        />
        <textarea
          placeholder="Event Description"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
        />
        <DatePicker
          selected={alarmTime}
          onChange={(date) => setAlarmTime(date)}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
        />
        <button onClick={handleEventSubmit}>Register Event</button>
        <button onClick={() => setShowModal(false)}>Cancel</button>
      </Modal>
    </div>
  );
}

export default CalendarComponent;
