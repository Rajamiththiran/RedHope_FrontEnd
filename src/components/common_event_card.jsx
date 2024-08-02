import moment from "moment";

const CommonEventCard = ({ event }) => {
  return (
    <div className="bg-gradient-to-br from-green-400 to-white rounded-lg shadow-lg p-6 flex flex-col justify-between h-full cursor-pointer hover:shadow-xl transition-shadow duration-300">
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
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Hospital Name:</span>{" "}
          {event.hospital_name}
        </p>
      </div>
    </div>
  );
};

export default CommonEventCard;
