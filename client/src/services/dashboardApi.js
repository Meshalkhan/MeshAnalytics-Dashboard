import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

const api = axios.create({
  baseURL
});

export async function fetchDashboard(filters) {
  const response = await api.get("/dashboard", { params: filters });
  return response.data;
}
