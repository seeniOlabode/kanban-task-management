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
      { danger: dangerButton },
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
