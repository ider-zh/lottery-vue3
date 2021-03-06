import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const files = require.context('./modules', false, /\.ts$/);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const modules: any = {};

files.keys().forEach((key) => {
  modules[key.replace(/(\.\/|\.ts)/g, '')] = files(key).default;
});
Object.keys(modules).forEach((key) => {
  modules[key].namespaced = true;
});

export default createStore({
  modules,
  plugins: [createPersistedState()],
});
