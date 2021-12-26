<template>
  <main>
    <div class="top-nav"></div>
    <router-view />
  </main>
</template>

<style lang="postcss">
.top-nav {
  @apply bg-emerald-500;
  height: 48px;
}
</style>
