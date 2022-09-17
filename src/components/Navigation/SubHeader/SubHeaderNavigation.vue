<template>
  <div class="relative" @mouseleave="closeSubNav">
    <button
      class="ml-4 pr-4 sm:ml-6 w-full flex justify-center"
      @click="toggleSettings()"
    >
      <img src="@/assets/icon-vertical-ellipsis.svg" alt="" />
    </button>

    <div
      v-if="settingsOpen"
      id="drop-menu"
      :class="[
        'absolute',
        'top-12',
        'right-0',
        'w-48',
        'p-4',
        'z-20',
        'rounded-lg',
        { 'dark-mode': darkmode, 'light-mode': !darkmode },
      ]"
      @mouseleave="closeSubNav()"
      @mouseenter="subNavHover = true"
    >
      <ul>
        <button
          class="text-kanban-medium-grey text-sm mb-5 hover:cursor-pointer w-full text-left"
          @click="openEditBoard()"
        >
          Edit Board
        </button>
        <button
          class="text-kanban-red text-sm hover:text-kanban-red-hover text-left w-full hover:cursor-pointer"
          @click="openDeleteBoard()"
        >
          Delete Board
        </button>
      </ul>

      <div class=""></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "SubHeaderSettings",
  data() {
    return {
      settingsOpen: false,
      subNavHover: false,
    };
  },
  computed: {
    // ...mapState(["darkmode"]),
    ...mapState({
      darkmode: (state) => state.darkmode,
      displayedBoard: (state) =>
        Boolean(state.TasksModule.displayedBoard.tasks),
    }),
  },
  methods: {
    toggleSettings() {
      this.settingsOpen = this.settingsOpen ? false : true;
      this.subNavHover = true;
    },
    closeSubNav() {
      this.subNavHover = false;
      setTimeout(() => {
        if (!this.subNavHover) {
          this.settingsOpen = false;
        }
      }, 1500);
    },
    openDeleteBoard() {
      this.$store.dispatch("TasksModule/turnFunctionalityOn", "deleteBoard");
      this.settingsOpen = false;
    },
    openEditBoard() {
      this.$store.dispatch("TasksModule/turnFunctionalityOn", "editBoard");
      this.settingsOpen = false;
    },
  },
};
</script>

<style scoped>
#drop-menu.dark-mode {
  @apply bg-kanban-very-dark-grey border-solid border-kanban-lines-dark border;
}

#drop-menu.light-mode {
  @apply bg-kanban-white border-solid border border-kanban-lines-light;
}
</style>
