<!--
 * @Version: 0.0.1
 * @Author: ider
 * @Date: 2020-12-31 13:27:02
 * @LastEditors: ider
 * @LastEditTime: 2021-01-13 17:21:03
 * @Description: 修改用户信息
-->
<template lang="pug">
el-form(ref="userInfoForm",:model="infoUser",:rules="infoRules",label-width="100px",class="userInfoForm")
  el-form-item(label="昵称",prop="nickname")
    el-input(v-model="infoUser.nickname",placeholder="Enter nickname...")
  //- el-form-item(label="头像",prop="avatar")
  //-   el-input(v-model="infoUser.avatar",placeholder="Enter avatar...")
  el-form-item(label="介绍",prop="introduction")
    el-input(v-model="infoUser.introduction",placeholder="Enter introduction...")
  el-form-item(label="邮箱",prop="email")
    el-input(v-model="infoUser.email",placeholder="Enter Email...")
  el-form-item(label="钉钉 hook",prop="dingWebHook")
    el-input(v-model="infoUser.dingWebHook",placeholder="Enter dingWebHook...")

  el-form-item
    el-button(@click="handleUserInfo('userInfoForm')",type="primary",class="submit-btn") 修改

</template>

<script lang="ts">
import { getCurrentInstance } from 'vue';
import { useStore } from 'vuex';
// 仅限在当前组件使用
export default {
  props: {
    infoUser: {
      type: Object,
      required: true,
    },
    infoRules: {
      type: Object,
      required: true,
    },
  },
  setup(props: any) {
    const store = useStore();
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const { ctx } = getCurrentInstance();

    const handleUserInfo = (formName: string) => {
      // eslint-disable-next-line consistent-return
      ctx.$refs[formName].validate((valid: boolean) => {
        if (valid) {
          store.dispatch('user/modifyInfo', props.infoUser).then(() => {
            console.log('success');
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    };

    return { handleUserInfo };
  },
};
</script>

<style lang="scss" scoped>
.userInfoForm {
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
