import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import installElementPlus from './plugins/element';

import axios from './util/http';

const MYAPP = createApp(App);
installElementPlus(MYAPP);

// 全局挂载axios
MYAPP.config.globalProperties.$axios = axios;

MYAPP.use(store).use(router)
  .mount('#app');
