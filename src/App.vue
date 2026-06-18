<template>
  <div id="app">
    <RouterView />
    <BottomNav />
  </div>
</template>

<script setup>
import BottomNav from '@/components/navigation/BottomNav.vue'
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  min-height: 100dvh; // dynamic viewport height — important sur mobile
  display: flex;
  flex-direction: column;
}
</style>