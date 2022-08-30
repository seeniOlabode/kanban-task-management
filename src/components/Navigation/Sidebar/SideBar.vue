<template>
  <div id="sidebar" class="sm:static sm:w-72">
    <div class="sm:ml-7 z-50 sm:relative sm:w-72">
      <div
        id="logo"
        :class="[{ 'dark-mode': darkmode, 'light-mode': !darkmode }]"
      >
        <img class="sm:hidden" src="@/assets/logo-mobile.svg" alt="" />
        <img
          class="hidden sm:block light"
          src="@/assets/logo-light.svg"
          alt=""
        />
        <img class="hidden sm:block dark" src="@/assets/logo-dark.svg" alt="" />
      </div>
    </div>
    <button
      v-show="!nav.desktopNavIsOpen"
      class="items-center py-3 hidden sm:flex open-desktop-button absolute bottom-24 left-0 bg-kanban-main-purple w-14 rounded-r-full justify-center"
      @click="OPEN_DESKTOP_NAV()"
    >
      <img src="@/assets/icon-show-sidebar.svg" alt="" />
    </button>
    <navigation-box />
  </div>
</template>

<script>
import NavigationBox from "./NavigationBox.vue";
import { mapState, mapMutations } from "vuex";
import { OPEN_DESKTOP_NAV } from "@/store";

export default {
  name: "SideBar",
  components: {
    NavigationBox,
  },
  data() {
    return {
      navIsOpen: false,
    };
  },
  computed: {
    ...mapState(["darkmode", "nav"]),
  },
  methods: {
    ...mapMutations([OPEN_DESKTOP_NAV]),
  },
};
</script>

<style scoped>
#logo.dark-mode > img.dark {
  display: none;
}

#logo.light-mode > img.light {
  display: none;
}
</style>
