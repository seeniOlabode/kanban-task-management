<template>
  <div class="px-6 py-14 lg:px-24 lg:py-28 lg:flex">
    <div class="relative z-10 lg:basis-1/2">
      <div
        class="absolute bg-kanban-main-purple w-40 h-14 -top-5 -left-3 lg:w-80 lg:h-32 lg:-top-7 lg:-left-10"
      ></div>
      <div class="relative z-30">
        <h1 class="dark:text-kanban-white font-extrabold text-5xl lg:text-8xl">
          Focus on the things that really matter
        </h1>

        <p class="font-bold text-kanban-main-purple mt-4 text-lg lg:text-2xl">
          Let's help you keep track of everything
        </p>
      </div>

      <action-button-vue
        class="w-36 mt-4 goto-button start-button"
        :danger-button="false"
        @click="gotoApp()"
      >
        Start Now.
      </action-button-vue>
    </div>

    <div class="mt-14 lg:basis-1/2">
      <div
        class="bg-kanban-dark-grey w-full px-4 py-6 rounded-xl task-box mx-auto lg:w-80 lg:ml-72"
      >
        <h3 class="font-bold dark:text-kanban-white">Feed the cat</h3>
        <p class="text-kanban-medium-grey font-bold mt-2">2 of 5 subtasks</p>
      </div>

      <div
        class="bg-kanban-dark-grey w-11/12 px-4 py-6 rounded-xl task-box mx-auto mt-5 lg:w-80 lg:mr-72"
      >
        <h3 class="font-bold dark:text-kanban-white">Product Ideation</h3>
        <p class="text-kanban-medium-grey font-bold mt-2">0 of 1 subtasks</p>
      </div>

      <div
        class="bg-kanban-dark-grey w-4/5 px-4 py-6 rounded-xl task-box mx-auto mt-5 lg:w-80 lg:ml-50"
      >
        <h3 class="font-bold dark:text-kanban-white">Check up on Michael</h3>
        <p class="text-kanban-medium-grey font-bold mt-2">1 of 1 subtasks</p>
      </div>
    </div>
  </div>
</template>

<script>
import ActionButtonVue from "../shared/ActionButton.vue";

export default {
  name: "HeroSection",
  components: { ActionButtonVue },
  methods: {
    gotoApp() {
      this.$router.push("/app");
    },
  },
};
</script>

<style scoped>
.style-box {
  box-shadow: 0px 4.514619827270508px 6.771929740905762px 0px
    rgba(54, 78, 126, 0.1);
}

button.goto-button {
  @apply w-36;
  width: 114px;
}

@media (min-width: 1024px) {
  .start-button {
    width: 255px !important;
    padding: 15px 0;
    margin-top: 30px;
  }
}
</style>
