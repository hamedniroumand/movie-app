<template>
  <movie-layout>
    <template #header-bar>
      <release-date-filter :start-year-value="startYear" :end-year-value="endYear" @do-filter-date="searchByDate" />
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
import ReleaseDateFilter from "../components/ReleaseDateFilter.vue";

export default defineComponent({
  components: {
    ReleaseDateFilter,
    Pagination,
    MovieLayout,
    MovieCard
  },
  data: () => ({
    movies: [] as Movie[],
    genres: [] as Genres[],
    totalPages: null as number | null,
    currentPage: 1 as number,
  }),
  async created() {
    try {
      await this.$store.dispatch('initialGenres');
      const currentPage = this.$route.query.page;
      this.currentPage = currentPage ? +currentPage : 1;
      await this.fetchMovies(this.$route.query);
    } catch (err) {
      console.error(err);
      alert('Somethings went wrong in fetching genres');
    }
  },
  computed: {
    startYear() {
      return this.$route.query['primary_release_date.gte'] as string ?? null;
    },
    endYear() {
      return this.$route.query['primary_release_date.lte'] as string ?? null;
    },
  },
  methods: {
    async fetchMovies(queries: any) {
      try {
        const { data } = await httpService.get('/discover/movie', {
          params: queries
        });
        const paginatedData = data as PaginatedData<Movie>;
        this.movies = paginatedData.results;
        this.totalPages = paginatedData.total_pages;
        this.currentPage = paginatedData.page;
        window.scrollTo(0,0);
      } catch (err) {
        console.error(err);
        alert('Somethings went wrong in fetching movies');
      }
    },
    async goNextPage() {
      this.currentPage++;
      await this.$router.push({ query: { ...this.$route.query, page: this.currentPage } })
    },
    async goPrevPage() {
      this.currentPage--;
      await this.$router.push({ query: { ...this.$route.query, page: this.currentPage } })
    },
    async searchByDate({ startYear, endYear }: { startYear: number, endYear: number }) {
      if (+startYear && +endYear) {
        if (startYear > endYear) {
          return alert('Start date should less than the end date')
        }
      }
      const query = { ...this.$route.query };
      let queries = {};
      if (startYear > 0) {
        delete query.page;
        queries = { ...queries, 'primary_release_date.gte': startYear };
      }
      if (endYear > 0) {
        delete query.page;
        queries = { ...queries, 'primary_release_date.lte': endYear };
      }
      await this.$router.push({ query: queries })
    },
  },
  watch: {
    async $route(to) {
      await this.fetchMovies(to.query)
    }
  }
})
</script>

<style lang="postcss" scoped>
</style>