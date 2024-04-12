<script setup lang="ts">
import SearchBar from "../components/SearchBar.vue";
import {RepositoryNode} from "../types/RepositoryNode.ts";
import {onMounted, ref} from "vue";
import RepositoryNodeDisplay from "../components/RepositoryNodeDisplay.vue";
import {createNewDir, fetchStructure, uploadNewFile} from "../utils/apiUtils.ts";
import TransparentButton from "../components/TransparentButton.vue";
import {openFileSelection} from "../utils/uiUtils.ts";

const root = ref(new RepositoryNode("root", false, undefined, -1));

onMounted(loadRoot);

onMounted(() => loadRoot())

function createDir() {
  const name = prompt("Enter a name fo the new directory:")
  if (!name) return;
  createNewDir("", name).then(loadRoot);
}

function uploadFile() {
  openFileSelection(files => {
    uploadNewFile("", files[0]).then(loadRoot)
  });
}

function loadRoot() {
  root.value.clearChildren();
  fetchStructure("").then(entries => {
    root.value.setChildren(entries.map(entry => new RepositoryNode(entry.name, entry.is_file, root.value, 0)))
  })
}

</script>

<template>
  <div id="home">
    <div id="top-bar">
      <search-bar/>
      <transparent-button @click="createDir">
        <font-awesome-icon class="searchbar-icon" :icon="['fas', 'folder-plus']"/>
      </transparent-button>
      <transparent-button @click="uploadFile">
        <font-awesome-icon class="searchbar-icon" :icon="['fas', 'file-arrow-up']"/>
      </transparent-button>
      <transparent-button @click="loadRoot">
        <font-awesome-icon class="searchbar-icon" :icon="['fas', 'rotate-right']"/>
      </transparent-button>
    </div>
    <div id="repository">
      <RepositoryNodeDisplay :node="root" :initially-expanded="true" :hide-name="true"/>
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
    justify-content: space-between;
    align-items: center;
    gap: 4px;

    width: 100%;
    height: 30px;
  }

  #repository {
    margin: 16px 8px;

    border: solid silver;
    border-width: 0 0 1px 0;
  }
}
</style>

<style lang="scss">
#home {
  #top-bar {
    button {
      height: 100%;
      padding: 4px 0;
      box-sizing: border-box;

      svg {
        height: 100%;
        aspect-ratio: 1;
        color: #999;
      }
    }
  }
}
</style>