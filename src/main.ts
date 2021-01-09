import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import installElementPlus from './plugins/element';

const MYAPP = createApp(App);
installElementPlus(MYAPP);

MYAPP.use(store).use(router)
  .mount('#app');
