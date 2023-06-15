import './assets/style.sass';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import i18n from './plugins/i18n.ts';
import App from './App.vue';
import router from './router/index.ts';

const app = createApp(App);

app.use(i18n);

app.use(createPinia()).use(router).mount('#app');
