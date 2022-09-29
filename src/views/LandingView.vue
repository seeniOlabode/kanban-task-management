<template>
  <landing-page />
</template>

<script>
import LandingPage from "@/components/Landing/LandingPage.vue";

export default {
  name: "LandingPageView",
  components: { LandingPage },
  created() {
    this.$store.commit("setDarkMode", {
      scheme: "dark",
      override: false,
    });
  },
  beforeUnmount() {
    this.$store.commit("setDarkMode", {
      scheme: "light",
      override: false,
    });
  },
};
</script>
