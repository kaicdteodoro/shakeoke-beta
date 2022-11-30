import axios from "axios";
import { useAlertStore, useAuthStore } from "@/stores";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("_token");
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

const baseUrl = "http://localhost:8080/api";
const routes = {
  login: `${baseUrl}/auth/login`,
  allQueues: `${baseUrl}/queue`,
};

export const login = async (email, password) => {
  const { data } = await axios.post(routes.login, { email, password });

  return {
    userName: data.name,
    access_token: data.access_token,
  };
};

export const allQueues = async () => {
  try {
    const { data } = await axios.get(routes.allQueues);
    return data.data;
  } catch (error) {
    if (error.response.status === 401) {
      useAuthStore().logout();
    }
    useAlertStore().error(error.response.statusText);
  }
  return [];
};

export default routes;
