<template>
  <modal
    :display-value="displayValue"
    @close-modal="closeAddTask()"
    @keypress.enter="addTask()"
  >
    <div class="dark:text-kanban-white">
      <h3 class="font-bold text-lg">Add New Task</h3>
      <div id="add-container" class="mt-6">
        <input-component
          v-model="model.title"
          label="Title"
          placeholder="e.g. Web Design"
          :false-value="falseValue"
        />
        <input-component
          v-model="model.description"
          class="mt-6"
          label="Description"
          placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
          :false-value="falseValue"
          type="textArea"
        />

        <status-select @selected="(emit) => saveSelected(emit)" class="mt-6" />
      </div>

      <div
        v-if="addTaskLoading"
        class="bg-kanban-main-purple w-full py-2 rounded-3xl flex justify-center mt-6"
      >
        <loader />
      </div>
      <action-button v-else class="mt-6" @button-clicked="addTask()">
        Create New Task
      </action-button>
    </div>
  </modal>
</template>

<script>
import Modal from "../shared/ModalComponent.vue";
import { mapState } from "vuex";
import TaskRequest from "@/model/TasksRequest";
import Loader from "@/components/shared/LoaderComponent.vue";

import InputComponent from "@/components/shared/InputComponent.vue";
import ActionButton from "@/components/shared/ActionButton.vue";
import StatusSelect from "@/components/shared/StatusComponent.vue";

export default {
  name: "AddTask",
  components: {
    Modal,
    InputComponent,
    ActionButton,
    Loader,
    StatusSelect,
  },
  data() {
    return {
      model: TaskRequest.postTasks,
      addTaskLoading: false,
      falseValue: false,
    };
  },
  computed: {
    ...mapState({
      displayValue: (state) => state.TasksModule.functionality.addTask,
    }),
    // falseValue() {
    //   let output = false;
    //   if (
    //     this.timesCalled >= 1 &&
    //     (this.model.name == "" || this.model.name.length < 5)
    //   ) {
    //     output = true;
    //   }
    //   return output;
    // },
  },
  methods: {
    async addTask() {
      this.falseValue = false;
      let modelPass = true;
      if (this.model.title == "" || this.model.title.length < 5) {
        modelPass = false;
        this.falseValue = true;
      } else if (
        this.model.status != "TODO" &&
        this.model.status != "DONE" &&
        this.model.status != "DOING"
      ) {
        modelPass = false;
      }
      if (modelPass) {
        this.addTaskLoading = true;
        await this.$store.dispatch("TasksModule/addTask", this.model);
        this.addTaskLoading = false;
        this.closeAddTask();
      }
    },
    closeAddTask() {
      this.$store.dispatch("TasksModule/turnFunctionalityOff", "addTask");
      this.model.title = "";
      this.model.description = "";
    },
    saveSelected(input) {
      this.model.status = input.toLocaleUpperCase();
      console.log(input);
    },
  },
};
</script>
