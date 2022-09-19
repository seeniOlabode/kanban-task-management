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
        { 'cursor-pointer': !disabledValue },
        { focus: optionsOpen },
      ]"
      @click="toggleOptions()"
    >
      <div class="font-medium text-sm dark:text-kanban-white text-kanban-black">
        {{ selectedOption }}
      </div>
      <button :disabled="disabledValue">
        <img src="@/assets/icon-chevron-down.svg" alt="" />
      </button>
    </div>

    <div v-show="optionsOpen" class="select-options absolute left-0 right-0">
      <ul>
        <li
          v-for="option in options"
          :key="option"
          class="cursor-pointer text-sm dark:text-kanban-white mt-2 text-kanban-medium-grey"
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
    disabledValue: {
      type: Boolean,
      required: false,
    },
    initialValue: {
      default: "Todo",
      type: String,
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
  mounted() {
    this.selectedOption = this.initialValue;
    let option = this.selectedOption;
    this.$emit("selected", option);
  },
  methods: {
    select(option) {
      this.selectedOption = option;
      this.closeOptions();
      this.$emit("selected", option);
    },
    openOptions() {
      if (!this.disabledValue) {
        this.optionsOpen = true;
      } else {
        return "";
      }
    },
    closeOptions() {
      if (!this.disabledValue) {
        this.optionsOpen = false;
      } else {
        return "";
      }
    },
    toggleOptions() {
      if (!this.disabledValue) {
        this.optionsOpen = this.optionsOpen ? false : true;
      } else {
        return "";
      }
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
  @apply dark:bg-kanban-very-dark-grey bg-kanban-white text-kanban-medium-grey mt-2 rounded-lg p-4;
}

.focus {
  @apply border-kanban-main-purple;
}
</style>
