<template>
  <div
    class="w-full rounded bg-kanban-very-dark-grey p-3 flex items-center select-holder cursor-pointer"
  >
    <div class="checkbox-container">
      <label :for="checkId" class="switch flex items-center justify-center">
        <input
          :id="checkId"
          type="checkbox"
          @change="($event) => emitValue($event)"
        />
        <span class="box">
          <img src="@/assets/icon-check.svg" alt="" />
        </span>
      </label>
    </div>
    <label
      :class="[
        'font-bold',
        'labelText',
        'ml-4',
        'text-kanban-white',
        'cursor-pointer',
        { checkedLabel: localValue },
      ]"
      :for="checkId"
      >{{ labelText }}
    </label>
  </div>
</template>

<script>
export default {
  name: "CheckBox",
  // props: ["modelValue"],
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    checkId: {
      type: String,
      required: true,
    },
    labelText: {
      type: String,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  data() {
    return {
      localValue: false,
    };
  },
  methods: {
    emitValue($event) {
      this.localValue = $event.target.checked;
      this.$emit("update:modelValue", $event.target.checked);
    },
  },
};
</script>

<style scoped>
.checkbox-container {
  height: 20px;
  width: 20px;
}

.checkedLabel {
  text-decoration: line-through;
  opacity: 50%;
}

input {
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
}

.box {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  @apply hover:cursor-pointer dark:bg-kanban-dark-grey dark:border-kanban-lines-dark border;
  border-radius: 2px;
}

.box img {
  opacity: 0;
  width: 12px;
}

input:checked + .box {
  @apply bg-kanban-main-purple border-0;
}

input:checked + .box > img {
  opacity: 1;
}

.labelText {
  font-size: 13px;
}

.select-holder:hover {
  background: rgba(99, 95, 199, 0.25);
}
</style>
