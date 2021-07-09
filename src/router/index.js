import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Technologies from "../views/Technologies.vue";
import Rates from "../views/Rates.vue";
import RateList from "../views/RateList.vue";
import NewRate from "../views/NewRate.vue";
import EditRate from "../views/EditRate.vue";
import CalcRates from "../views/CalcRates.vue";
import CalcRatesParams from "../views/CalcRatesParams.vue";
import CalcRatesResult from "../views/CalcRatesResult.vue";

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
    component: Rates,
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
      {
        path: "edit",
        name: "EditRate",
        props: true,
        component: EditRate,
      },
      {
        path: "calculate",
        name: "CalcRates",
        component: CalcRates,
        children: [
          {
            path: "",
            name: "CalcRatesParams",
            component: CalcRatesParams,
          },
          {
            path: "result",
            name: "CalcRatesResult",
            component: CalcRatesResult,
          },
        ],
      },
    ],
  },
  {
    path: "/404",
    name: "NotFound",
    component: () => import("@/views/404.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
