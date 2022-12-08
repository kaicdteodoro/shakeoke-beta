import axios from "axios";
import { useAlertStore, useAuthStore } from "@/stores";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("_token");
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

const baseUrl = `http://${window.location.hostname}:8080/api`;

//TODO: melhorar retorno das rotas de api
const routes = {
  login: `${baseUrl}/auth/login`,
  queue: (queueId) => {
    let url = `${baseUrl}/queue`;
    if (queueId) {
      url += `/${queueId}`;
    }
    return url;
  },
  queueMusic: (queueId, queueMusicId, params) => {
    let url = `${baseUrl}/queue/${queueId}/music`;
    if (queueMusicId) {
      url += `/${queueMusicId}`;
    }

    if (params?.up) {
      url += `/${params.up}`;
    }
    return url;
  },
};

export const login = async (email, password) => {
  try {
    const { data } = await axios.post(routes.login, { email, password });
    return data;
  } catch (error) {
    useAlertStore().error(error);
  }
};

//Queues

export const allQueues = async () => {
  try {
    const { data } = await axios.get(routes.queue());
    return data.data;
  } catch (error) {
    if (error.response.status === 401) {
      useAuthStore().logout();
    }
    useAlertStore().error(error);
  }
  return [];
};

export const createQueue = async (inputs) => {
  try {
    const { data } = await axios.put(routes.queue(), { name: inputs.name });
    return data.data;
  } catch (error) {
    if (error.response.status === 401) {
      useAuthStore().logout();
    }
    useAlertStore().error(error);
  }
};

export const updateQueue = async (queueId, data) => {
  try {
    await axios.patch(routes.queue(queueId), data);
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
    useAlertStore().error(error);
  }
};

//Queue Musics

export const allQueueMusics = async (queueId, query) => {
  try {
    const { data } = await axios.get(routes.queueMusic(queueId), {
      params: { show_done: query?.show_done ?? 0 },
    });
    return data.data;
  } catch (error) {
    useAlertStore().error(error);
    if (error.response?.status === 401) {
      useAuthStore().logout();
    }
  }
  return [];
};

export const createQueueMusic = async (queueId, inputs) => {
  try {
    const { data } = await axios.put(routes.queueMusic(queueId), {
      reference_name: inputs.name,
      url: inputs.url,
    });
    return data.data;
  } catch (error) {
    if (error.response.status === 401) {
      useAuthStore().logout();
    }
    useAlertStore().error(error);
  }
};

export const updateQueueMusic = async (queueId, musicId, inputs) => {
  try {
    const { data } = await axios.patch(
      routes.queueMusic(queueId, musicId),
      inputs
    );
    return data.data;
  } catch (error) {
    if (error.response?.status === 401) {
      useAuthStore().logout();
    }
    useAlertStore().error(error);
  }
};

export const turnQueueMusicPosition = async (queueId, musicId, up) => {
  try {
    const { data } = await axios.post(
      routes.queueMusic(queueId, musicId, { up: up ? "up" : "down" })
    );
    return data.data;
  } catch (error) {
    if (error.response?.status === 401) {
      useAuthStore().logout();
    }
    useAlertStore().error(error);
  }
};

export default routes;
