<template>
  <div
      class="xl:col-span-4 md:col-span-6 sm:col-span-6 col-span-12 p-1 rounded-md bg-neutral-200 border-gray-300 border-2 hover:bg-neutral-300 flex min-h-[12rem]">
    <div class="max-w-[8rem] w-full">
      <router-link class="w-32 contents" :to="`/movies/${movie.id}`">
        <img class="w-full h-full rounded-tl-md rounded-bl-md" :src="getImageUrl(movie.poster_path)" :alt="movie.title">
      </router-link>
    </div>
    <div class="flex flex-col justify-between p-3">
      <h3 class="font-bold text-black">
        <router-link :to="`/movies/${movie.id}`">{{ movie.title }}</router-link>
      </h3>
      <div>
        <div class="inline-flex flex-wrap mb-2">
          <img class="mr-1" src="/images/calendar.svg" alt="calendar">
          <p class="text-xs text-neutral-600">{{ movie.release_date }}</p>
        </div>
        <ul class="genres">
          <li v-for="genre in genresName" :key="genre.id" class="genres__item text-xs">
            <span class="text-neutral-600">{{ genre.name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {Movie} from "../models/Movie";
import CommonMixin from "../mixins/CommonMixin";
import {Genres} from "../models/Genres";

export default defineComponent({
  mixins: [CommonMixin],
  props: {
    movie: {
      type: Object as PropType<Movie>,
      required: true,
    },
  },
  computed: {
    genres(): Genres[] {
      return this.$store.getters.genres;
    },
    genresName(): Genres[] {
      return this.genres.filter(g => this.movie.genre_ids.includes(g.id))
    }
  },
})
</script>

<style lang="scss" scoped>
.genres {
  position: relative;
  left: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0 20px;

  .genres__item {
    list-style: disc;

    span {
      position: relative;
      left: -5px;
    }
  }
}
</style>