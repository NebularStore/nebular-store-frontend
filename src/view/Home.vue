<script setup lang="ts">
import SearchBar from "../components/SearchBar.vue";
import IconButton from "../components/IconButton.vue";
import {RepositoryEntry} from "../types/RepositoryEntry.ts";
import {RepositoryNode} from "../types/RepositoryNode.ts";
import {onMounted, ref} from "vue";
import RepositoryNodeDisplay from "../components/RepositoryNodeDisplay.vue";
import {createNewDir, uploadNewFile} from "../utils/repositoryUtils.ts";

const root = ref(new RepositoryNode("root", false, undefined, -1));

onMounted(loadRoot);

onMounted(() => loadRoot())

function createDir() {
  createNewDir("", loadRoot);
}

function uploadFile() {
  uploadNewFile(undefined, loadRoot);
}

async function loadRoot() {
  root.value.clearChildren();
  let entries: RepositoryEntry[] = await (await fetch("http://localhost:8080/files/structure/")).json()
  root.value.setChildren(entries.map(entry => new RepositoryNode(entry.name, entry.is_file, root.value, 0)))
}
</script>

<template>
  <div id="home">
    <div id="top-bar">
      <search-bar/>
      <icon-button @click="createDir">
        <font-awesome-icon class="searchbar-icon" :icon="['fas', 'folder-plus']" style="height: 100%; color: #999;"/>
      </icon-button>
      <icon-button @click="uploadFile">
        <font-awesome-icon class="searchbar-icon" :icon="['fas', 'file-arrow-up']" style="height: 100%; color: #999;"/>
      </icon-button>
      <icon-button @click="loadRoot">
        <font-awesome-icon class="searchbar-icon" :icon="['fas', 'rotate-right']" style="height: 100%; color: #999"/>
      </icon-button>
    </div>
    <div id="repository">
      <RepositoryNodeDisplay :node="root"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
#home {
  // size
  width: calc(100% - 60px);
  height: calc(100% - 60px);

  // layout
  margin: 30px;
  padding: 16px;
  box-sizing: border-box;
  border-radius: 8px;

  // color
  background: #eee;

  #top-bar {
    display: flex;

    width: 100%;
    height: 30px;

    .searchbar-icon {
      box-sizing: border-box;
      padding: 4px;
    }
  }

  #repository {
    margin: 16px 8px;

    border: 0 solid silver;
    border-width: 0 0 1px 0px;
  }
}
</style>