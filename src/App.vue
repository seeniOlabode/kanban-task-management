<template>
  <main-nav
    :class="[
      'h-16',
      'flex',
      'items-center',
      'px-4',
      'sm:pr-8',
      'sm:pl-0',
      'justify-between',
      'sm:h-20',
      { 'dark-mode': darkmode, 'light-mode': !darkmode },
    ]"
  />
  <router-view />
</template>

<script>
import MainNav from "./components/Navigation/MainNav.vue";

import { mapState, mapMutations, mapActions } from "vuex";
import {
  SET_WINDOW_WIDTH,
  CLOSE_MOBILE_NAV,
  FETCH_TASKS,
  ADD_BOARD,
} from "@/store";

export default {
  name: "App",
  components: {
    MainNav,
  },

  computed: {
    ...mapState(["windowWidth", "darkmode"]),
  },

  async mounted() {
    // this.ADD_BOARD();
    this.onResize();
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
    this.$store.dispatch("fetchDefaultTheme");
    this.FETCH_TASKS();
    this.$store.dispatch("TasksModule/fetchTasks");
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },

  methods: {
    ...mapMutations([SET_WINDOW_WIDTH, CLOSE_MOBILE_NAV]),
    ...mapActions([FETCH_TASKS, ADD_BOARD]),
    onResize() {
      if (this.windowWidth < 640) {
        this.CLOSE_MOBILE_NAV();
      }
      this.SET_WINDOW_WIDTH(window.innerWidth);
    },
  },
};
</script>

<style>
#app {
  font-family: "Plus Jakarta Sans", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;
  overflow: scroll;
}

header.dark-mode {
  @apply bg-kanban-dark-grey;
}

header.light-mode {
  @apply bg-kanban-white;
}
</style>
