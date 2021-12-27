<template>
  <div class="mb-10 mt-4">
    <div class="flex items-center justify-center">
      <p class="font-medium" :class="hasPrevPage ? 'text-blue-600 cursor-pointer': 'text-gray-400'" @click="$emit('setPrevPage')">Previous Page</p>
      <svg class="mx-5" width="1" height="40" viewBox="0 0 1 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="0.5" x2="0.5" y2="40" stroke="#6A6A6A"/>
      </svg>
      <p class="font-medium" :class="hasNextPage ? 'text-blue-600 cursor-pointer': 'text-gray-400'" @click="$emit('setNextPage')">Next Page</p>
    </div>
    <p class="text-center mt-3 text-xs">Showing results {{ currentPage }}-{{ totalPages }}</p>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
export default defineComponent({
  props: {
    currentPage: {
      type: Number as PropType<number>,
      required: true
    },
    totalPages: {
      type: Number as PropType<number>,
      required: true
    },
  },
  computed: {
    hasNextPage(): boolean {
      return this.totalPages > this.currentPage;
    },
    hasPrevPage(): boolean {
      return this.currentPage !== 1;
    },
  }
})
</script>

<style scoped>

</style>