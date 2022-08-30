<template>
  <div class="w-80 mr-6">
    <div class="flex flex-nowrap items-center mb-6">
      <div :class="['w-4', 'aspect-square', 'rounded-full', columnColor]"></div>
      <h4 :class="['ml-3', { 'dark-mode': darkmode, 'light-mode': !darkmode }]">
        {{ columnDetails.name }} ( {{ columnDetails.tasks.length }} )
      </h4>
    </div>

    <task-group
      :tasks-details-array="columnDetails.tasks"
      :column-name="columnDetails.name"
    />
  </div>
</template>

<script>
import TaskGroup from "./TaskGroup.vue";
import { mapState } from "vuex";

export default {
  name: "ColumnComponent",
  components: {
    TaskGroup,
  },
  props: {
    columnDetails: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },

  computed: {
    ...mapState(["darkmode"]),
    columnColor() {
      let columnColorClass;
      switch (this.index) {
        case 0:
          columnColorClass = { done: true };
          break;
        case 1:
          columnColorClass = { doing: true };
          break;
        case 2:
          columnColorClass = { todo: true };
          break;
      }

      return columnColorClass;
    },
  },
};
</script>

<style>
h4.dark-mode {
  @apply text-kanban-medium-grey;
}

h4.light-mode {
  @apply text-kanban-medium-grey;
}

.done {
  @apply bg-green-500;
}

.todo {
  @apply bg-cyan-500;
}

.doing {
  @apply bg-yellow-500;
}
</style>
