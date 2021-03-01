<!--
 * @Version: 0.0.1
 * @Author: ider
 * @Date: 2020-12-28 13:36:42
 * @LastEditors: ider
 * @LastEditTime: 2021-01-13 16:58:45
 * @Description:
-->
<template lang="pug">
el-row(justify="center",type="flex")
  .signin-signup(v-if="loginStatus===true")
    h1 登录
    LoginForm(:loginUser="loginUser",:rules="rules")
  .signin-signup(v-else)
    h1 注册
    RegisterForm(:registerUser="registerUser",:registerRules="registerRules")
el-row.action(justify="center",type="flex")
  el-button(type="primary",v-if="loginStatus===true",@click="loginStatus=!loginStatus") 注册
  el-button(type="primary",v-else,@click="loginStatus=!loginStatus") 登录

</template>

<script lang="ts">

import { reactive, toRefs } from 'vue';
import LoginForm from '@/components/LoginForm.vue';
import RegisterForm from '@/components/RegisterForm.vue';
import { loginUser, rules } from '@/util/loginValidators';
import { registerUser, registerRules } from '@/util/registerValidators';
import { token } from '@/util/userStore';

export default {
  name: 'LoginRegister',
  components: {
    LoginForm,
    RegisterForm,
  },
  setup() {
    const data = reactive({
      loginStatus: true,
    });
    return {
      ...toRefs(data),
      loginUser,
      rules,
      registerUser,
      registerRules,
      token,
    };
  },
};

</script>

<style lang="scss" scope>
.container {
    position: relative;
    width: 100%;
    background-color: #fff;
    min-height: 100vh;
    overflow: hidden;
}

.form-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top:0;
    left:0;
}

.action {
  margin-top:2em;
}
</style>
