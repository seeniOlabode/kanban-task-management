<template>
  <add-board-vue />
  <add-task-vue />
  <view-tasks-vue />
  <delete-board />
  <edit-task v-if="editTaskDisplay" />
</template>

<script>
import AddBoardVue from "../UserFunctionality/AddBoard.vue";
import AddTaskVue from "../UserFunctionality/AddTask.vue";
import ViewTasksVue from "../UserFunctionality/ViewTasks.vue";
import DeleteBoard from "../UserFunctionality/DeleteBoard.vue";
import EditTask from "./EditTask.vue";

import { mapState } from "vuex";

export default {
  name: "UserFunctionality",
  components: {
    AddBoardVue,
    AddTaskVue,
    ViewTasksVue,
    DeleteBoard,
    EditTask,
  },
  computed: {
    ...mapState({
      displayedTask: (state) => state.TasksModule.displayedTask,
      editTaskDisplay: (state) => state.TasksModule.functionality.editTask,
    }),
  },
};
</script>
