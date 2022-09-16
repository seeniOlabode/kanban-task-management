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
        'top-8',
        'right-0',
        'w-48',
        'p-4',
        'rounded-lg',
        { 'dark-mode': darkmode, 'light-mode': !darkmode },
      ]"
      @mouseleave="closeSubNav()"
      @mouseenter="subNavHover = true"
    >
      <ul>
        <button
          class="text-kanban-medium-grey text-sm mb-5 hover:cursor-pointer w-full text-left"
          @click="openEditTask()"
        >
          Edit Task
        </button>
        <button
          class="text-kanban-red text-sm hover:text-kanban-red-hover text-left w-full hover:cursor-pointer"
          @click="deleteTask()"
        >
          Delete Task
        </button>
      </ul>

      <div class=""></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ViewTasksSettings",
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
      displayedTaskId: (state) => state.TasksModule.displayedTask.id,
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
    openEditTask() {
      this.$store.dispatch("TasksModule/turnFunctionalityOn", "editTask");
      this.settingsOpen = false;
    },
    deleteTask() {},
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
