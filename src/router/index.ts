import CampionHomes from "@/views/Champion.vue";
// import CampionHome from "@/components/Champion.vue";
import BanRecomend from "@/components/BanPick.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

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
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
