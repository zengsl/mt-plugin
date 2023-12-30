<script setup lang="ts">
defineProps({
  file: {
    type: String,
    required: true,
  },
  demo: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="mt-example-showcase">
      <component :is="demo" v-if="demo" v-bind="$attrs" />
  </div>
</template>

<style lang="scss" >
.mt-example-showcase {
  padding: 1.5rem;
  margin: 0.5px;
  background-color: var(--bg-color);
}
</style>
