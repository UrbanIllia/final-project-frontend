import axios from "axios";

export const API = axios.create({
  baseURL: "https://final-project-backend-rtvo.onrender.com/api/",
});

export const setAuthHeader = (token) => {
  API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  API.defaults.headers.common["Authorization"] = "";
};
