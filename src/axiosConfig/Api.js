import axios from "axios";

export const API = axios.create({
  baseURL: "https://final-project-backend-rtvo.onrender.com/api/",
  withCredentials: true,
});

export const setAuthHeader = (token) => {
  API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  API.defaults.headers.common["Authorization"] = "";
};

API.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(
          "https://final-project-backend-rtvo.onrender.com/api/auth/refresh",
          {},
          { withCredentials: true }
        );

        const { accessToken: newAccessToken } = response.data;

        localStorage.setItem("accessToken", newAccessToken);
        setAuthHeader(newAccessToken);

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return API(originalRequest);
      } catch (refreshError) {
        clearAuthHeader();
        localStorage.removeItem("accessToken");
        // window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
