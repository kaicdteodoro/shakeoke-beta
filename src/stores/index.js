import { defineStore } from "pinia";
import { login, allQueues } from "@/router/api-routes";

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
    //queues.map((obj)=> return obj.id;).indexOf('abc')
  }),
  actions: {
    async setQueues() {
      try {
        this.queues = await allQueues();
        localStorage.setItem("queues", this.queues);
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error.response.statusText);
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
      try {
        const data = await login(email, password);

        this.user = data.userName;
        this._token = data.access_token;

        localStorage.setItem("user", this.user);
        localStorage.setItem("_token", this._token);

        this.router.push({ name: "home" });
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error.response.statusText);
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
