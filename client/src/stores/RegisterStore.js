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
        url: "https://portalrealita.herokuapp.com/users/register",
        data: {
          username: this.regUsername,
          email: this.regEmail,
          password: this.regPassword,
        },
      });
    },
  },
});
