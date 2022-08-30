import { createApp } from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import store from "./store";
import router from "./router";
import { rtdbPlugin } from "vuefire";
import Vue from "vue";

createApp(App).use(router).use(store).mount("#app");

Vue.use(rtdbPlugin);
