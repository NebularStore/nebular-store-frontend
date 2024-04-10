import {createApp} from 'vue'
import './css/main.css'
import App from './App.vue'
import {createMemoryHistory, createRouter} from "vue-router";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome"
import {library} from "@fortawesome/fontawesome-svg-core";
import {
    faMagnifyingGlass,
    faFileArrowUp,
    faFolderPlus,
    faRotateRight,
    faChevronUp,
    faFile, faChevronDown,
    faX
} from "@fortawesome/free-solid-svg-icons";
import Home from "./view/Home.vue";
import {PluginManager} from "./plugins/PluginManager.ts";
import {RevealMdPlugin} from "./plugins/RevealMdPlugin.ts";

PluginManager.instance.registerPlugin(new RevealMdPlugin());

library.add(faMagnifyingGlass);
library.add(faFileArrowUp);
library.add(faFolderPlus);
library.add(faRotateRight);
library.add(faChevronUp);
library.add(faChevronDown);
library.add(faX);
library.add(faFile);

const routes = [
    {path: "/", component: Home}
];

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

createApp(App).component("font-awesome-icon", FontAwesomeIcon).use(router).mount('#app')

