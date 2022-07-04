<template>
  <div class="loginpage">
    <div class="container-fluid">
      <div class="row">
        <div class="col-4 mx-auto login_form">
          <h1 class="mt-3" style="color: #f9f7f7">Register</h1>
          <b-form-group label="Username" class="my-3 form-input">
            <b-form-input
              id="input-1"
              v-model="localUsername"
              type="text"
              trim
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Email" class="my-3 form-input">
            <b-form-input
              id="input-1"
              v-model="localEmail"
              type="email"
              trim
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Password" class="my-3 form-input">
            <b-form-input
              id="input-1"
              v-model="localPassword"
              type="password"
              trim
            ></b-form-input>
          </b-form-group>
          <b-button class="login_btn" @click="handleRegister">Submit</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRegisterStore } from "@/stores/RegisterStore";
import { mapWritableState } from "pinia";
import { mapActions } from "pinia";
export default {
  name: "RegisterPage",
  data() {
    return {
      localUsername: "",
      localEmail: "",
      localPassword: "",
    };
  },
  computed: {
    ...mapWritableState(useRegisterStore, [
      "regEmail",
      "regUsername",
      "regPassword",
    ]),
  },
  methods: {
    ...mapActions(useRegisterStore, ["register"]),
    async handleRegister() {
      try {
        this.regUsername = this.localUsername;
        this.regEmail = this.localEmail;
        this.regPassword = this.localPassword;
        await this.register();
        this.$router.push("/login");
      } catch (err) {
        console.log(err);
      } finally {
        this.localUsername = "";
        this.localEmail = "";
        this.localPassword = "";
      }
    },
  },
};
</script>

<style>
.loginpage {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #dbe2ef;
}
.login_form {
  background: #3f72af;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form-input {
  width: 80%;
  color: #f9f7f7 !important;
}
.login_btn {
  background: #112d4e !important;
  border-radius: 10px;
  margin: 5% 0;
}
.login_btn:hover {
  background: #dbe2ef !important;
  color: #3f72af !important;
}
</style>
