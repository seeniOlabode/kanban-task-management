<template>
  <div>
    <li
      :class="[
        'px-4',
        'rounded-lg',
        'py-6',
        'w-80',
        'mb-5',
        'shadow-md',
        'hover:translate-y-1',
        'hover:cursor-pointer',
        'transition-all',
        'hover:opacity-80',
        { 'dark-mode': darkmode, 'light-mode': !darkmode },
      ]"
    >
      <h6 class="font-bold">{{ singleTaskDetails.title }}</h6>
      <p class="text-sm text-kanban-medium-grey mt-3">
        {{ completedSubtasks }}
      </p>
    </li>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "SingleTaskComponent",
  props: {
    singleTaskDetails: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    column: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState(["darkmode"]),
    completedSubtasks() {
      const subtasksArray = this.singleTaskDetails.subtasks;
      let completedTasks = subtasksArray.reduce((acc, currentSub) => {
        return (acc = currentSub.isCompleted ? acc + 1 : acc);
      }, 0);
      return `${completedTasks} of ${subtasksArray.length} Subtasks`;
    },
  },
};
</script>

<style>
li.dark-mode {
  @apply bg-kanban-dark-grey;
}

li.dark-mode > h6 {
  @apply text-kanban-white;
}

li.dark-mode > p {
  @apply text-kanban-medium-grey;
}

li.light-mode {
  @apply bg-kanban-white;
}
</style>
