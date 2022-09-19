<template>
  <div>
    <div class="flex justify-between cursor-pointer" @click="toggleAccordion()">
      <h4 class="text-kanban-white text-base font-bold">{{ label }}</h4>
      <button>
        <img
          :class="['chevron', { '-rotate-90': !accordionOpen }]"
          src="@/assets/icon-chevron-down.svg"
          alt=""
        />
      </button>
    </div>

    <div v-show="accordionOpen">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccordionComponent",
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      accordionOpen: false,
    };
  },
  methods: {
    toggleAccordion() {
      this.accordionOpen = this.accordionOpen ? false : true;
    },
  },
};
</script>

<style scoped>
.chevron {
  transition: all 0.5s;
}
</style>
