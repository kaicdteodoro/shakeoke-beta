import axios from "axios";
import { useAlertStore, useAuthStore } from "@/stores";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("_token");
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

const baseUrl = "http://localhost:8080/api";

//TODO: melhorar retorno das rotas de api
const routes = {
  login: `${baseUrl}/auth/login`,
  queues: `${baseUrl}/queue`,
  queue: (queueId) => {
    return `${baseUrl}/queue/${queueId}`;
  },
  allQueueMusics: (queueId) => {
    return `${baseUrl}/queue/${queueId}/music`;
  },
};

export const login = async (email, password) => {
  try {
    const { data } = await axios.post(routes.login, { email, password });
    return data;
  } catch (error) {
    useAlertStore().error(error.response.statusText);
  }
};

export const allQueues = async () => {
  try {
    const { data } = await axios.get(routes.queues);
    return data.data;
  } catch (error) {
    if (error.response.status === 401) {
      useAuthStore().logout();
    }
    useAlertStore().error(error.response.statusText);
  }
  return [];
};

export const allQueueMusics = async (queueId) => {
  try {
    const { data } = await axios.get(routes.allQueueMusics(queueId));
    return data.data;
  } catch (error) {
    if (error.response.status === 401) {
      useAuthStore().logout();
    }
    useAlertStore().error(error.response.statusText);
  }
  return [];
};

export const createQueue = async (name) => {
  try {
    const { data } = await axios.put(routes.queues, { name: name });
    return data.data;
  } catch (error) {
    if (error.response.status === 401) {
      useAuthStore().logout();
    }
    useAlertStore().error(error.response.statusText);
  }
};

export const deleteQueue = async (queueId) => {
  try {
    await axios.delete(routes.queue(queueId));
  } catch (error) {
    if (error.response.status === 401) {
      useAuthStore().logout();
    }
    useAlertStore().error(error.response.statusText);
  }
};

export default routes;
