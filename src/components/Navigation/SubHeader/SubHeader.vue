<template>
  <div
    class="flex flex-nowrap justify-between w-full ml-4 sm:ml-6 items-center"
  >
    <div class="flex">
      <h1
        :class="[
          'text-lg',
          'font-extrabold',
          'sm:text-lg',
          { 'dark-mode': darkmode, 'light-mode': !darkmode },
        ]"
      >
        {{ boardHeading }}
      </h1>
      <button class="ml-2 sm:hidden" @click="OPEN_MOBILE_NAV">
        <img
          :class="['transition-all', { 'rotate-element': nav.mobileNavIsOpen }]"
          src="@/assets/icon-chevron-down.svg"
          alt=""
        />
      </button>
    </div>
    <div v-if="displayedBoardExists" class="flex items-center">
      <add-button
        :disabled="!displayedBoardExists"
        @click="$store.dispatch('TasksModule/turnFunctionalityOn', 'addTask')"
      />
      <sub-header-settings />
    </div>
  </div>
</template>

<script>
import AddButton from "@/components/shared/AddButton.vue";
import SubHeaderSettings from "./SubHeaderNavigation.vue";

import { mapMutations } from "vuex";
import { mapState } from "vuex";
import { OPEN_MOBILE_NAV } from "@/store";

export default {
  name: "SubHeader",
  components: {
    AddButton,
    SubHeaderSettings,
  },
  computed: {
    // ...mapState(["nav", "darkmode"]),
    ...mapState({
      nav: (state) => state.nav,
      darkmode: (state) => state.darkmode,
      tasks: (state) => state.TasksModule.boards,
      boardsFetched: (state) => state.TasksModule.boardsFetched,
      displayedBoardId: (state) => state.TasksModule.displayedBoardId,
      displayedBoard: (state) => state.TasksModule.displayedBoard,
    }),

    boardHeading() {
      if (this.boardsFetched && this.displayedBoard.id) {
        return this.displayedBoard.name;
      } else {
        return "Pick a Board";
      }
    },
    displayedBoardExists() {
      let output = false;
      if (!("default" in this.displayedBoard)) {
        output = true;
      }
      return output;
    },
  },
  methods: {
    ...mapMutations([OPEN_MOBILE_NAV]),
  },
};
</script>

<style scoped>
.dark-mode {
  @apply text-kanban-white;
}

.light-mode {
  @apply text-kanban-black;
}

.rotate-element {
  @apply rotate-180;
}
</style>
