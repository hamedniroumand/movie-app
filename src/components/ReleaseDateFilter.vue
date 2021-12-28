<template>
  <div class="flex flex-col md:flex-row justify-between items-center md:gap-0 gap-4">
    <div class="flex flex-col md:flex-row justify-between items-center md:gap-0 gap-4">
      <p class="text-black">Search by release date:</p>
      <select class="xl:mx-10 bg-white md:mx-6 px-3 py-1" v-model="startYear">
        <option value="0">Start Year (All)</option>
        <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
      </select>
      <select class="px-3 bg-white py-1" v-model="endYear">
        <option value="0">End Year (All)</option>
        <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
      </select>
    </div>
    <button class="bg-blue-400 hover:bg-blue-500 rounded-full w-20 h-8 text-white" @click="searchClicked">Search</button>
  </div>
</template>


<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  props: {
    startYearValue: {
      type: Number,
      default: 0,
    },
    endYearValue: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({
    years: [] as number[],
    startYear: 0 as number,
    endYear: 0 as number,
  }),
  created() {
    let i = 2022;
    while (i >= 1895) {
      this.years.push(i)
      i--
    }
  },
  watch: {
    startYearValue(value) {
      this.startYear = +value ?? 0;
    },
    endYearValue(value) {
      this.endYear = +value ?? 0;
    }
  },
  methods: {
    searchClicked() {
      this.$emit('do-filter-date', {
        startYear: this.startYear,
        endYear: this.endYear,
      })
    }
  }
})
</script>

<style scoped>

</style>