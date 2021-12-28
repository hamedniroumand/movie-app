<template>
  <movie-layout v-if="movie && casts.length">
    <template #header-bar>
      <single-movie-header-bar :title="movie.title" :tagline="movie.tagline"/>
    </template>
    <div class="container mb-20">
      <single-movie-info :movie="movie"/>
      <div>
        <p class="text-black">{{ movie.overview }}</p>
      </div>
      <single-movie-credit :all-casts="casts"/>
    </div>
  </movie-layout>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import MovieLayout from "~/layouts/MovieLayout.vue";
import CommonMixin from '../mixins/CommonMixin';
import {FullMovieData} from '../models/Movie';
import HttpService from '../services/HttpService';
import {Cast} from "../models/Cast";
import SingleMovieHeaderBar from "@/SingleMovie/SingleMovieHeaderBar.vue";
import SingleMovieCredit from "@/SingleMovie/SingleMovieCredit.vue";
import SingleMovieInfo from "@/SingleMovie/SingleMovieInfo.vue";

export default defineComponent({
  components: {
    SingleMovieInfo,
    SingleMovieCredit,
    SingleMovieHeaderBar,
    MovieLayout
  },
  mixins: [CommonMixin],
  data: () => ({
    movie: {} as FullMovieData,
    casts: [] as Cast[],
  }),
  async created() {
    const movieId = this.$route.params.movie;
    if (!movieId) {
      alert('page not found');
    }
    try {
      await this.$store.dispatch('changeLoadingState', true);
      const moviesData = await HttpService.get(`/movie/${movieId}`);
      const creditsResponse = await HttpService.get(`/movie/${movieId}/credits`);
      this.movie = moviesData.data;
      this.casts = creditsResponse.data.cast;
      document.title = this.movie.title;
      await this.$store.dispatch('changeLoadingState', false);
    } catch (err) {
      console.error(err);
      alert('Somethings went wrong in fetching movie data');
    }
  },
})
</script>