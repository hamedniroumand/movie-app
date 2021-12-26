<template>
  <movie-layout>
    <template #header-bar>
      <p>Single Movie Header Bar Content</p>
    </template>
    <div class="container">
      <p>Single Main Content</p>
    </div>
  </movie-layout>
</template>

<script>
import { defineComponent } from 'vue';
import MovieLayout from "~/layouts/MovieLayout.vue";

export default defineComponent({
  components: {
    MovieLayout
  }
})
</script>

<style lang="postcss" scoped>
</style>