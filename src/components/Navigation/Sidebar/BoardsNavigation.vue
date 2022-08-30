<template>
  <div class="sm:basis-full">
    <h3
      class="uppercase mb-5 text-kanban-medium-grey font-extrabold ml-6 text-sm"
    >
      All Boards ( {{ tasks.length }} )
    </h3>
    <ul>
      <router-link
        v-for="board in boards"
        :key="board.name"
        :to="{ path: `/boards/${board.name}` }"
        @click="CLOSE_MOBILE_NAV()"
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
            { active: board.name === activeBoard },
            { 'dark-mode': darkmode, 'light-mode': !darkmode },
          ]"
        >
          <img src="@/assets/icon-board.svg" alt="" />
          <span class="ml-3">{{ board.name }}</span>
        </li>
      </router-link>
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
    ...mapState(["tasks", "darkmode"]),
    boards() {
      return this.tasks;
    },
    activeBoard() {
      return this.$route.params.id;
    },
  },
  methods: {
    ...mapMutations([CLOSE_MOBILE_NAV]),
    ...mapActions([ADD_BOARD]),
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
</style>
