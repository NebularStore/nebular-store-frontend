<script setup lang="ts">
import {ref} from "vue";
import TransparentButton from "./TransparentButton.vue";

const content = ref("");

const emit = defineEmits<{
  (e: 'searched', searchString: string): void
}>();
</script>

<template>
  <input type="text" placeholder="Enter search text:" v-model="content">

  <transparent-button @click="emit('searched', content)">
    <font-awesome-icon :icon="['fas', 'magnifying-glass']"
                       style="color: #999; height: 100%"/>
  </transparent-button>
</template>

<style scoped lang="scss">
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
</style>