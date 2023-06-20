import './assets/style.sass';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router/index.ts';
import i18n from './plugins/i18n.ts';

const app = createApp(App);

// @ts-ignore
app.use(i18n);

app.use(createPinia()).use(router).mount('#app');
