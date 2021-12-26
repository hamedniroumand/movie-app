<template>
  <div
      class="xl:col-span-4 md:col-span-6 sm:col-span-6 col-span-12 p-1 rounded-md bg-neutral-200 border-gray-300 border-2 hover:bg-neutral-300 flex min-h-[12rem]">
    <div class="max-w-[8rem] w-full">
      <router-link class="w-32 contents" to="#">
        <img class="w-full" src="/images/movies/movie-1.png" alt="movie">
      </router-link>
    </div>
    <div class="flex flex-col justify-between p-3">
      <h3 class="font-bold text-black">
        <router-link to="#">Marvel Avengers Assemble</router-link>
      </h3>
      <div>
        <div class="inline-flex flex-wrap mb-2">
          <img class="mr-1" src="/images/calendar.svg" alt="calendar">
          <p class="text-xs">2014-10-22</p>
        </div>
        <ul class="genres">
          <li class="genres__item text-xs">
            <span>Action</span>
          </li>
          <li class="genres__item text-xs">
            <span>Adventure</span>
          </li>
          <li class="genres__item text-xs">
            <span>Sci-Fi</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

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