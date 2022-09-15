<template>
  <button
    class="flex items-center bg-kanban-main-purple justify-center py-2 w-full font-bold"
    @click="$emit('buttonClicked', true)"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "ActionButton",
  emits: ["buttonClicked"],
};
</script>

<style scoped>
button {
  border-radius: 20px;
}
</style>
