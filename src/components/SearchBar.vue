<script setup lang="ts">

import IconButton from "./IconButton.vue";
</script>

<template>
  <div id="search-bar-container">
    <input type="text" placeholder="Enter search text:">

    <icon-button id="search-button">
      <font-awesome-icon :icon="['fas', 'magnifying-glass']"
                         style="color: #999; height: 100%"/>
    </icon-button>
  </div>
</template>

<style scoped lang="scss">
#search-bar-container {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 5px;
  height: 100%;

  input {
    flex: 1;
    height: 100%;

    padding: 0 8px;
    box-sizing: border-box;
    border-radius: 100vh;

    border: 1.5px solid #ccc;

    &:focus-visible {
      outline: none;
      border: 1.5px solid #aaa;
    }
  }

  button {
    height: 100%;
  }

  #search-button {
    box-sizing: border-box;
    padding: 4px;
  }
}
</style>