<template>
  <div>
    <label
      class="font-bold dark:text-kanban-white text-kanban-medium-grey text-sm mb-2 inline-block"
      >Subtasks</label
    >
    <div
      v-for="(subtask, index) in subtasks"
      id="input-container"
      :key="index"
      :class="['w-full', 'mb-3', 'rounded', 'flex', 'items-center']"
    >
      <input
        :value="subtasks[index]"
        :class="[
          'input-element',
          'w-full',
          'py-2',
          'px-4',
          'rounded',
          'text-sm',
        ]"
        type="text"
        placeholder="e.g. Make Coffee"
        @input="(e) => updateSub(e, index)"
      />
      <delete-button-vue
        class="ml-4"
        :index="index"
        @clicked="(pos) => deleteSub(pos)"
      />
      <span v-show="false" class="absolute right-4 top-2 text-kanban-red"
        >Invalid Value</span
      >
    </div>
    <action-button-vue :danger-button="false" class="mt-3" @click="addSub()">
      Add New SubTask
    </action-button-vue>
  </div>
</template>

<script>
import DeleteButtonVue from "./DeleteButton.vue";
import ActionButtonVue from "./ActionButton.vue";

export default {
  name: "SubtasksInput",
  components: { DeleteButtonVue, ActionButtonVue },
  props: {
    initialSubtasks: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  emits: ["subtasks"],
  data() {
    return {
      subtasks: [],
      deleted: [],
    };
  },
  computed: {},
  mounted() {
    this.subtasks = this.initialSubtasks;
    // this.subtasks.forEach((sub) => {
    //   sub.fixed = true;
    // });
  },
  methods: {
    deleteSub(pos) {
      this.deleted.push(this.subtasks.splice(pos, 1)[0]);
      this.emitValue();
    },
    updateSub(e, pos) {
      this.subtasks[pos] = e.target.value;
      this.emitValue();
    },
    addSub() {
      this.subtasks.push("");
      this.emitValue();
    },
    emitValue() {
      this.$emit("subtasks", this.subtasks, this.deleted);
      // console.log(this.deleted);
    },
  },
};
</script>

<style scoped>
.input-element {
  background: none;
  @apply border dark:border-kanban-lines-dark border-kanban-lines-light;
}

.input-element:focus {
  outline: none;
}
</style>
