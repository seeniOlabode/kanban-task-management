<template>
  <modal :display-value="displayValue" @close-modal="closeView()">
    <div>
      <div class="flex justify-between items-center">
        <h3 class="dark:text-kanban-white font-bold text-lg">
          {{ displayedTask.title }}
        </h3>

        <settings />
      </div>

      <p class="dark:text-kanban-medium-grey mt-6">
        {{ displayedTask.description }}
      </p>

      <div class="mt-6">
        <h6 class="dark:text-kanban-white font-bold text-sm">
          Subtasks ({{ completedTasksString }})
        </h6>

        <div v-if="loadSubs" class="mt-4">
          <check-box-vue
            v-for="sub in subtasks"
            :key="sub.id"
            :check-id="'check' + sub.id"
            :label-text="sub.title"
            :model-value="checkValue"
          />
        </div>
        <div class="text-kanban-white mt-6">
          <status-select :disabled-value="true" label="Current Status" />
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import Modal from "@/components/shared/ModalComponent.vue";
import { mapState } from "vuex";
import StatusSelect from "../shared/StatusComponent.vue";

import CheckBoxVue from "../shared/CheckBox.vue";
import Settings from "@/components/shared/ViewTasksSettings.vue";

export default {
  name: "ViewTasks",
  components: { Modal, CheckBoxVue, StatusSelect, Settings },
  data() {
    return {
      checkValue: true,
    };
  },
  computed: {
    ...mapState({
      displayValue: (state) => state.TasksModule.functionality.viewTask,
      displayedTask: (state) => state.TasksModule.displayedTask,
    }),
    completedTasksString() {
      let subtasksArray = this.displayedTask.subtasks;
      let completedTasks = subtasksArray.reduce((acc, currentSub) => {
        return (acc = currentSub.isCompleted ? acc + 1 : acc);
      }, 0);
      return `${completedTasks} of ${subtasksArray.length}`;
    },
    loadSubs() {
      let output = false;
      if (this.subtasks.length >= 1) {
        output = true;
      }
      return output;
    },
    subtasks() {
      let output = [];
      if (!this.displayedTask.default) {
        output = this.displayedTask.subtasks;
      }
      return output;
    },
  },
  methods: {
    closeView() {
      this.$store.dispatch("TasksModule/turnFunctionalityOff", "viewTask");
    },
  },
};
</script>
