import CampionHomes from "@/views/Champion.vue";
// import CampionHome from "@/components/Champion.vue";
import BanRecomend from "@/components/RecomandChampion.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import TestPage from "@/views/TestPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "CampionHomes",
    component: CampionHomes,
    // children: [
    //   {
    //     path: "banpick",
    //     name: "BanRecomend",
    //     component: BanRecomend,
    //   },
    // ],
  },
  {
    path: "/banPick",
    name: "banPick",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/BanPick.vue"),
  },
  {
    path: "/test",
    name: "TestPage",
    component: TestPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
