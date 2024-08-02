import moment from "moment";

import ReactMarkdown from "react-markdown";

const KnowledgeCard = ({ knowledge }) => {
  return (
    <div className="bg-gradient-to-br from-blue-400 to-white rounded-lg shadow-lg p-6 flex flex-col justify-between h-full">
      <div className="overflow-y-auto max-h-64 prose prose-sm">
        <ReactMarkdown>{knowledge.knowledge}</ReactMarkdown>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Posted:</span>{" "}
          {moment(knowledge.created_at).format("MMMM D, YYYY h:mm A")}
        </p>
      </div>
    </div>
  );
};

export default KnowledgeCard;
