<template>
  <nav
    v-show="showState"
    id="boards-nav"
    :class="[
      'sm:w-72',
      'z-20',
      'absolute',
      'w-screen',
      'h-screen',
      'top-0',
      'left-0',
      'flex',
      'items-center',
      'justify-center',
      'mobile',
      'sm:rounded-none',
      'sm:absolute',
      'sm:h-screen',
      'sm:top-0',
      'sm:left-0',
      'overflow-scroll',
      { 'dark-mode': darkmode, 'light-mode': !darkmode },
    ]"
    @click="closeMenu($event)"
  >
    <div
      id="nav-container"
      :class="[
        'w-72',
        'opacity-100',
        'rounded-lg',
        'py-4',
        'sm:rounded-none',
        'sm:h-full',
        'sm:relative',
        'sm:content-between',
        'sm:flex',
        'sm:flex-wrap',
        { 'dark-mode': darkmode, 'light-mode': !darkmode },
      ]"
    >
      <boards-navigation />
      <div class="basis-full">
        <div
          id="box-control"
          :class="[
            'flex',
            'justify-center',
            'gap-6',
            'py-4',
            'mx-4',
            'rounded-lg',
            { 'dark-mode': darkmode, 'light-mode': !darkmode },
          ]"
        >
          <button><img src="@/assets/icon-light-theme.svg" alt="" /></button>
          <button v-show="darkmode === true" @click="darkmodeOff()">
            <img src="@/assets/icon-toggle-on.svg" alt="" />
          </button>
          <button v-show="darkmode === false" @click="darkmodeOn">
            <img src="@/assets/icon-toggle-off.svg" alt="" />
          </button>
          <button><img src="@/assets/icon-dark-theme.svg" alt="" /></button>
        </div>
        <button
          v-show="nav.desktopNavIsOpen"
          class="items-center ml-4 mt-4 py-3 mb-4 hidden sm:flex"
          @click="CLOSE_DESKTOP_NAV()"
        >
          <img src="@/assets/icon-hide-sidebar.svg" alt="" /><span
            class="ml-3 text-kanban-medium-grey"
            >Hide Sidebar</span
          >
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { CLOSE_MOBILE_NAV, CLOSE_DESKTOP_NAV, OPEN_DESKTOP_NAV } from "@/store";

import BoardsNavigation from "./BoardsNavigation.vue";

export default {
  name: "NavigationBox",
  components: {
    BoardsNavigation,
  },
  emits: ["closeNav"],
  computed: {
    // ...mapState(["nav", "windowWidth", "darkmode", "tasks"]),
    ...mapState({
      nav: (state) => state.nav,
      windowWidth: (state) => state.windowWidth,
      darkmode: (state) => state.darkmode,
      tasks: (state) => state.TasksModule.boards,
    }),
    boards() {
      return this.tasks;
    },
    showState() {
      let returnValue;
      if (this.windowWidth >= 640) {
        returnValue = this.nav.desktopNavIsOpen;
      } else {
        returnValue = this.nav.mobileNavIsOpen;
      }
      return returnValue;
    },
  },
  methods: {
    ...mapMutations([
      CLOSE_MOBILE_NAV,
      "setDarkMode",
      CLOSE_DESKTOP_NAV,
      OPEN_DESKTOP_NAV,
    ]),
    closeMenu($event) {
      if ($event.target.tagName === "NAV") {
        this.CLOSE_MOBILE_NAV();
      }
    },
    darkmodeOn() {
      this.$store.commit("setDarkMode", { scheme: "dark", override: true });
    },
    darkmodeOff() {
      this.$store.commit("setDarkMode", { scheme: "light", override: true });
    },
  },
};
</script>

<style scoped>
nav.mobile {
  background: rgb(0, 1, 18, 0.5);
}

nav.dark-mode {
  @apply sm:bg-kanban-dark-grey;
}

nav.light-mode {
  @apply sm:bg-kanban-white;
}

@media (min-width: 640px) {
  nav {
    padding-top: 85px;
  }
  nav.mobile.dark-mode {
    @apply bg-kanban-dark-grey border-r border-solid border-kanban-lines-dark;
  }
  nav.mobile.light-mode {
    @apply bg-kanban-white border-kanban-lines-light border-r border-solid;
  }
}

.box-board.active {
  @apply bg-kanban-main-purple rounded-r-full text-kanban-white;
}

#nav-container.dark-mode {
  @apply bg-kanban-dark-grey;
}

#nav-container.light-mode {
  @apply bg-kanban-white;
}

#box-control.dark-mode {
  @apply bg-kanban-very-dark-grey;
}

#box-control.light-mode {
  @apply bg-kanban-light-grey;
}

.open-desktop-button {
  display: inline;
  position: absolute;
}
</style>
