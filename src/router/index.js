import { createRouter, createWebHashHistory } from "vue-router";
import BoardView from "../views/BoardView.vue";
// import LandingPage from "../views/LandingView.vue";

const routes = [
  // {
  //   path: "/",
  //   name: "BoardHome",
  //   component: LandingPage,
  // },
  {
    path: "/",
    name: "BoardView",
    component: BoardView,
    // children: [{ path: "task", name: "task", component: SingleTaskView }],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0, behavior: "smooth" };
  },
});

export default router;
