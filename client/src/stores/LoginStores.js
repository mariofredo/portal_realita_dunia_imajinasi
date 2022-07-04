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
        url: "http://localhost:3000/users/login",
        data: {
          email: this.email,
          password: this.password,
        },
      });
    },
  },
});
