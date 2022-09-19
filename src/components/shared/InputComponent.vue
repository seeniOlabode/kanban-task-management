<template>
  <div class="flex flex-wrap">
    <label
      class="text-sm font-bold text-kanban-medium-grey dark:text-kanban-white"
      >{{ label }}</label
    >
    <div
      :class="[
        'w-full',
        'mt-2',
        'rounded',
        'input-container',
        { error: falseValue },
      ]"
    >
      <textarea
        v-if="type === 'textArea'"
        class="text-area w-full h-28"
        :value="modelValue"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', $event.target.value)"
      ></textarea>
      <input
        v-else
        :value="modelValue"
        :class="['input-element', 'w-full', 'py-2', 'px-4', 'rounded']"
        type="text"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <span v-show="falseValue" class="absolute right-4 top-2 text-kanban-red"
        >Invalid Value</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "InputComponent",
  props: {
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    falseValue: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: "input",
    },
  },
  emits: ["update:modelValue"],
  computed: {
    // falseValue() {
    //   let output = false;
    //   switch (this.modelValue) {
    //     case "":
    //       output = true;
    //       break;
    //     default:
    //       break;
    //   }
    //   return output;
    // },
  },
  methods: {},
};
</script>

<style scoped>
.input-container {
  @apply dark:border-kanban-lines-dark border-kanban-lines-light border flex relative;
}

.input-element {
  background: none;
  @apply text-sm;
}

.input-element:focus {
  outline: none;
}

.error {
  @apply border-kanban-red !important;
}

.text-area {
  background: none;
  resize: none;
  @apply px-4 py-2;
  @apply text-sm;
}

.text-area:focus {
  outline: none;
}
</style>
