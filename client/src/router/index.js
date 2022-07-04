import VueRouter from "vue-router";
import LoginPage from "@/components/LoginPage.vue";
import CommentPage from "@/components/CommentPage.vue";
import RegisterPage from "@/components/RegisterPage.vue";
import Vue from "vue";
Vue.use(VueRouter);

const routes = [
  { path: "/", name: "CommentPage", component: CommentPage },
  { path: "/login", name: "LoginPage", component: LoginPage },
  { path: "/register", name: "RegisterPage", component: RegisterPage },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === "CommentPage" && !localStorage.getItem("access_token")) {
    next({ name: "LoginPage" });
  } else if (to.name === "LoginPage" && localStorage.getItem("access_token")) {
    next({ name: "CommentPage" });
  }
  next();
});

export default router;
