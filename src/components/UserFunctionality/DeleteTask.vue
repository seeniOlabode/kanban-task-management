<template>
  <modal :display-value="displayValue" @close-modal="closeDeleteTask()">
    <div>
      <h3 class="text-kanban-red font-bold text-lg">Delete this task?</h3>
      <p class="mt-6 text-kanban-medium-grey">
        Are you sure you want to delete the '{{ displayedTask.title }}' task and
        its subtasks? This action cannot be reversed.
      </p>

      <div
        v-if="deleteLoading"
        class="bg-kanban-red w-full py-2 rounded-3xl flex justify-center mt-6"
      >
        <loader />
      </div>

      <div v-else class="flex flex-wrap gap-4 mt-6 sm:flex-nowrap">
        <action-button :danger-button="true" @click="deleteTask()"
          >Delete</action-button
        >
        <action-button
          class="bg-kanban-white text-kanban-main-purple"
          :danger-button="false"
          @click="closeDeleteTask()"
          >Cancel</action-button
        >
      </div>
    </div>
  </modal>
</template>

<script>
import Modal from "@/components/shared/ModalComponent.vue";
import { mapState } from "vuex";
import ActionButton from "../shared/ActionButton.vue";
import Loader from "@/components/shared/LoaderComponent.vue";

export default {
  name: "DeleteTask",
  components: { Modal, ActionButton, Loader },
  data() {
    return {
      deleteLoading: false,
    };
  },
  computed: {
    ...mapState({
      displayValue: (state) => state.TasksModule.functionality.deleteTask,
      displayedTask: (state) => state.TasksModule.displayedTask,
    }),
  },
  methods: {
    closeDeleteTask() {
      this.$store.dispatch("TasksModule/turnFunctionalityOff", "deleteTask");
      this.deleteLoading = false;
    },
    async deleteTask() {
      this.deleteLoading = true;
      await this.$store.dispatch("TasksModule/deleteTask");
      this.closeDeleteTask();
    },
  },
};
</script>

<style>
/* .spinner {
  border-color: #635fc7 #0000;
} */
</style>
