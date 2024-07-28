import moment from "moment";

const EventCard = ({ event }) => {
  return (
    <div className="bg-gradient-to-br from-blue-400 to-white rounded-lg shadow-lg p-6 flex flex-col justify-between h-full">
      <div>
        <h3 className="text-xl font-bold mb-2 text-gray-800">{event.title}</h3>
        <p className="text-gray-600 mb-4">{event.description}</p>
      </div>
      <div>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Start:</span>{" "}
          {moment(event.start_time).format("MMMM D, YYYY h:mm A")}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">End:</span>{" "}
          {moment(event.end_time).format("MMMM D, YYYY h:mm A")}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Location:</span> {event.location}
        </p>
      </div>
    </div>
  );
};

export default EventCard;
