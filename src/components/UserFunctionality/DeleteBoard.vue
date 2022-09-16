<template>
  <modal :display-value="displayValue" @close-modal="closeDeleteBoard">
    <div>
      <h3 class="text-kanban-red font-bold text-lg">Delete this board?</h3>
      <p class="mt-6 text-kanban-medium-grey">
        Are you sure you want to delete the ‘{{ displayedBoard.name }}’ board?
        This action will remove all columns and tasks and cannot be reversed.
      </p>

      <div
        v-if="deleteLoading"
        class="bg-kanban-red w-full py-2 rounded-3xl flex justify-center mt-6"
      >
        <loader />
      </div>

      <div v-else class="flex flex-wrap gap-4 mt-6 sm:flex-nowrap">
        <action-button :danger-button="true" @click="deleteBoard()"
          >Delete</action-button
        >
        <action-button
          class="bg-kanban-white text-kanban-main-purple"
          :danger-button="false"
          @click="closeDeleteBoard()"
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
  name: "DeleteBoard",
  components: { Modal, ActionButton, Loader },
  data() {
    return {
      deleteLoading: false,
    };
  },
  computed: {
    ...mapState({
      displayValue: (state) => state.TasksModule.functionality.deleteBoard,
      displayedBoard: (state) => state.TasksModule.displayedBoard,
    }),
  },
  methods: {
    closeDeleteBoard() {
      this.$store.dispatch("TasksModule/turnFunctionalityOff", "deleteBoard");
      this.deleteLoading = false;
    },
    async deleteBoard() {
      this.deleteLoading = true;
      await this.$store.dispatch("TasksModule/deleteBoard");
      this.closeDeleteBoard();
    },
  },
};
</script>

<style>
/* .spinner {
  border-color: #635fc7 #0000;
} */
</style>
