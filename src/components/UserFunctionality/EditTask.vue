<template>
  <modal :display-value="displayValue" @close-modal="closeEditTask()">
    <div>
      <h3 class="font-bold text-lg dark:text-kanban-white text-kanban-black">
        Edit Task
      </h3>
      <div class="mt-6 dark:text-kanban-white">
        <input-component
          v-model="localVersion.title"
          :false-value="false"
          label="Title"
          placeholder="e.g. Take Coffee Break"
        />
        <input-component
          v-model="localVersion.description"
          :false-value="false"
          label="Description"
          type="textArea"
          placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
          class="mt-6"
        />

        <subtasks-component
          class="mt-6"
          :initial-subtasks="convertedTasks"
          @subtasks="(subtasks) => updateSubtasks(subtasks)"
        />

        <status-component
          :initial-value="localVersion.status"
          class="mt-6"
          @selected="(input) => updateStatus(input)"
        />

        <div
          v-if="editLoading"
          class="bg-kanban-main-purple w-full py-2 rounded-3xl flex justify-center mt-6"
        >
          <loader />
        </div>

        <action-button
          v-else
          class="mt-6"
          :danger-button="false"
          @click="saveChanges()"
        >
          Save Changes
        </action-button>
      </div>
    </div>
  </modal>
</template>

<script>
import Modal from "@/components/shared/ModalComponent.vue";
import { mapState } from "vuex";
import Loader from "@/components/shared/LoaderComponent.vue";
import InputComponent from "../shared/InputComponent.vue";
import SubtasksComponent from "../shared/SubtasksComponent.vue";
import ActionButton from "../shared/ActionButton.vue";
import StatusComponent from "../shared/StatusComponent.vue";

import TaskRequest from "@/model/TasksRequest";

export default {
  name: "EditTasks",
  components: {
    Modal,
    InputComponent,
    SubtasksComponent,
    ActionButton,
    StatusComponent,
    Loader,
  },
  data() {
    return {
      editLoading: false,
      localVersion: {},
    };
  },
  computed: {
    ...mapState({
      displayValue: (state) => state.TasksModule.functionality.editTask,
      displayedTask: (state) => state.TasksModule.displayedTask,
    }),
    convertedTasks() {
      let subtasks = this.localVersion.subtasks;
      let convertedArray = subtasks.map((sub) => {
        return sub.title;
      });
      return convertedArray;
    },
  },
  beforeMount() {
    this.localVersion.title = this.displayedTask.title;
    this.localVersion.boardid = this.displayedTask.boardid;
    this.localVersion.description = this.displayedTask.description;
    this.localVersion.id = this.displayedTask.id;
    this.localVersion.status = this.displayedTask.status;
    this.localVersion.subtasks = this.displayedTask.subtasks;
  },
  methods: {
    closeEditTask() {
      this.$store.dispatch("TasksModule/turnFunctionalityOff", "editTask");
      this.editLoading = false;
    },
    updateStatus(input) {
      this.localVersion.status = input.toLocaleUpperCase();
    },
    updateSubtasks(input) {
      let subtasksArray = input.map((subtask) => {
        let newSubTask = TaskRequest.postSubtasks;
        newSubTask.title = subtask;
        newSubTask.boardid = this.localVersion.boardid;
        newSubTask.tasksid = this.localVersion.id;
        return newSubTask;
      });
      this.localVersion.subtasks = subtasksArray;
    },
    async saveChanges() {
      this.editLoading = true;
      let taskUpdateBody = {};
      taskUpdateBody.title = this.localVersion.title;
      taskUpdateBody.boardid = this.localVersion.boardid;
      taskUpdateBody.description = this.localVersion.description;
      taskUpdateBody.id = this.localVersion.id;
      taskUpdateBody.status = this.localVersion.status;
      await this.$store.dispatch("TasksModule/updateTask", taskUpdateBody);
      await this.$store.dispatch(
        "TasksModule/postMultipleSubs",
        this.localVersion.subtasks
      );
      this.editLoading = false;
      this.$store.dispatch("TasksModule/turnFunctionalityOff", "editTask");
    },
  },
};
</script>

<style>
/* .spinner {
  border-color: #635fc7 #0000;
} */
</style>
