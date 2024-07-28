import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getHospitalEventPosts } from "../auth_service";
import EventCard from "./event_card";

const DonationEventLoader = () => {
  const [eventPosts, setEventPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hospitalInfo, setHospitalInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedHospitalInfo = localStorage.getItem("hospitalInfo");
    console.log("Stored hospital info:", storedHospitalInfo);
    if (storedHospitalInfo) {
      try {
        const parsedInfo = JSON.parse(storedHospitalInfo);
        console.log("Parsed hospital info:", parsedInfo);
        setHospitalInfo(parsedInfo);
      } catch (e) {
        console.error("Error parsing hospital info:", e);
        setError("Error retrieving hospital information. Please log in again.");
      }
    } else {
      console.log("No hospital info found in localStorage");
      setError("Hospital information not found. Please log in again.");
    }
  }, []);

  useEffect(() => {
    const fetchEventPosts = async () => {
      if (!hospitalInfo || !hospitalInfo.id) {
        console.error("Hospital ID is missing or invalid:", hospitalInfo);
        setError("Invalid hospital information. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching posts for hospital ID:", hospitalInfo.id);
        const posts = await getHospitalEventPosts(
          parseInt(hospitalInfo.id, 10)
        );
        console.log("Fetched event posts:", posts);
        setEventPosts(posts);
      } catch (err) {
        console.error("Error fetching event posts:", err);
        setError(`Failed to fetch event posts: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (hospitalInfo) {
      fetchEventPosts();
    }
  }, [hospitalInfo]);

  if (loading) {
    return <div className="text-white text-center">Loading event posts...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        {error}
        <button
          onClick={() => navigate("/login")}
          className="ml-2 text-blue-500 underline"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#5b5b5b] to-[#3d3d3d] bg-opacity-90 rounded-lg shadow-lg p-10 w-full max-w-3xl flex flex-col justify-between z-10 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventPosts.slice(0, 3).map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      {eventPosts.length === 0 && (
        <p className="text-white text-center">No event posts available.</p>
      )}
    </div>
  );
};

export default DonationEventLoader;
