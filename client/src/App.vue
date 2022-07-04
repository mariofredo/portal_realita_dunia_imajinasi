<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isLogin: false,
    };
  },
  methods: {
    changeStatusIsLogin() {
      this.isLogin = true;
    },
  },
  created() {},
};
</script>

<style></style>
