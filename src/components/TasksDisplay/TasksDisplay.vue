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
    <!-- <div
      v-if="displayedBoard ? displayedBoard.tasks.length <= 0 : false"
      class="h-full w-full flex items-center justify-center flex-wrap content-center gap-6"
    >
      <h3 :class="['text-center', 'w-2/3', { 'dark-mode': darkmode }]">
        This board is empty. Create a new column to get started.
      </h3>
      <div class="w-2/3 flex justify-center">
        <add-button />
      </div>
    </div> -->

    <div
      v-if="defaultDisplay"
      class="h-full w-full flex items-center justify-center flex-wrap content-center gap-6"
    >
      <h3 class="text-center dark-mode w-2/3 text-xl">
        Select a board to get started
      </h3>
    </div>

    <div v-if="displayedBoard" class="flex pr-6 mr-11">
      <column-component
        name="TODO"
        :column-details="todoTasks.list"
        :index="todoTasks.index"
      />
      <column-component
        name="DOING"
        :column-details="doingTasks.list"
        :index="doingTasks.index"
      />
      <column-component
        name="DONE"
        :column-details="doneTasks.list"
        :index="doneTasks.index"
      />
      <div><br /></div>
    </div>
    <view-tasks v-if="displayViewTasks" :displayed-board="displayedBoardName" />
    <add-board-vue />
    <add-task-vue />
    <view-tasks-vue />
  </main>
</template>

<script>
// import AddButton from "@/components/shared/AddButton.vue";
import ColumnComponent from "./ColumnComponent.vue";
import ViewTasks from "../UserFunctionality/ViewTasks.vue";
import { mapState } from "vuex";

import AddBoardVue from "../UserFunctionality/AddBoard.vue";
import AddTaskVue from "../UserFunctionality/AddTask.vue";
import ViewTasksVue from "../UserFunctionality/ViewTasks.vue";

export default {
  name: "TaskComponent",
  // components: { AddButton, ColumnComponent, ViewTasks, AddBoardVue },
  components: {
    ColumnComponent,
    ViewTasks,
    AddBoardVue,
    AddTaskVue,
    ViewTasksVue,
  },
  data() {
    return {
      defaultDisplay: false,
    };
  },
  computed: {
    // ...mapState(["darkmode", "nav", "tasks"]),
    ...mapState({
      darkmode: (state) => state.darkmode,
      nav: (state) => state.nav,
      tasks: (state) => state.TasksModule.boards,
      boardsFetched: (state) => state.TasksModule.boardsFetched,
      displayedBoardObject: (state) => state.TasksModule.displayedBoard,
    }),

    displayedBoard() {
      if (this.boardsFetched && this.displayedBoardObject.id) {
        return this.displayedBoardObject;
      } else {
        return this.defaultDisplay;
      }
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
    todoTasks() {
      if (this.boardsFetched) {
        const todoArray = {};
        todoArray.list = this.displayedBoard.tasks.filter((task) => {
          return task.status === "TODO";
        });
        todoArray.index = 0;
        return todoArray;
      }
      return {
        list: [],
        index: 0,
      };
    },
    doingTasks() {
      if (this.boardsFetched) {
        const doingArray = {};
        doingArray.list = this.displayedBoard.tasks.filter((task) => {
          return task.status === "DOING";
        });
        doingArray.index = 1;
        return doingArray;
      }
      return {
        list: [],
        index: 1,
      };
    },
    doneTasks() {
      if (this.boardsFetched) {
        const doneArray = {};
        doneArray.list = this.displayedBoard.tasks.filter((task) => {
          return task.status === "DONE";
        });
        doneArray.index = 2;
        return doneArray;
      }
      return {
        list: [],
        index: 2,
      };
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
