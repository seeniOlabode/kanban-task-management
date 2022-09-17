<template>
  <add-board-vue />
  <add-task-vue />
  <view-tasks-vue />
  <delete-board />
  <edit-task v-if="editTaskDisplay" />
  <delete-task />
  <edit-board v-if="editBoardDisplay" />
</template>

<script>
import AddBoardVue from "../UserFunctionality/AddBoard.vue";
import AddTaskVue from "../UserFunctionality/AddTask.vue";
import ViewTasksVue from "../UserFunctionality/ViewTasks.vue";
import DeleteBoard from "../UserFunctionality/DeleteBoard.vue";
import EditTask from "./EditTask.vue";
import DeleteTask from "./DeleteTask.vue";
import EditBoard from "./EditBoard.vue";

import { mapState } from "vuex";

export default {
  name: "UserFunctionality",
  components: {
    AddBoardVue,
    AddTaskVue,
    ViewTasksVue,
    DeleteBoard,
    EditTask,
    DeleteTask,
    EditBoard,
  },
  computed: {
    ...mapState({
      displayedTask: (state) => state.TasksModule.displayedTask,
      editTaskDisplay: (state) => state.TasksModule.functionality.editTask,
      editBoardDisplay: (state) => state.TasksModule.functionality.editBoard,
    }),
  },
};
</script>
