<template>
  <modal-component :displayed-board="displayedBoard">
    <slot>
      <div class="flex items-center gap-6 justify-between">
        <h2
          :class="[
            'text-lg',
            'basis-4/5',
            'font-extrabold',
            { 'dark-mode': darkmode, 'light-mode': !darkmode },
          ]"
        >
          {{ displayedTask.title }}
        </h2>
        <button class="basis-auto">
          <img
            class="w-full"
            src="@/assets/icon-vertical-ellipsis.svg"
            alt=""
            height="20"
          />
        </button>
      </div>

      <p class="text-kanban-medium-grey mt-4 text-sm">
        {{ displayedTask.description }}
      </p>

      <h3
        :class="[
          'mb-4',
          'mt-6',
          'text-sm',
          'font-extrabold',
          { 'dark-mode': darkmode, 'light-mode': !darkmode },
        ]"
      >
        Subtask ({{ completedSubtasks }})
      </h3>

      <ul :class="displayMode">
        <li
          v-for="(subtask, index) in displayedTask.subtasks"
          :key="subtask.title"
        >
          <input
            :id="`subtask-${displayedTask.status}-${index}`"
            type="checkbox"
          />
          <label :for="`subtask-${displayedTask.status}-${index}`">
            {{ subtask.title }}</label
          >
        </li>
      </ul>
    </slot>
  </modal-component>
</template>

<script>
import ModalComponent from "../shared/ModalComponent.vue";
import { mapState } from "vuex";

export default {
  name: "ViewTasks",
  components: { ModalComponent },
  props: {
    displayedBoard: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState(["darkmode", "tasks"]),
    displayMode() {
      return {
        "dark-mode": this.darkmode,
        "light-mode": !this.darkmode,
      };
    },
    displayedTask() {
      let task;
      if (this.tasks.length >= 1) {
        const BoardObject = this.tasks.filter((board) => {
          return board.name === this.displayedBoard;
        });
        const columnObject = BoardObject[0].columns.filter((column) => {
          return column.name === this.$route.query.column;
        });
        task = columnObject[0].tasks[this.$route.query.taskId];
      }

      return task;
    },

    completedSubtasks() {
      let numberofCompleted;
      if (this.tasks.length >= 1) {
        numberofCompleted = this.displayedTask.subtasks.reduce(
          (acc, subtask) => {
            return (acc = subtask.isCompleted ? acc + 1 : acc);
          },
          0
        );
      }
      return `${numberofCompleted} of ${this.displayedTask.subtasks.length}`;
    },
  },
};
</script>

<style scoped>
h2.dark-mode,
h3.dark-mode {
  @apply text-kanban-white;
}

h3.light-mode {
  @apply text-kanban-medium-grey;
}

ul {
  @apply flex flex-wrap;
}

ul > li {
  @apply w-full flex mb-2  p-3 rounded;
}

ul.dark-mode > li {
  @apply bg-kanban-very-dark-grey;
}

ul.light-mode > li {
  @apply bg-kanban-light-grey;
}

ul > li > label {
  @apply ml-4 text-xs font-extrabold;
}

ul.dark-mode > li > label {
  @apply text-kanban-white;
}

ul.light-mode > li > label {
  @apply text-kanban-black;
}

ul > li > input[type="checkbox"] {
  background-image: url("@/assets/icon-add-task-mobile.svg");
  width: 16px;
}

ul > li > input[type="checkbox"]:checked + label {
  text-decoration: line-through;
  text-decoration-thickness: 2px;
}

ul.dark-mode > li > input[type="checkbox"]:checked + label {
  @apply opacity-50;
}

ul.light-mode > li > input[type="checkbox"]:checked + label {
  @apply opacity-50;
}
</style>
