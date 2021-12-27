<template>
  <movie-layout>
    <template #header-bar>
      <p>Movie Header Bar Content</p>
    </template>
    <div class="container flex">
      <div class="grid grid-cols-12 xl:gap-14 sm:gap-8 gap-y-6 mb-14 w-full">
        <template v-for="movie in movies" :key="movie.id">
          <movie-card :movie="movie" />
        </template>
      </div>
    </div>
    <pagination v-if="movies.length" :current-page="currentPage" :total-pages="totalPages" @set-next-page="goNextPage" @set-prev-page="goPrevPage" />
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
import Pagination from "../components/Pagination.vue";

export default defineComponent({
  components: {
    Pagination,
    MovieLayout,
    MovieCard
  },
  data: () => ({
    movies: [] as Movie[],
    genres: [] as Genres[],
    currentPage: 1 as number,
    totalPages: null as number | null,
  }),
  async created() {
    try {
      await this.$store.dispatch('initialGenres');
      const currentPage = this.$route.query.page;
      await this.fetchMovies(currentPage ? +currentPage : 1);
    } catch (err) {
      console.error(err);
      alert('Somethings went wrong in fetching genres');
    }
  },
  methods: {
    async fetchMovies(currentPage: number) {
      try {
        this.currentPage = currentPage;
        const { data } = await httpService.get('/discover/movie', { params: { page: this.currentPage } });
        const paginatedData = data as PaginatedData<Movie>;
        this.movies = paginatedData.results;
        this.totalPages = paginatedData.total_pages;
        await this.setQueryParamToUrl();
        window.scrollTo(0,0);
      } catch (err) {
        console.error(err);
        alert('Somethings went wrong in fetching movies');
      }
    },
    async setQueryParamToUrl() {
      if (this.currentPage === 1) {
        await this.$router.replace({ query: {} });
      } else {
        await this.$router.push({ query: { page: this.currentPage } });
      }
    },
    async goNextPage() {
      await this.fetchMovies(this.currentPage + 1);
    },
    async goPrevPage() {
      await this.fetchMovies(this.currentPage - 1);
    }
  }
})
</script>

<style lang="postcss" scoped>
</style>