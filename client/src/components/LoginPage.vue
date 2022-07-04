<template>
  <div class="loginpage">
    <div class="container-fluid">
      <div class="row">
        <div class="col-4 mx-auto login_form">
          <h1 class="mt-3" style="color: #f9f7f7">Login</h1>
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
          <b-button class="login_btn" @click.prevent="handleLogin"
            >Submit</b-button
          >
          <p style="color: #f9f7f7">
            Don't have an account yet?
            <a
              href=""
              @click.prevent="handleGoToRegister"
              style="color: #f9f7f7"
              >Sign Up</a
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useLoginStore } from "@/stores/LoginStores";
import { mapWritableState, mapActions } from "pinia";
export default {
  name: "LoginPage",
  data() {
    return {
      localEmail: "",
      localPassword: "",
    };
  },
  computed: {
    ...mapWritableState(useLoginStore, ["email", "password"]),
  },
  methods: {
    ...mapActions(useLoginStore, ["login"]),
    async handleLogin() {
      try {
        this.email = this.localEmail;
        this.password = this.localPassword;
        const { data } = await this.login();
        localStorage.setItem("access_token", data.access_token);
        this.$router.push("/");
      } catch (err) {
        this.$swal.fire({
          icon: "error",
          title: err.response.status,
          text: err.response.data.message,
        });
      } finally {
        this.localEmail = "";
        this.localPassword = "";
      }
    },
    handleGoToRegister() {
      this.$router.push("/register");
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
