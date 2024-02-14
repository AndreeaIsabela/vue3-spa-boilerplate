import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import 'bootswatch/dist/darkly/bootstrap.min.css';
import { pinia } from './stores';

const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount('#app');
