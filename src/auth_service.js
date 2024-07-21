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
