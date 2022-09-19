<template>
  <button
    :class="[
      'flex',
      'items-center',
      'bg-kanban-main-purple',
      'justify-center',
      'py-2',
      'w-full',
      'font-bold',
      'text-sm',
      { danger: dangerButton },
      'dark:text-kanban-white',
      'text-kanban-white',
    ]"
    @click="$emit('buttonClicked', true)"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "ActionButton",
  props: {
    dangerButton: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["buttonClicked"],
  computed: {},
};
</script>

<style scoped>
button {
  border-radius: 20px;
}

.danger {
  @apply bg-kanban-red text-kanban-white;
}
</style>
