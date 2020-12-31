<!--
 * @Version: 0.0.1
 * @Author: ider
 * @Date: 2020-12-31 13:27:02
 * @LastEditors: ider
 * @LastEditTime: 2020-12-31 19:49:39
 * @Description: 注册用户
-->
<template lang="pug">
el-form(ref="registerForm",:model="registerUser",:rules="registerRules",label-width="100px",class="registerForm sign-up-form")
    el-form-item(label="用户名",prop="name")
        el-input(v-model="registerUser.name",placeholder="Enter UserName...")
    el-form-item(label="邮箱",prop="email")
        el-input(v-model="registerUser.email",placeholder="Enter Email...")
    el-form-item(label="密码",prop="password")
        el-input(v-model="registerUser.password",type="password",placeholder="Enter Password...")
    el-form-item(label="确认密码",prop="password2")
        el-input(v-model="registerUser.password2",type="password",placeholder="Enter Password...")
    el-form-item
        el-button(@click="handleRegister('registerForm')",type="primary",class="submit-btn") 注册

</template>

<script lang="ts">
import { getCurrentInstance } from 'vue';
// import axios from 'axios' // 仅限在当前组件使用
export default {
  props: {
    registerUser: {
      type: Object,
      required: true,
    },
    registerRules: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const internalInstance = getCurrentInstance();

    const handleRegister = (formName: string) => {
      // eslint-disable-next-line consistent-return
      internalInstance.ctx.$refs[formName].validate((valid: boolean) => {
        if (valid) {
          console.log('success');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    };

    return { handleRegister };
  },
};
</script>

<style lang="scss" scoped>
.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit-btn {
  width: 100%;
}
</style>
