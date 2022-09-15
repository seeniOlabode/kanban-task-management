<template>
  <modal :display-value="true">
    <div></div>
  </modal>
</template>

<script>
import Modal from "../shared/ModalComponent.vue";
import { mapState } from "vuex";

export default {
  name: "AddBoard",
  components: {
    Modal,
  },
  computed: {
    ...mapState,
  },
};
</script>
