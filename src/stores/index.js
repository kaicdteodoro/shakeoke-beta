import {
  login,
  allQueues,
  createQueue,
  deleteQueue,
  allQueueMusics,
} from "@/router/api-routes";
import { defineStore } from "pinia";

const alertDefault = (type, message) => {
  return {
    density: "default",
    variant: "tonal",
    border: "start",
    closable: true,
    message,
    type,
  };
};

export const useAlertStore = defineStore({
  id: "alert",
  state: () => ({
    alert: null,
  }),
  actions: {
    success(message) {
      this.alert = alertDefault("success", message);
    },
    error(message) {
      this.alert = alertDefault("error", message);
    },
    info(message) {
      this.alert = alertDefault("info", message);
    },
    clear() {
      this.alert = null;
    },
  },
});

export const useShowNavBar = defineStore({
  id: "showNavBar",
  state: () => ({
    show: false,
  }),
  getters: {
    getShow(state) {
      return state.show;
    },
  },
  actions: {
    showHide(bool) {
      this.show = bool;
    },
  },
});

export const useQueueStore = defineStore({
  id: "queue",
  state: () => ({
    queues: localStorage.getItem("queues"),
  }),
  getters: {
    getQueueIds() {
      return this.queues?.map((queue) => {
        return queue.id;
      });
    },
  },
  actions: {
    async create(name) {
      const data = await createQueue(name);
      if (data) {
        console.log(data);
        this.queues.unshift(data);
      }
    },

    async delete(queueId) {
      await deleteQueue(queueId);
      let index = this.getQueueIds.indexOf(queueId);
      this.queues.splice(index, 1);
    },
    async setQueues() {
      this.queues = await allQueues();
      if (this.queues) {
        localStorage.setItem("queues", this.queues);
        this.getQueueIds.forEach((id) => {
          useQueueMusicStore().setMusics(id);
        });
      }
    },
  },
});

export const useQueueMusicStore = defineStore({
  id: "queueMusic",
  state: () => ({
    queueMusic: [],
  }),
  actions: {
    async setMusics(queueId) {
      try {
        let data = {
          queue_id: queueId,
          musics: await allQueueMusics(queueId),
        };
        this.queueMusic.push(data);
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
  },
});

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: localStorage.getItem("user"),
    _token: localStorage.getItem("_token"),
  }),
  actions: {
    async login(email, password) {
      const data = await login(email, password);
      if (data) {
        this.user = data.name;
        this._token = data.access_token;

        localStorage.setItem("user", this.user);
        localStorage.setItem("_token", this._token);

        this.router.push({ name: "home" });
      }
    },
    async logout() {
      this.user = null;
      this._token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("_token");
      localStorage.removeItem("queues");
      this.router.push({ name: "account.login" });
    },
  },
});
