// src/auth_service.js
import api from "./api";

export const loginDonor = async (email, password) => {
  const response = await api.post("/login/donor", { email, password });
  return response.data;
};

export const loginHospital = async (email, password) => {
  const response = await api.post("/login/hospital", { email, password });
  return response.data;
};

export const registerDonor = async (donorData) => {
  const response = await api.post("/register/donor", donorData);
  return response.data;
};

export const registerHospital = async (hospitalData) => {
  const response = await api.post("/register/hospital", hospitalData);
  return response.data;
};
