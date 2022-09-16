<template>
  <button class="" @click="handleClick()">
    <img class="delete" src="@/assets/icon-delete.svg" alt="" />
    <img class="hover-del hidden" src="@/assets/icon-delete-hover.svg" alt="" />
  </button>
</template>

<script>
export default {
  name: "DelteButton",
  props: {
    index: {
      type: Number,
      required: true,
    },
  },
  emits: ["clicked"],
  methods: {
    handleClick() {
      this.$emit("clicked", this.index);
    },
  },
};
</script>

<style scoped>
button:hover > .hover-del {
  display: block;
}

button:hover > .delete {
  display: none;
}

img {
  width: 15px;
}
</style>
