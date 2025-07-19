import axios from "axios";

export const authAPI = axios.create({
  baseURL: "https://final-project-backend-rtvo.onrender.com/",
});

export const setAuthHeader = (token) => {
  authAPI.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  authAPI.defaults.headers.common["Authorization"] = "";
};
