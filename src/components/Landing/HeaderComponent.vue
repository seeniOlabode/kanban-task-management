<template>
  <header
    class="px-6 py-7 dark:bg-kanban-dark-grey dark:border-b-kanban-lines-dark border-b flex justify-between items-center lg:px-24"
  >
    <div class="logo">
      <img class="sm:hidden" src="@/assets/logo-mobile.svg" alt="" />
      <img class="hidden sm:block" src="@/assets/logo-light.svg" alt="" />
    </div>

    <nav>
      <ul
        class="flex font-bold dark:text-kanban-white gap-6 text-sm items-center sm:text-base sm:gap-16"
      >
        <li><router-link to="/app">App</router-link></li>
        <li><router-link to="#features">Features</router-link></li>
        <li><router-link to="#documentation">Documentation</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "LandingHeader",
  computed: {
    headerLogo() {
      let output;

      return output;
    },
  },
};
</script>
