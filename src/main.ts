import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './style/main.scss'

createApp(App).use(store).use(router).mount('#app')
