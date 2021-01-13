<!--
 * @Version: 0.0.1
 * @Author: ider
 * @Date: 2020-12-31 13:27:02
 * @LastEditors: ider
 * @LastEditTime: 2021-01-13 15:48:01
 * @Description: 注册用户
-->
<template lang="pug">
el-form.registerForm(ref="registerForm",:model="registerUser",:rules="registerRules",label-width="100px")
    el-form-item(label="用户名",prop="username")
        el-input(v-model="registerUser.username",placeholder="Enter UserName...")
    el-form-item(label="邮箱",prop="email")
        el-input(v-model="registerUser.email",placeholder="Enter Email...")
    el-form-item(label="密码",prop="password")
        el-input(v-model="registerUser.password",type="password",placeholder="Enter Password...")
    el-form-item(label="确认密码",prop="password2")
        el-input(v-model="registerUser.password2",type="password",placeholder="Enter Password...")
    el-form-item
        el-button.submit-btn(@click="handleRegister('registerForm')",type="primary") 注册

</template>

<script lang="ts">
import { getCurrentInstance } from 'vue';
import { register } from '@/api/user';
// 仅限在当前组件使用
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
  setup(props: any) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const { ctx } = getCurrentInstance();

    const handleRegister = (formName: string) => {
      // eslint-disable-next-line consistent-return
      ctx.$refs[formName].validate((valid: boolean) => {
        if (valid) {
          console.log('success');

          register(props.registerUser);
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
  width:30em;
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
