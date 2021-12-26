<template>
  <movie-layout>
    <template #header-bar>
      <p>Movie Header Bar Content</p>
    </template>
    <div class="container">
      <div class="grid grid-cols-12 xl:gap-14 sm:gap-8 gap-y-6 mb-14">
        <movie-card v-for="i in 12" :key="i" />
      </div>
    </div>
  </movie-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MovieLayout from "~/layouts/MovieLayout.vue";
import MovieCard from '@/MovieCard.vue';

export default defineComponent({
  components: {
    MovieLayout,
    MovieCard
}
})
</script>

<style lang="postcss" scoped>
</style>