import { defineStore } from "pinia";
import axios from "axios";
export const useRegisterStore = defineStore({
  id: "RegisterPage",
  state: () => ({
    regUsername: "",
    regEmail: "",
    regPassword: "",
  }),
  getters: {},
  actions: {
    register() {
      return axios({
        method: "POST",
        url: "http://localhost:3000/users/register",
        data: {
          username: this.regUsername,
          email: this.regEmail,
          password: this.regPassword,
        },
      });
    },
  },
});
