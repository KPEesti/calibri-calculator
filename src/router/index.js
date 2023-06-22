import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CorpView from "@/views/CorpView.vue";
import LandView from "@/views/LandView.vue";
import IndividualView from "@/views/IndividualView.vue";

export const routes = [
  {
    path: "/",
    component: HomeView
  },
  {
    path: "/corp",
    component: CorpView
  },
  {
    path: "/land",
    component: LandView
  },
  {
    path: "/ind",
    component: IndividualView
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
});

export default router;
