<template>
  <modal :display-modal="modalOpen" @close-info="closeModal()">
    <div>
      <div class="flex justify-between items-center">
        <h3 :class="['text-2xl', 'font-bold', { 'dark-mode': darkmode }]">
          Hey there!!!
        </h3>
        <span class="text-3xl">👋🏽</span>
      </div>
      <div class="mt-7">
        <h3
          :class="['message', 'text-l', 'font-bold', { 'dark-mode': darkmode }]"
        >
          This app is currently view-only, there is no backend to allow you to
          edit tasks (add, delete, modify).
        </h3>
      </div>
      <button
        class="flex items-center mt-9 ml-auto bg-kanban-main-purple px-5 py-2 rounded-md dark-mode text-kanban-white font-bold"
        @click="closeModal()"
      >
        OKAY
      </button>
    </div>
  </modal>
</template>

<script>
import Modal from "@/components/shared/InfoModal.vue";
import { mapState } from "vuex";

export default {
  name: "InfoScreen",
  components: { Modal },
  data() {
    return {
      modalOpen: true,
    };
  },
  computed: {
    ...mapState(["darkmode"]),
  },
  methods: {
    closeModal() {
      this.modalOpen = false;
      this.$store.commit("setInfoScreen");
    },
  },
};
</script>

<style>
h3.dark-mode {
  @apply text-kanban-medium-grey;
}

.message {
  @apply text-kanban-medium-grey;
}
</style>
