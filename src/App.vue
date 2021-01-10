<template  lang="pug">
el-container(id="app")
  //- el-aside(width="200px") Aside
  el-container
    el-header
      el-menu(class="el-menu-demo",router,mode="horizontal")
        el-menu-item(index="/") Home
        el-menu-item(index="/doubleballaward",v-if="token!=undefined&&token.length>0") 双色球清单
        el-menu-item(index="/doubleball") 双色球选号
        el-menu-item(index="/login",class="login",v-if="token===undefined||token.length===0") login
        el-submenu(index="/login",class="login",v-else)
          template(#title) login
          el-menu-item(@click="logout") 登出

        el-menu-item(disabled,index="/404",class="login")
          el-divider(direction="vertical")
      el-main
        router-view
      el-footer Footer
</template>

<script>
import { reactive, toRefs, computed } from 'vue';
import { useStore } from 'vuex';
// import DoubleBall from './views/lotto/DoubleBall.vue'; // @ is an alias to /src
// import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'App',
  components: {
    // DoubleBall,
  },
  setup() {
    const store = useStore();
    const data = reactive({
      redballs: [],
      blueballs: [],
    });
    function logout() {
      store.dispatch('user/logout');
    }
    const token = computed(() => store.getters['user/token']);
    return { ...toRefs(data), logout, token };
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 100%;
  height: 100%;
  .login {
  float: right;
}
}
.el-message {
  z-index: 3000 !important;
}
</style>
