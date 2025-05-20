import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router'
import { naiveUi } from './plugins/naive-ui.ts'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(naiveUi)
app.use(pinia)
app.mount('#app')
