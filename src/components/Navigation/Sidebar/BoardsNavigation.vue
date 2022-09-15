<template>
  <div class="sm:basis-full">
    <h3
      class="uppercase mb-5 text-kanban-medium-grey font-extrabold ml-6 text-sm"
    >
      All Boards ( {{ tasks.length }} )
    </h3>
    <ul>
      <button
        v-for="board in boards"
        :key="board.id"
        class="nav-button"
        @click="handleNavClick(board.id)"
      >
        <li
          :class="[
            'flex',
            'pl-6',
            'py-4',
            'items-center',
            'box-board',
            'font-extrabold',
            'mr-6',
            'text-kanban-medium-grey',
            'rounded-r-full',
            { active: board.id === displayedBoardId },
            { 'dark-mode': darkmode, 'light-mode': !darkmode },
          ]"
        >
          <img
            :class="{ hidden: board.name === displayedBoardId ? true : false }"
            src="@/assets/icon-board.svg"
            alt=""
          />
          <img
            :class="{ hidden: board.name === displayedBoardId ? false : true }"
            src="@/assets/icon-board-white.svg"
            alt=""
          />
          <span class="ml-3">{{ board.name }}</span>
        </li>
      </button>
      <button
        class="flex pl-6 py-4 items-center mr-6 add-task pr-6"
        disabled
        @click="ADD_BOARD()"
      >
        <img src="@/assets/purple-board.svg" alt="" />
        <span class="ml-3 text-kanban-main-purple font-extrabold"
          >Create New Board</span
        >
      </button>
    </ul>
  </div>
</template>

<script>
import { ADD_BOARD, CLOSE_MOBILE_NAV } from "@/store";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "BoardsNavigation",
  computed: {
    // ...mapState(["tasks", "darkmode"]),
    ...mapState({
      tasks: (state) => state.TasksModule.boards,
      darkmode: (state) => state.darkmode,
      displayedBoardId: (state) => state.TasksModule.displayedBoard.id,
    }),

    boards() {
      return this.tasks;
    },
  },
  methods: {
    ...mapMutations([CLOSE_MOBILE_NAV]),
    ...mapActions([ADD_BOARD]),
    handleNavClick(input) {
      this.$store.commit("TasksModule/setDisplayedBoard", input);
      this.CLOSE_MOBILE_NAV();
    },
  },
};
</script>

<style scoped>
.box-board.active {
  @apply bg-kanban-main-purple text-kanban-white;
}

.dark-mode:not(.active) {
  @apply hover:bg-kanban-white hover:text-kanban-main-purple;
}

.light-mode:not(.active) {
  @apply hover:bg-opacity-10 hover:bg-kanban-main-purple hover:text-kanban-main-purple;
}

.nav-button {
  width: 100%;
}
</style>
