<template>
  <movie-layout>
    <template #header-bar>
      <p>Movie Header Bar Content</p>
    </template>
    <div class="container">
      <p>Main Content</p>
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