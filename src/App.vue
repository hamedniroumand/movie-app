<template>
  <main>
    <app-loader v-if="isLoading" />
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppLoader from "@/Shared/AppLoader.vue";

export default defineComponent({
  components: {
    AppLoader,
  },
  computed: {
    isLoading() {
      return this.$store.getters.loading;
    }
  },
  watch: {
    isLoading(value) {
      if (value) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    }
  }
})
</script>
