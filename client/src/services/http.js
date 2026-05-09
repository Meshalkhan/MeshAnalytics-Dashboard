import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

export const http = axios.create({
  baseURL,
  timeout: 15_000,
  headers: { Accept: "application/json" }
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const body = error.response?.data;
    const errorBody = body?.error ?? body;
    const message = errorBody?.message || error.message || "Request failed";

    const normalized = new Error(message);
    normalized.code = errorBody?.code || error.code || "NETWORK_ERROR";
    normalized.status = error.response?.status;
    normalized.details = errorBody?.details;
    return Promise.reject(normalized);
  }
);
