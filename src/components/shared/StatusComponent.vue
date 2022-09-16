<template>
  <div class="relative whole-container">
    <label
      class="text-sm font-bold text-kanban-medium-grey dark:text-kanban-white"
      >{{ label }}</label
    >
    <div
      :class="[
        'mt-2',
        'select-container',
        'flex',
        'items-center',
        'w-full',
        'justify-between',
        'px-4',
        'py-2',
        'border',
        'dark:border-kanban-lines-dark',
        'cursor-pointer',
        { focus: optionsOpen },
      ]"
      @click="toggleOptions()"
    >
      <div class="font-medium text-sm">{{ selectedOption }}</div>
      <button :disabled="disabled" @click="toggleOptions()">
        <img src="@/assets/icon-chevron-down.svg" alt="" />
      </button>
    </div>

    <div v-show="optionsOpen" class="select-options absolute left-0 right-0">
      <ul>
        <li
          v-for="option in options"
          :key="option"
          class="cursor-pointer text-sm dark:text-kanban-medium-grey mt-2"
          @click="select(option)"
        >
          {{ option }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "StatusSelect",
  props: {
    label: {
      default: "Status",
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
  },
  emits: ["selected"],
  data() {
    return {
      options: ["Todo", "Doing", "Done"],
      selectedOption: "Todo",
      optionsOpen: false,
    };
  },
  computed: {
    // unselectedOptions() {
    //   let unselected = this.options.filter(
    //     (option) => option != this.selectedOption
    //   );
    //   return unselected;
    // },
  },
  methods: {
    select(option) {
      this.selectedOption = option;
      this.closeOptions();
      this.$emit("selected", option);
    },
    openOptions() {
      this.optionsOpen = true;
    },
    closeOptions() {
      this.optionsOpen = false;
    },
    toggleOptions() {
      this.optionsOpen = this.optionsOpen ? false : true;
    },
  },
};
</script>

<style scoped>
.select-container {
  border-radius: 4px;
}

.whole-contatiner:focus-within .select-container {
  @apply border-kanban-main-purple;
}

.select-options {
  @apply bg-kanban-very-dark-grey mt-2 rounded-lg p-4;
}

.focus {
  @apply border-kanban-main-purple;
}
</style>
