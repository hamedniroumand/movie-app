<template>
  <movie-layout v-if="movie">
    <template #header-bar>
      <div class="flex items-center">
        <router-link class="bg-blue-400 hover:bg-blue-500 rounded-full w-[5.7rem] h-8 text-white flex justify-center items-center" to="/">
          <svg class="mr-1" width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 5.33331L2.60929 5.33331L6.18529 1.75731C6.44562 1.49698 6.44562 1.07481 6.18546 0.814648C5.92512 0.554315 5.50279 0.554315 5.24246 0.814648L0.528624 5.52865C0.497623 5.55965 0.469958 5.59381 0.445625 5.63015C0.434459 5.64698 0.426624 5.66515 0.416958 5.68265C0.405957 5.70331 0.393291 5.72298 0.384458 5.74481C0.374958 5.76731 0.369625 5.79065 0.362958 5.81398C0.357458 5.83248 0.350291 5.85015 0.346458 5.86915C0.337791 5.91248 0.333291 5.95615 0.333291 5.99998C0.333291 6.00048 0.333458 6.00098 0.333458 6.00148C0.333624 6.04465 0.337958 6.08798 0.346458 6.13048C0.350458 6.15048 0.357958 6.16898 0.363791 6.18865C0.370291 6.21081 0.375291 6.23331 0.384291 6.25481C0.393958 6.27798 0.406958 6.29898 0.418958 6.32081C0.427958 6.33715 0.435123 6.35381 0.445457 6.36948C0.46979 6.40631 0.497791 6.44065 0.528958 6.47181L5.24263 11.1853C5.50296 11.4456 5.92512 11.4456 6.18546 11.1855C6.44579 10.9251 6.44579 10.503 6.18546 10.2425L2.60946 6.66665L13 6.66665C13.3681 6.66665 13.6666 6.36815 13.6666 5.99998C13.6666 5.63181 13.3681 5.33331 13 5.33331Z" fill="white"/>
          </svg>
          Back
        </router-link>
        <div class="flex flex-col ml-6 text-black">
          <h1 class="font-medium">{{ movie.title }}</h1>
          <p class="font-light">{{ movie.tagline }}</p>
        </div>
      </div>
    </template>
    <div class="container mb-20">
      <div class="flex mb-14">
        <div class="w-1/3">
          <img :src="getImageUrl(movie.poster_path)" class="w-full rounded-xl" :alt="movie.title">
        </div>
        <div class="w-2/3 xl:pl-14">
          <ul class="mt-6">
            <li v-if="movie.budget" class="text-black flex justify-between mb-6 last:mb-0">
              <p class="font-medium">Budget</p>
              <p>{{ priceFormat(movie.budget) }}</p>
            </li>
            <li v-if="movie.revenue" class="text-black flex justify-between mb-6 last:mb-0">
              <p class="font-medium">Revenue</p>
              <p>{{ priceFormat(movie.revenue) }}</p>
            </li>
            <li v-if="movie.release_date" class="text-black flex justify-between mb-6 last:mb-0">
              <p class="font-medium">Release Date</p>
              <p>{{ movie.release_date }}</p>
            </li>
            <li v-if="movie.runtime" class="text-black flex justify-between mb-6 last:mb-0">
              <p class="font-medium">Runtime</p>
              <p>{{ minutesToHour(+movie.runtime) }}</p>
            </li>
            <li v-if="movie.vote_count" class="text-black flex justify-between mb-6 last:mb-0">
              <p class="font-medium">Score</p>
              <p>{{ movie.vote_average }} ({{ movie.vote_count }} votes)</p>
            </li>
            <li v-if="genres.length" class="text-black flex justify-between mb-6 last:mb-0">
              <p class="font-medium">Genres</p>
              <p>{{ genres }}</p>
            </li>
            <li v-if="movie.imdb_id" class="text-black flex justify-between mb-6 last:mb-0">
              <p class="font-medium">IMDB Link</p>
              <a class="text-blue-600 underline" target="_blanck" :href="`https://www.imdb.com/title/${movie.imdb_id}`">Link</a>
            </li>
            <li v-if="movie.homepage" class="text-black flex justify-between mb-6 last:mb-0">
              <p class="font-medium">Homepage Link</p>
              <a class="text-blue-600 underline" target="_blanck" :href="movie.homepage">Link</a>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <p class="text-black">{{ movie.overview }}</p>
      </div>
      <div class="mt-14 text-black">
        <h4 class="font-medium">Credit:</h4>
        <p>{{ casts }}</p>
      </div>
    </div>
  </movie-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { orderBy, take } from 'lodash';
import MovieLayout from "~/layouts/MovieLayout.vue";
import CommonMixin from '../mixins/CommonMixin';
import { FullMovieData } from '../models/Movie';
import HttpService from '../services/HttpService';
import { Cast } from "../models/Cast";

export default defineComponent({
  components: {
    MovieLayout
  },
  mixins: [CommonMixin],
  data: () => ({
    movie: {} as FullMovieData,
    allCast: [] as Cast[],
  }),
  computed: {
    genres() {
      if (this.movie.genres) {
        return this.movie.genres.map(g => g.name).join(', ');
      }
      return '';
    },
    casts() {
      const casts: Cast[] =  orderBy(this.allCast, ['popularity'], ['desc']);
      const takedCasts: Cast[] = take(casts, 10);
      return takedCasts.map(c => c.name).join(', ');
    }
  },
  async created() {
    const movieId = this.$route.params.movie;
    if (!movieId) {
      alert('page not found');
    }
    const moviesData = await HttpService.get(`/movie/${movieId}`);
    const creditsResponse = await HttpService.get(`/movie/${movieId}/credits`);
    this.movie = moviesData.data;
    this.allCast = creditsResponse.data.cast;
  },
})
</script>

<style lang="postcss" scoped>
</style>