<script setup lang="ts">
import {RepositoryNode} from "../types/RepositoryNode.ts";
import {ref} from "vue";
import type {RepositoryEntry} from "../types/RepositoryEntry.ts";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {createNewDir, uploadNewFile} from "../utils/repositoryUtils.ts";
import TransparentButton from "./TransparentButton.vue";
import {PluginManager} from "../plugins/PluginManager.ts";

interface Props {
  node: RepositoryNode,
  initiallyExpanded?: boolean,
  hideName?: boolean,
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'changedContent'): void
}>()
const isExpanded = ref(props.initiallyExpanded);

function createDir() {
  createNewDir(props.node.getPath(), () => {
    isExpanded.value = true;
    fetchChildren();
  })
}

function uploadFile() {
  uploadNewFile(props.node.getPath(), () => {
    isExpanded.value = true;
    fetchChildren();
  });
}

function remove() {
  const result = confirm("Are you sure you want to delete the file/directory?");
  if (!result) return;

  const path = "http://localhost:8080/files/repository/" + (props.node.is_file ? "file" : "dir") + "/" + props.node.getPath()
  fetch(path, {
    method: "DELETE"
  }).then(() => {
    emit("changedContent")
  })
}

async function fetchChildren() {
  if (props.node.is_file || !isExpanded.value) return;
  const path = "http://localhost:8080/files/structure/" + (props.node.getPath())
  const entries: RepositoryEntry[] = await (await fetch(path)).json()
  props.node.setChildren(entries.map(entry => new RepositoryNode(entry.name, entry.is_file, props.node, props.node.depth + 1)))
}

function changeExpanded() {
  isExpanded.value = !isExpanded.value;
  if (isExpanded.value) {
    fetchChildren();
  } else {
    props.node.children = [];
  }
}

function clicked() {
  if (props.node.is_file) {
    const pluginHook = PluginManager.instance.getDownloadHook(props.node.getPath());

    if (pluginHook) {
      pluginHook(props.node.getPath())
    } else {
      window.open("http://localhost:8080/files/serve/" + props.node.getPath(), "_blank")?.focus();
    }
  } else {
    changeExpanded();
  }
}

</script>

<template>
  <div id="heading" v-if="!hideName" :style="{'padding-left': 24 * props.node.depth + 'px'}">
    <div id="leading">
      <font-awesome-icon :icon="['fas', 'file']" style="color: #999; width: 16px" v-if="props.node.is_file"/>
      <transparent-button v-else style="width: 16px" @click="changeExpanded">
        <font-awesome-icon :icon="['fas', 'chevron-down']" style="color: #999" v-if="isExpanded"/>
        <font-awesome-icon :icon="['fas', 'chevron-up']" style="color: #999" v-else/>
      </transparent-button>
      <p id="name" @click="clicked">{{ props.node.name }}</p>
    </div>
    <div id="trailing">
      <template id="dir-buttons" v-if="!props.node.is_file">
        <transparent-button class="node-button" @click="createDir">
          <font-awesome-icon :icon="['fas', 'folder-plus']" style="color: #999; height: 100%"/>
        </transparent-button>
        <transparent-button class="node-button" @click="uploadFile">
          <font-awesome-icon :icon="['fas', 'file-arrow-up']" style="color: #999; height: 100%"/>
        </transparent-button>
        <transparent-button class="node-button" @click="fetchChildren">
          <font-awesome-icon :icon="['fas', 'rotate-right']" style="color: #999; height: 100%"/>
        </transparent-button>
      </template>
      <transparent-button class="node-button" @click="remove">
        <font-awesome-icon :icon="['fas', 'x']" style="color: #999; height: 100%"/>
      </transparent-button>
    </div>
  </div>
  <RepositoryNodeDisplay v-for="node in props.node.children" :node="node" @changed-content="fetchChildren"/>
</template>

<style scoped lang="scss">
#heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;

  border: 0 solid silver;
  border-width: 1px 0px 0 0;

  #leading {
    display: flex;
    align-items: center;
    gap: 8px;

    #name {
      cursor: pointer;
    }
  }

  #trailing {
    display: flex;
    height: 30px;

    .node-button {
      height: 100%;
      padding: 4px;
      box-sizing: border-box;
    }
  }
}
</style>