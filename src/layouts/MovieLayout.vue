<template>
  <div>
    <div class="bg-emerald-500 h-[3rem] flex justify-center items-center ">
      <div class="container">
        <router-link class="text-white opacity-90 hover:opacity-100" to="/">Home</router-link>
      </div>
    </div>
    <div class="container">
      <header-bar>
        <slot name="header-bar" />
      </header-bar>
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeaderBar from "@/HeaderBar.vue";

export default defineComponent({
  components: {
    HeaderBar,
  }
})
</script>