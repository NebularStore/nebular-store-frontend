<script setup lang="ts">

import {ref} from "vue";

const title = ref("...");

fetch("http://localhost:8080/theme/company_name", {
  method: "GET"
}).then(async value => {
  title.value = await value.text();
})

</script>

<template>
  <nav>
    <img src="http://localhost:8080/theme/icon" alt="company logo">
    <h1>{{title}}</h1>
  </nav>
</template>

<style scoped lang="scss">
nav {
  // size
  height: 80px;

  // layout
  display: flex;
  gap: 10px;
  box-sizing: border-box;
  padding: 8px;


  // color
  background: #eee;

  img {
    max-height: 100%;
  }
}
</style>