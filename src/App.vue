<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <p>
        If Element Plus is successfully added to this project, you'll see an
        <code v-text="'<el-button>'"></code>
        below
      </p>
      <el-button type="primary">el-button</el-button>
    </div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <LottoBall count=16 boolType="blue"/>
      <div id="nav">
    <!-- <router-link to="/">Home</router-link> | -->
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>

  </div>
</template>

<script>
import LottoBall from '@/components/LottoBall.vue'; // @ is an alias to /src
// import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'App',
  components: {
    // HelloWorld,
    LottoBall,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
