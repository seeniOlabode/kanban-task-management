<template>
  <header
    :class="['sm:border-b', { 'dark-mode': darkmode, 'light-mode': !darkmode }]"
  >
    <side-bar
      :class="[
        'sm:w-72',
        'sm:top-0;',
        'sm:left-0',
        'sm:z-50',
        'sm:flex',
        'sm:items-center',
        { 'dark-mode': darkmode, 'light-mode': !darkmode },
      ]"
    />
    <sub-header />
  </header>
</template>

<script>
import SubHeader from "./SubHeader/SubHeader.vue";
import SideBar from "./Sidebar/SideBar.vue";

import { mapState } from "vuex";

export default {
  name: "MainNav",
  components: {
    SideBar,
    SubHeader,
  },
  computed: {
    ...mapState(["darkmode"]),
  },
};
</script>

<style scoped>
#sidebar.dark-mode {
  @apply sm:bg-kanban-dark-grey;
}

#sidebar.light-mode {
  @apply sm:bg-kanban-white;
}

header.dark-mode {
  @apply sm:border-kanban-lines-dark;
}

header.light-mode {
  @apply sm:border-kanban-lines-light;
}
</style>
