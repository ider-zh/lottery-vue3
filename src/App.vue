<template>
  <el-container id="app">
    <!-- <el-aside width="200px">
      Aside
    </el-aside> -->
    <el-container>
      <el-header>
        <el-menu
          class="el-menu-demo"
          router
          mode="horizontal"
        >
          <el-menu-item index="/">
            Home
          </el-menu-item>
          <el-menu-item
            index="/login"
          >
            login
          </el-menu-item>
          <el-menu-item
            index="/about"
            disabled
          >
            About
          </el-menu-item>
          <el-menu-item
            index="/doubleballaward"
          >
            award
          </el-menu-item>
          <el-menu-item index="/doubleball">
            ball
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-main><router-view /></el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
import { reactive, toRefs } from 'vue';
// import DoubleBall from './views/lotto/DoubleBall.vue'; // @ is an alias to /src
// import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'App',
  components: {
    // DoubleBall,
  },
  setup() {
    const data = reactive({
      redballs: [],
      blueballs: [],
    });

    return { ...toRefs(data) };
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
}
.el-message {
  z-index: 3000 !important;
}
</style>
