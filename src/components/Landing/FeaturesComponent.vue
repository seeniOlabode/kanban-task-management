<template>
  <div class="px-6 py-7 font-bold text-xl">
    <div class="mt-8">
      <h3 class="text-kanban-white font-extrabold text-2xl">Free Tier</h3>
      <div class="mt-8">
        <accordion-component label="Group Multiple Tasks with Board">
          <div class="mt-10 flex justify-center">
            <board-demo />
          </div>
        </accordion-component>
        <accordion-component class="mt-5" label="Group Subtasks with Tasks">
          <div class="mt-10 flex justify-center">
            <board-demo />
          </div>
        </accordion-component>
        <accordion-component class="mt-5" label="Mark Subtasks as done">
          <div class="mt-10 flex justify-center">
            <board-demo />
          </div>
        </accordion-component>
      </div>
    </div>
  </div>
</template>

<script>
import AccordionComponent from "../shared/AccordionComponent.vue";
import BoardDemo from "./components/BoardDemo.vue";

export default {
  name: "FeaturesComponent",
  components: {
    AccordionComponent,
    BoardDemo,
  },
};
</script>
