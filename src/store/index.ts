import { createStore } from 'vuex';

const files = require.context('./modules', false, /\.js$/);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const modules: any = {};

files.keys().forEach((key) => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default;
});
Object.keys(modules).forEach((key) => {
  modules[key].namespaced = true;
});

export default createStore({
  modules,
});
