<template>
  <modal :display-value="displayValue" @close-modal="closeEditBoard()">
    <div>
      <h3 class="font-bold text-lg dark:text-kanban-white text-kanban-black">
        Edit Board
      </h3>
      <div class="mt-6 dark:text-kanban-white">
        <input-component
          v-model="localVersion.name"
          :false-value="false"
          label="Title"
          placeholder="e.g. Take Coffee Break"
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
          :disabled="!nameChanged"
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
import ActionButton from "../shared/ActionButton.vue";

export default {
  name: "EditBoard",
  components: {
    Modal,
    InputComponent,
    ActionButton,
    Loader,
  },
  data() {
    return {
      editLoading: false,
      localVersion: {},
      savedVersion: "",
    };
  },
  computed: {
    ...mapState({
      displayValue: (state) => state.TasksModule.functionality.editBoard,
      displayedBoard: (state) => state.TasksModule.displayedBoard,
    }),
    nameChanged() {
      let output = false;
      if (
        !(this.savedVersion == this.localVersion.name) &&
        !(this.localVersion.name == "") &&
        !(this.localVersion.name == " ")
      ) {
        output = true;
      }
      return output;
    },
  },
  beforeMount() {
    this.localVersion.name = this.displayedBoard.name;
    this.savedVersion = this.displayedBoard.name;
  },
  methods: {
    closeEditTask() {
      this.$store.dispatch("TasksModule/turnFunctionalityOff", "editTask");
      this.editLoading = false;
    },
    async saveChanges() {
      this.editLoading = true;
      await this.$store.dispatch("TasksModule/updateBoard", this.localVersion);
      this.editLoading = false;
      this.$store.dispatch("TasksModule/turnFunctionalityOff");
    },
  },
};
</script>

<style>
/* .spinner {
  border-color: #635fc7 #0000;
} */

button[disabled] {
  opacity: 0.85;
}
</style>
