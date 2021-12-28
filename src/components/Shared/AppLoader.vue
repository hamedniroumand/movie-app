<template>
  <div class="fixed flex justify-center items-center overflow-y-hidden z-50 bg-white h-screen w-full">
    <div>
      <semipolar-spinner :animation-duration="2000" :size="65" color="#000" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { SemipolarSpinner  } from 'epic-spinners'

export default defineComponent({
  components: {
    SemipolarSpinner
  }
})
</script>