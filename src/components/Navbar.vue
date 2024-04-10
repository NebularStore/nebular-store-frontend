<script setup lang="ts">

import {ref} from "vue";
import {getCompanyName, getLogoURL} from "../utils/apiUtils.ts";

const title = ref("...");

const logoPath = getLogoURL();

getCompanyName().then(value => title.value = value);
</script>

<template>
  <nav>
    <img :src="logoPath" alt="company logo">
    <h1>{{ title }}</h1>
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