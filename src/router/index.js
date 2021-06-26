import { createRouter, createWebHistory } from "vue-router";
import Technologies from "../views/Technologies.vue";
import Rates from "../views/Rates.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/techonologies",
    name: "Technologies",
    component: Technologies,
  },
  {
    path: "/rates",
    name: "Rates",
    component: Rates,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
