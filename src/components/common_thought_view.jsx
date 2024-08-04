import moment from "moment";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import { getThought } from "../auth_service";
import BloodCell from "./BloodCell";

const CommonThoughtView = () => {
  const { id } = useParams();
  const [thought, setThought] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchThought = async () => {
      try {
        const thoughtData = await getThought(id);
        setThought(thoughtData);
      } catch (err) {
        setError("Failed to fetch thought details");
      } finally {
        setLoading(false);
      }
    };

    fetchThought();
  }, [id]);

  if (loading) {
    return <div className="text-center font-sans">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 font-sans">{error}</div>;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-green-100 to-white overflow-hidden flex justify-center items-center">
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
        <div className="bg-gradient-to-br to-[#3d3d3d] from-[#a7a7a7] bg-opacity-80 rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-green-300 mb-6 font-sans">
            {thought.title}
          </h2>
          <div className="mb-6 text-white font-grotesk">
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown className="text-white">
                {thought.thought}
              </ReactMarkdown>
            </div>
            <p className="mt-4">
              <strong className="font-sans">Posted on:</strong>{" "}
              {moment(thought.created_at).format("MMMM D, YYYY h:mm A")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonThoughtView;
