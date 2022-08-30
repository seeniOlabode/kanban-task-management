<template>
  <main
    :class="[
      'sm:ml-72',
      'h-full',
      'overflow-scroll',
      'p-6',
      {
        'dark-mode': darkmode,
        'light-mode': !darkmode,
        'desk-nav-closed': !nav.desktopNavIsOpen,
      },
    ]"
  >
    <div
      v-if="displayedBoard ? displayedBoard.columns.length <= 0 : false"
      class="h-full w-full flex items-center justify-center flex-wrap content-center gap-6"
    >
      <h3 class="text-center dark-mode w-2/3">
        This board is empty. Create a new column to get started.
      </h3>
      <div class="w-2/3 flex justify-center">
        <add-button />
      </div>
    </div>

    <div
      v-if="onSlashRoute"
      class="h-full w-full flex items-center justify-center flex-wrap content-center gap-6"
    >
      <h3 class="text-center dark-mode w-2/3 text-xl">
        Select a board to get started
      </h3>
    </div>

    <div v-if="displayedBoard" class="flex pr-6 mr-11">
      <div v-for="(column, index) in displayedBoard.columns" :key="column.name">
        <column-component :column-details="column" :index="index" />
      </div>
      <div><br /></div>
    </div>
    <view-tasks v-if="displayViewTasks" :displayed-board="displayedBoardName" />
  </main>
</template>

<script>
import AddButton from "@/components/shared/AddButton.vue";
import ColumnComponent from "./ColumnComponent.vue";
import ViewTasks from "../UserFunctionality/ViewTasks.vue";
import { mapState } from "vuex";

export default {
  name: "TaskComponent",
  components: { AddButton, ColumnComponent, ViewTasks },
  computed: {
    ...mapState(["darkmode", "nav", "tasks"]),
    displayedBoard() {
      let board = this.$route.params.id;
      const boardArray = this.tasks.filter((taskBoard) => {
        return taskBoard.name === board;
      });
      return boardArray[0];
    },
    onSlashRoute() {
      return this.$route.fullPath === "/" ? true : false;
    },
    displayedBoardName() {
      if (this.displayedBoard) {
        return this.displayedBoard.name;
      } else {
        return "";
      }
    },
    displayViewTasks() {
      if (this.$route.name === "task") {
        return true;
      } else {
        return "";
      }
    },
  },
};
</script>

<style scoped>
h3.dark-mode {
  @apply text-kanban-medium-grey;
}

main.dark-mode {
  @apply bg-kanban-very-dark-grey;
}

main.light-mode {
  @apply bg-kanban-light-grey;
}

main.desk-nav-closed {
  @apply sm:ml-0;
}
</style>
