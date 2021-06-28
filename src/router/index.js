import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Technologies from "../views/Technologies.vue";
import RateList from "../views/RateList.vue";
import NewRate from "../views/NewRate.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/techonologies",
    name: "Technologies",
    component: Technologies,
  },
  {
    path: "/rates",
    name: "Rates",
    component: () => import("../views/Rates.vue"),
    children: [
      {
        path: "",
        name: "RateList",
        component: RateList,
      },
      {
        path: "new",
        name: "NewRate",
        component: NewRate,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
