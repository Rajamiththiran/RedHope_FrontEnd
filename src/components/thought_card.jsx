import moment from "moment";
import ReactMarkdown from "react-markdown";

const ThoughtCard = ({ thought }) => {
  return (
    <div className="bg-gradient-to-br from-red-400 to-white rounded-lg shadow-lg p-6 flex flex-col justify-between h-full cursor-pointer">
      <div>
        <h3 className="text-lg font-bold mb-2">{thought.title}</h3>
        <div className="overflow-y-auto max-h-64 prose prose-sm">
          <ReactMarkdown>{thought.thought}</ReactMarkdown>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Posted:</span>{" "}
          {moment(thought.created_at).format("MMMM D, YYYY h:mm A")}
        </p>
      </div>
    </div>
  );
};

export default ThoughtCard;
