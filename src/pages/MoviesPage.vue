<template>
  <movie-layout>
    <template #header-bar>
      <p>Movie Header Bar Content</p>
    </template>
    <div class="container">
      <div class="grid grid-cols-12 xl:gap-14 sm:gap-8 gap-y-6 mb-14">
        <template v-for="movie in movies" :key="movie.id">
          <movie-card :movie="movie" />
        </template>
      </div>
    </div>
  </movie-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MovieLayout from "~/layouts/MovieLayout.vue";
import MovieCard from '@/MovieCard.vue';
import httpService from "../services/HttpService";
import {PaginatedData} from "../models/PaginatedData";
import {Movie} from "../models/Movie";
import {Genres} from "../models/Genres";

export default defineComponent({
  components: {
    MovieLayout,
    MovieCard
  },
  data: () => ({
    movies: [] as Movie[],
    genres: [] as Genres[],
  }),
  async created() {
    try {
      await this.$store.dispatch('initialGenres');
      const { data } = await httpService.get('/discover/movie');
      const paginatedData = data as PaginatedData<Movie>;
      this.movies = paginatedData.results;
    } catch (err) {
      console.log(err);
      alert('Somethings went wrong in fetching data');
    }
  }
})
</script>

<style lang="postcss" scoped>
</style>