<template>
  <modal
    :display-value="displayValue"
    @close-modal="closeAddBoard()"
    @keypress.enter="addBoard()"
  >
    <div class="dark:text-kanban-white">
      <h3 class="font-bold text-lg">Add New Board</h3>
      <div id="add-container" class="mt-6">
        <input-component
          v-model="model.name"
          label="Board Name"
          placeholder="e.g. Web Design"
          :false-value="falseValue"
        />
      </div>
      <div
        v-if="addBoardLoading"
        class="bg-kanban-main-purple w-full py-2 rounded-3xl flex justify-center mt-6"
      >
        <loader />
      </div>
      <action-button
        v-else
        :danger-button="false"
        class="mt-6 text-kanban-white"
        @button-clicked="addBoard()"
      >
        Create New Board
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

export default {
  name: "AddBoard",
  components: {
    Modal,
    InputComponent,
    ActionButton,
    Loader,
  },
  data() {
    return {
      model: TaskRequest.postBoard,
      addBoardLoading: false,
      falseValue: false,
    };
  },
  computed: {
    ...mapState({
      displayValue: (state) => state.TasksModule.functionality.addBoard,
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
    async addBoard() {
      this.falseValue = false;
      let modelPass = true;
      if (this.model.name == "" || this.model.name.length < 5) {
        modelPass = false;
        this.falseValue = true;
      }
      if (modelPass) {
        this.addBoardLoading = true;
        await this.$store.dispatch("TasksModule/addBoard", this.model);
        this.addBoardLoading = false;
        this.$store.dispatch("TasksModule/turnFunctionalityOff", "addBoard");
        this.model.name = "";
      }
    },
    closeAddBoard() {
      this.$store.dispatch("TasksModule/turnFunctionalityOff", "addBoard");
      this.model.name = "";
    },
  },
};
</script>
