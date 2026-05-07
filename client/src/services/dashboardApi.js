import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api"
});

export async function fetchDashboard(filters) {
  const response = await api.get("/dashboard", { params: filters });
  return response.data;
}
