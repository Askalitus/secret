import '@/assets/style.sass';
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// todo убрать не нужные папки в  src
// @ts-ignore
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
