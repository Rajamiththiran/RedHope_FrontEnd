import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllKnowledges } from "../auth_service";
import CommonKnowledgeCard from "./common_knowledge_card";

const CommonKnowledgeLoader = () => {
  const [knowledges, setKnowledges] = useState([]);
  const [visibleKnowledges, setVisibleKnowledges] = useState(6);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKnowledges = async () => {
      try {
        const fetchedKnowledges = await getAllKnowledges();
        setKnowledges(fetchedKnowledges);
      } catch (err) {
        console.error("Error fetching knowledges:", err);
        setError(`Failed to fetch knowledges: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchKnowledges();
  }, []);

  const loadMore = () => {
    setVisibleKnowledges(knowledges.length);
    setExpanded(true);
  };

  const showLess = () => {
    setVisibleKnowledges(6);
    setExpanded(false);
  };

  const filteredKnowledges = knowledges.filter((knowledge) => {
    if (!startDate && !endDate) return true;
    const knowledgeDate = moment(knowledge.created_at);
    return (
      (!startDate || knowledgeDate.isSameOrAfter(moment(startDate))) &&
      (!endDate || knowledgeDate.isSameOrBefore(moment(endDate)))
    );
  });

  const handleKnowledgeClick = (knowledgeId) => {
    navigate(`/common-knowledge-view/${knowledgeId}`);
  };

  if (loading) {
    return <div className="text-white text-center">Loading knowledges...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="w-full bg-gradient-to-br from-[#5b5b5b] to-[#3d3d3d] p-6 rounded-lg shadow-lg">
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded w-full sm:w-auto"
          placeholder="Start Date"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded w-full sm:w-auto"
          placeholder="End Date"
        />
      </div>

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${
          expanded ? "max-h-[600px] overflow-y-auto pr-4" : ""
        }`}
      >
        {filteredKnowledges.slice(0, visibleKnowledges).map((knowledge) => (
          <div
            key={knowledge.id}
            onClick={() => handleKnowledgeClick(knowledge.id)}
          >
            <CommonKnowledgeCard knowledge={knowledge} />
          </div>
        ))}
      </div>

      {filteredKnowledges.length === 0 && (
        <p className="text-gray-700 text-center">No knowledges available.</p>
      )}

      {!expanded && filteredKnowledges.length > 6 ? (
        <button
          onClick={loadMore}
          className="mt-6 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center mx-auto"
        >
          Load More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      ) : expanded ? (
        <button
          onClick={showLess}
          className="mt-6 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center mx-auto"
        >
          Show Less
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      ) : null}
    </div>
  );
};

export default CommonKnowledgeLoader;
