import { createRouter, createWebHashHistory } from "vue-router";
import BoardView from "../views/BoardView.vue";
import SingleTaskView from "../views/SingleTaskView.vue";

const routes = [
  {
    path: "/",
    name: "BoardHome",
    component: BoardView,
  },
  {
    path: "/boards/:id",
    name: "BoardView",
    component: BoardView,
    children: [{ path: "task", name: "task", component: SingleTaskView }],
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
