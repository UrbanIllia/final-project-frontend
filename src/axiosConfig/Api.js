import axios from "axios";

export const API = axios.create({
  baseURL: "https://final-project-backend-rtvo.onrender.com/api/",
  withCredentials: true,
});

export const setAuthHeader = (accessToken) => {
  API.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
};

export const clearAuthHeader = () => {
  API.defaults.headers.common["Authorization"] = "";
};

API.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
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

        const { accessToken } = response.data;

        localStorage.setItem("accessToken", accessToken);
        setAuthHeader(accessToken);

        return API(originalRequest);
      } catch (refreshError) {
        console.error("Не вдалося оновити токен:", refreshError);
        localStorage.removeItem("accessToken");
        clearAuthHeader();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
