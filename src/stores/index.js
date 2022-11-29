//import axios from "axios";

import { defineStore } from "pinia";

//const baseUrl = `http://localhost:8080/api`;

export const useAlertStore = defineStore({
  id: "alert",
  state: () => ({
    alert: null,
  }),
  actions: {
    success(message) {
      this.alert = {
        density: "compact",
        variant: "text",
        type: "success",
        message,
      };
    },
    error(message) {
      this.alert = {
        density: "compact",
        variant: "text",
        type: "error",
        message,
      };
    },
    loginError(message) {
      this.alert = {
        density: "compact",
        variant: "text",
        type: "error",
        message,
      };
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

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: JSON.parse(localStorage.getItem("user")),
    _token: localStorage.getItem("_token"),
  }),
  actions: {
    async login(email, password) {
      try {
        this._token = "teste";
        console.log(email, password, this._token);
        /* const data = await axios.post(`${baseUrl}/auth/login`, {
          email,
          password,
        });

        // update pinia state
        this.user = user;

        // store user details and jwt in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(user));
*/
        // redirect to previous url or default to home page
        return this.router.push({name: "home"});
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.loginError(error);
      }
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user");
   //   router.push({ name: "account.login" });
    },
  },
});

/* export const useUsersStore = defineStore({
  id: "users",
  state: () => ({
    users: {},
    user: {},
  }),
  actions: {
    async register(user) {
      await axios.post(`${baseUrl}/register`, user);
    },
    async getAll() {
      this.users = { loading: true };
      try {
        this.users = await axios.get(baseUrl);
      } catch (error) {
        this.users = { error };
      }
    },
    async getById(id) {
      this.user = { loading: true };
      try {
        this.user = await axios.get(`${baseUrl}/${id}`);
      } catch (error) {
        this.user = { error };
      }
    },
    async update(id, params) {
      await axios.put(`${baseUrl}/${id}`, params);

      // update stored user if the logged in user updated their own record
      const authStore = useAuthStore();
      if (id === authStore.user.id) {
        // update local storage
        const user = { ...authStore.user, ...params };
        localStorage.setItem("user", JSON.stringify(user));

        // update auth user in pinia state
        authStore.user = user;
      }
    },
    async delete(id) {
      // add isDeleting prop to user being deleted
      this.users.find((x) => x.id === id).isDeleting = true;

      await axios.delete(`${baseUrl}/${id}`);

      // remove user from list after deleted
      this.users = this.users.filter((x) => x.id !== id);

      // auto logout if the logged in user deleted their own record
      const authStore = useAuthStore();
      if (id === authStore.user.id) {
        authStore.logout();
      }
    },
  },
}); */
