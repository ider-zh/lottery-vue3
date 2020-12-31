<!--
 * @Version: 0.0.1
 * @Author: ider
 * @Date: 2020-12-28 13:36:42
 * @LastEditors: ider
 * @LastEditTime: 2020-12-31 13:36:15
 * @Description:
-->
<template lang="pug">
el-row
    h1 登录
    LoginForm(:loginUser="loginUser",:rules="rules")
    RegisterForm(:registerUser="registerUser",:registerRules="registerRules")
    h1 注册

</template>

<script lang="ts">

import LoginForm from '@/components/LoginForm.vue';
import RegisterForm from '@/components/RegisterForm.vue';
import { loginUser, rules } from '@/util/loginValidators';
import { registerUser, registerRules } from '@/util/registerValidators';

export default {
  name: 'LoginRegister',
  components: {
    LoginForm,
    RegisterForm,
  },
  setup() {
    return {
      loginUser,
      rules,
      registerUser,
      registerRules,
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

.signin-signup {
    position: absolute;
    top: 50%;
    left: 75%;
    width:44%;
    transform: 1s 0.7s ease-in-out;
    display: grid;
    grid-template-columns: 1fr;
    z-index:5;
}
</style>
