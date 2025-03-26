import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "draw",
    component: () => import("../views/DrawPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
