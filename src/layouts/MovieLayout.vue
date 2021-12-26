<template>
  <div>
    <div class="top-nav"></div>
    <div class="container">
      <header-bar>
        <slot name="header-bar" />
      </header-bar>
    </div>
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import HeaderBar from "@/HeaderBar.vue";

export default defineComponent({
  components: {
    HeaderBar,
  }
})
</script>