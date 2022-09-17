<template>
  <div :class="['spinner', { purple: purple }]"></div>
</template>

<script>
export default {
  name: "LoaderComponent",
  props: {
    purple: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
};
</script>

<style>
.spinner {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 4px solid;
  border-color: white #0000;
  animation: spinner-0tkp9a 1s infinite;
}

.purple {
  border-color: #635fc7 #0000;
}

@keyframes spinner-0tkp9a {
  to {
    transform: rotate(0.5turn);
  }
}
</style>
