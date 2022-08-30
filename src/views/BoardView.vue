<template>
  <tasks-display />
  <info-screen v-if="infoScreenDisplayed" />
</template>

<script>
// @ is an alias to /src
import TasksDisplay from "@/components/TasksDisplay/TasksDisplay.vue";
import InfoScreen from "@/components/InfoScreen.vue";
import { mapState } from "vuex";

export default {
  name: "HomeView",
  components: {
    TasksDisplay,
    InfoScreen,
  },
  computed: {
    ...mapState(["infoScreenDisplayed"]),
  },
  beforeMount() {
    this.$store.commit("setInfoScreen");
  },
};
</script>
