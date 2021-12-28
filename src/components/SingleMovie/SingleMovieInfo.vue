<template>
  <div class="flex flex-col sm:flex-row mb-14">
    <div class="w-full xl:w-1/3 md:w-1/2 sm:w-full">
      <img :src="getImageUrl(movie.poster_path)" class="w-full rounded-xl" :alt="movie.title">
    </div>
    <div class="w-full xl:w-2/3 md:w-1/2 sm:w-full sm:pl-14">
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
          <a class="text-blue-600 underline" target="_blank" :href="`https://www.imdb.com/title/${movie.imdb_id}`">Link</a>
        </li>
        <li v-if="movie.homepage" class="text-black flex justify-between mb-6 last:mb-0">
          <p class="font-medium">Homepage Link</p>
          <a class="text-blue-600 underline" target="_blank" :href="movie.homepage">Link</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {FullMovieData} from "../../models/Movie";
import CommonMixin from "../../mixins/CommonMixin";

export default defineComponent({
  mixins: [CommonMixin],
  props: {
    movie: {
      type: Object as PropType<Partial<FullMovieData>>,
      required: true,
    },
  },
  computed: {
    genres(): string {
      if (this.movie.genres) {
        return this.movie.genres.map(g => g.name).join(', ');
      }
      return '';
    },
  },
})
</script>