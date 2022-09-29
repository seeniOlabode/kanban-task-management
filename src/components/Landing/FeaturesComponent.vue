<template>
  <div class="px-6 py-7 font-bold text-xl lg:px-24">
    <div class="mt-8">
      <h3 class="text-kanban-white font-extrabold text-2xl">Free Tier</h3>
      <div class="mt-4 lg:hidden">
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

      <div class="hidden lg:flex w-full justify-between px-10 mt-2">
        <div class="basis:1/2 flex-grow items-center flex">
          <div class="w-full">
            <accordion-component
              class="w-full max-w-xs"
              label="Group Multiple Tasks with Board"
            />
            <accordion-component
              class="mt-5 w-full max-w-xs"
              label="Group Subtasks with Tasks"
            />
            <accordion-component
              class="mt-5 w-full max-w-xs"
              label="Mark Subtasks as done"
            />
          </div>
        </div>
        <div class="basis:1/2 flex-grow flex justify-center items-center">
          <board-demo class="w-full" />
        </div>
      </div>
    </div>

    <div class="mt-8">
      <h3 class="text-kanban-white font-extrabold text-2xl">Premium</h3>
      <div class="mt-4 lg:hidden">
        <accordion-component class="mt-5" label="Collaborate with Teams">
          <div class="mt-10 flex justify-center">
            <board-demo />
          </div>
        </accordion-component>
        <accordion-component class="mt-5" label="Assign Tasks to members">
          <div class="mt-10 flex justify-center">
            <board-demo />
          </div>
        </accordion-component>
        <accordion-component
          class="mt-5"
          label="Import your data from other apps (Notion...)"
        >
          <div class="mt-10 flex justify-center">
            <board-demo />
          </div>
        </accordion-component>
      </div>

      <div class="hidden lg:flex w-full justify-between px-10 mt-2">
        <div class="basis:1/2 flex-grow items-center flex">
          <div class="w-full">
            <accordion-component
              class="w-full max-w-xs"
              label="Collaborate with Teams"
            />
            <accordion-component
              class="mt-5 w-full max-w-xs"
              label="Assign Tasks to members"
            />
            <accordion-component
              class="mt-5 w-full max-w-xs"
              label="Import your data from other apps (Notion...)"
            />
          </div>
        </div>
        <div class="basis:1/2 flex-grow flex justify-center items-center">
          <board-demo class="w-full mr-4" />
        </div>
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
