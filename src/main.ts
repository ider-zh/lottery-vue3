import { createApp } from 'vue';
import _ from 'lodash';
import App from './App.vue';
import router from './router';
import store from './store';
import installElementPlus from './plugins/element';

const MYAPP = createApp(App);
MYAPP.config.globalProperties.lodash = _;
installElementPlus(MYAPP);
MYAPP.use(store).use(router)
  .mount('#app');
