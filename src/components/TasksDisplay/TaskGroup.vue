<template>
  <ul class="">
    <task-vue
      v-for="(task, index) in tasksDetailsArray"
      :key="task.title"
      :single-task-details="task"
      :index="index"
      :column="columnName"
    />
  </ul>
</template>

<script>
import TaskVue from "./Task.vue";

export default {
  name: "TaskGroup",
  components: {
    TaskVue,
  },
  props: {
    tasksDetailsArray: {
      type: Object,
      required: true,
    },
    columnName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>
