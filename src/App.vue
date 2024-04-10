<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <div>
    <Navbar/>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<style scoped lang="scss">
div{
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  main {
    width: 100%;

    flex: 1;
  }
}
</style>
