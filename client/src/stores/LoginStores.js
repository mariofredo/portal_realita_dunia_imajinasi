import { defineStore } from "pinia";
import axios from "axios";
export const useLoginStore = defineStore({
  id: "LoginPage",
  state: () => ({
    email: "",
    password: "",
  }),
  getters: {},
  actions: {
    login() {
      return axios({
        method: "POST",
        url: "https://portalrealita.herokuapp.com/users/login",
        data: {
          email: this.email,
          password: this.password,
        },
      });
    },
  },
});
