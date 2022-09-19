<template>
  <div>
    <header-component-vue />
    <hero-section />
    <features />
  </div>
</template>

<script>
import HeaderComponentVue from "./HeaderComponent.vue";
import HeroSection from "./HeroSection.vue";
import Features from "./FeaturesComponent.vue";

export default {
  name: "LandingPage",
  components: {
    HeaderComponentVue,
    HeroSection,
    Features,
  },
};
</script>
