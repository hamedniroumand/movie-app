<template>
  <div class="mt-14 text-black">
    <h4 class="font-bold">Credit:</h4>
    <p>{{ casts }}</p>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import { orderBy, take } from 'lodash';
import {Cast} from "../../models/Cast";

export default defineComponent({
  props: {
    allCasts: {
      type: Array as PropType<Cast[]>,
      required: true,
    },
  },
  computed: {
    casts() {
      const casts: Cast[] =  orderBy(this.allCasts, ['popularity'], ['desc']);
      const tackedCasts: Cast[] = take(casts, 10);
      return tackedCasts.map(c => c.name).join(', ');
    }
  }
})
</script>