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
