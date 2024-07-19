import api from "./api";

export const loginDonor = async (email, password) => {
  const response = await api.post("/donors/auth/login", { email, password });
  return response.data;
};

export const loginHospital = async (email, password) => {
  const response = await api.post("/hospital/auth/login", { email, password });
  return response.data;
};

export const registerDonor = async (donorData) => {
  const response = await api.post("/donors/auth/register", donorData);
  return response.data;
};

export const registerHospital = async (hospitalData) => {
  const response = await api.post("/hospital/auth/register", hospitalData);
  return response.data;
};
