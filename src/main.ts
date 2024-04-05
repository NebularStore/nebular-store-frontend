import {createApp} from 'vue'
import './css/main.css'
import App from './App.vue'
import {createMemoryHistory, createRouter} from "vue-router";
import Home from "./view/Home.vue";

const routes = [
    {path: "/", component: Home}
];

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

createApp(App).use(router).mount('#app')
