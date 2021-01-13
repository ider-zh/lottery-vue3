<!--
 * @Version: 0.0.1
 * @Author: ider
 * @Date: 2020-12-31 12:55:00
 * @LastEditors: ider
 * @LastEditTime: 2021-01-13 15:54:15
 * @Description: 登录用框
-->
<template lang="pug">
el-form.loginForm(ref="loginForm",:model="loginUser",:rules="rules",label-width="100px")
    el-form-item(label="用户名",prop="username")
        el-input(v-model="loginUser.username",placeholder="Enter Name...")
    el-form-item(label="密码",prop="password")
        el-input(v-model="loginUser.password",type="password",placeholder="Enter Password...")
    el-form-item
        el-button.submit-btn(@click="handleLogin('loginForm')",type="primary") 提交
    .tiparea
        p 忘记密码？
            a 立即找回
</template>
<script lang="ts">
import { ref, Ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  props: {
    loginUser: {
      type: Object,
      required: true,
    },
    rules: {
      type: Object,
      required: true,
    },
  },
  setup(props: any) {
    const store = useStore();
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    // const { ctx } = getCurrentInstance();
    const loginForm: Ref< {validate: function}> = ref(null);
    const router = useRouter();
    // 触发登录方法
    const handleLogin = () => {
      // eslint-disable-next-line consistent-return
      loginForm.value.validate((valid: boolean) => {
        if (valid) {
          // todo login
          console.log(props.loginUser);
          store.dispatch('user/login', props.loginUser).then(() => {
            router.push('/');
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    };

    return { handleLogin, loginForm };
  },
};
</script>

<style lang="scss" scoped>
/* form */
.loginForm {
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
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>
