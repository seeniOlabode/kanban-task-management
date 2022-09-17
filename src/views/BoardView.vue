<template>
  <tasks-display />
</template>

<script>
// @ is an alias to /src
import TasksDisplay from "@/components/TasksDisplay/TasksDisplay.vue";

export default {
  name: "HomeView",
  components: {
    TasksDisplay,
  },
  computed: {},
};
</script>
