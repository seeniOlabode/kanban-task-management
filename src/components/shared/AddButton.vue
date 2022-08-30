<template>
  <button
    class="flex items-center bg-kanban-main-purple px-5 py-2 rounded-2xl sm:rounded-3xl dark-mode"
  >
    <img
      class="relative sm:hidden"
      width="12"
      src="@/assets/icon-add-task-mobile.svg"
      alt=""
    />
    <span class="ml-1 hidden sm:inline">Add New Task</span>
  </button>
</template>

<script>
export default {
  name: "AddButton",
};
</script>

<style scoped>
button.dark-mode {
  @apply text-kanban-white hover:bg-kanban-main-purple-hover;
}

@media screen and (max-width: 790px) {
  img {
    display: inline;
  }
  span {
    display: none;
  }
}
</style>
