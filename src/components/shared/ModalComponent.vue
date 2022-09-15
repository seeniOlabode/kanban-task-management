<template>
  <div
    class="absolute modal-container top-0 left-0 flex items-center justify-center bg-kanban-black bg-opacity-50 w-screen h-screen px-5 z-50"
    @click="handleClick($event)"
  >
    <div
      :class="[
        'content',
        'w-full',
        'max-w-md',
        'md:max-w-md',
        'rounded-lg',
        'p-8',
        { 'dark-mode': darkmode, 'light-mode': !darkmode },
      ]"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ModalComponent",
  props: {
    displayValue: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["CloseModal"],
  computed: {
    ...mapState(["darkmode"]),
  },
  beforeUnmount() {
    this.$router.push(`/boards/${this.displayedBoard}`);
  },
  methods: {
    handleClick($event) {
      if ($event.target.className.includes("modal-container")) {
        this.$emit("CloseModal", false);
      }
    },
  },
};
</script>

<style scoped>
.content.dark-mode {
  @apply bg-kanban-dark-grey;
}

.content.light-mode {
  @apply bg-kanban-white;
}
</style>
