import api from "./api";

export const createBloodRequest = async (requestData) => {
  try {
    const response = await api.post("/Requests/create", requestData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getRequestNotifications = async (blood_type, urgency_level) => {
  try {
    const params = new URLSearchParams();
    if (blood_type) params.append("blood_type", blood_type);
    if (urgency_level) params.append("urgency_level", urgency_level);

    const response = await api.get(`/Requests/notification?${params}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const loginDonor = async (email, password) => {
  try {
    const response = await api.post("/donors/auth/login", { email, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const loginHospital = async (email, password) => {
  try {
    const response = await api.post("/hospital/auth/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const registerDonor = async (donorData) => {
  try {
    const response = await api.post("/donors/auth/register", donorData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const registerHospital = async (hospitalData) => {
  try {
    const response = await api.post("/hospital/auth/register", hospitalData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getRequestDetails = async (requestId) => {
  try {
    const response = await api.get(`/Requests/${requestId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const createDonationHistory = async (donationData) => {
  try {
    console.log("Sending donation data:", donationData);
    const response = await api.post(
      "/donors/donation_history/create",
      donationData
    );
    console.log("Server response:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error details:", error.message);
    }
    throw error;
  }
};

export const getDonationHistory = async (donorId) => {
  try {
    const response = await api.get(`/donors/donation_history/donor/${donorId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const updateDonationHistory = async (id, donationData) => {
  try {
    console.log("Updating donation history:", id, donationData);
    const response = await api.put(
      `/donors/donation_history/${id}`,
      donationData
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating donation history:",
      error.response?.data || error.message
    );
    if (error.response && error.response.data) {
      console.error("Server error details:", error.response.data);
    }
    throw error.response ? error.response.data : error.message;
  }
};

export const deleteDonationHistory = async (id) => {
  try {
    const response = await api.delete(`/donors/donation_history/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const createEvent = async (eventData) => {
  try {
    const response = await api.post("/donors/events/create", eventData);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating event:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

export const getEvents = async (donorId) => {
  try {
    const response = await api.get(`/donors/events/browse/${donorId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching events:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

export const updateEvent = async (eventId, eventData) => {
  try {
    const response = await api.put(`/donors/events/${eventId}`, eventData);
    return response.data;
  } catch (error) {
    console.error(
      "Error updating event:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

export const deleteEvent = async (eventId) => {
  try {
    const response = await api.delete(`/donors/events/${eventId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting event:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

export const createEventPost = async (eventData) => {
  try {
    const response = await api.post("/hospital/event_posts/create", eventData);
    return response.data;
  } catch (error) {
    console.error("Error creating event post:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const getHospitalEventPosts = async (hospitalId) => {
  try {
    if (!Number.isInteger(hospitalId)) {
      throw new Error("Hospital ID must be an integer");
    }
    console.log(`Fetching event posts for hospital ID: ${hospitalId}`);
    let url = `/hospital/event_posts/browse/${hospitalId}`;

    console.log(`API request URL: ${url}`);
    const response = await api.get(url);
    console.log("API response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("API error:", error);
    if (error.response) {
      console.error("Error response:", error.response.data);
      console.error("Error status:", error.response.status);
    } else if (error.request) {
      console.error("Error request:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    throw error.response ? error.response.data : error.message;
  }
};

export const getEventPost = async (id) => {
  try {
    const response = await api.get(`/hospital/event_posts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching event post:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const updateEventPost = async (id, eventData) => {
  try {
    console.log("Updating event post with ID:", id);
    console.log("Event data being sent:", eventData);
    const response = await api.put(`/hospital/event_posts/${id}`, eventData);
    return response.data;
  } catch (error) {
    console.error("Error updating event post:", error);
    console.error("Error response:", error.response?.data);
    throw error.response ? error.response.data : error.message;
  }
};

export const deleteEventPost = async (id) => {
  try {
    const response = await api.delete(`/hospital/event_posts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting event post:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const getStatsCounts = async (startDate, endDate) => {
  try {
    const params = new URLSearchParams();
    if (startDate) params.append("start_date", startDate);
    if (endDate) params.append("end_date", endDate);

    const response = await api.get(`/stats/counts?${params}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching stats counts:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const getAllEventPosts = async (startDate, endDate) => {
  try {
    const params = new URLSearchParams();
    if (startDate) params.append("start_date", startDate);
    if (endDate) params.append("end_date", endDate);

    const response = await api.get(`/hospital/event_posts/all?${params}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all event posts:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const createKnowledge = async (knowledgeData) => {
  try {
    const response = await api.post(
      "/hospital/knowledges/create",
      knowledgeData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating knowledge post:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const getHospitalKnowledges = async (hospitalId) => {
  try {
    if (!Number.isInteger(hospitalId)) {
      throw new Error("Hospital ID must be an integer");
    }
    console.log(`Fetching knowledges for hospital ID: ${hospitalId}`);
    let url = `/hospital/knowledges/browse/${hospitalId}`;

    console.log(`API request URL: ${url}`);
    const response = await api.get(url);
    console.log("API response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("API error:", error);
    if (error.response) {
      console.error("Error response:", error.response.data);
      console.error("Error status:", error.response.status);
    } else if (error.request) {
      console.error("Error request:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    throw error.response ? error.response.data : error.message;
  }
};

// Add these functions to your existing auth_service.js file

export const getKnowledge = async (id) => {
  try {
    const response = await api.get(`/hospital/knowledges/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching knowledge:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const updateKnowledge = async (id, knowledgeData) => {
  try {
    const response = await api.put(`/hospital/knowledges/${id}`, knowledgeData);
    return response.data;
  } catch (error) {
    console.error("Error updating knowledge:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const deleteKnowledge = async (id) => {
  try {
    const response = await api.delete(`/hospital/knowledges/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting knowledge:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const getAllKnowledges = async () => {
  try {
    const response = await api.get("/hospital/knowledges/all");
    return response.data;
  } catch (error) {
    console.error("Error fetching all knowledges:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const createThought = async (thoughtData) => {
  try {
    const response = await api.post("/donors/thoughts/create", thoughtData);
    return response.data;
  } catch (error) {
    console.error("Error creating thought:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const getAllThoughts = async () => {
  try {
    const response = await api.get("/donors/thoughts/all");
    return response.data;
  } catch (error) {
    console.error("Error fetching all thoughts:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const getThought = async (id) => {
  try {
    const response = await api.get(`/donors/thoughts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching thought:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const updateThought = async (id, thoughtData) => {
  try {
    const response = await api.put(`/donors/thoughts/${id}`, thoughtData);
    return response.data;
  } catch (error) {
    console.error("Error updating thought:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const deleteThought = async (id) => {
  try {
    const response = await api.delete(`/donors/thoughts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting thought:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const getDonorThoughts = async (donorId) => {
  try {
    const response = await api.get(`/donors/thoughts/browse/${donorId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching donor thoughts:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const getAllRequests = async () => {
  try {
    const response = await api.get("/Requests/all");
    return response.data;
  } catch (error) {
    console.error("Error fetching all requests:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const getRequestsByBloodType = async (bloodType) => {
  try {
    const response = await api.get(`/Requests/byBloodType/${bloodType}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching requests by blood type:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const getAllDonationHistory = async () => {
  try {
    const response = await api.get("/donors/donation_history/all");
    return response.data;
  } catch (error) {
    console.error("Error fetching all donation history:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const getDonationHistoryByBloodType = async (bloodType) => {
  try {
    const response = await api.get(
      `/donors/donation_history/byBloodType/${bloodType}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching donation history by blood type:", error);
    throw error.response ? error.response.data : error.message;
  }
};
