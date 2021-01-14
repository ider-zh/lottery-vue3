<!--
 * @Version: 0.0.1
 * @Author: ider
 * @Date: 2021-01-13 15:36:42
 * @LastEditors: ider
 * @LastEditTime: 2021-01-14 10:40:25
 * @Description:
-->
<!--
 * @Version: 0.0.1
 * @Author: ider
 * @Date: 2020-12-28 13:36:42
 * @LastEditors: ider
 * @LastEditTime: 2021-01-13 15:50:39
 * @Description:
-->
<template lang="pug">
el-row(justify="center",type="flex")
  .signin-signup
    h1 修改用户信息
    UserInfoForm(:infoUser="infoStoreUser",:infoRules="infoRules")

</template>

<script lang="ts">

import { reactive, toRefs, onMounted } from 'vue';
import UserInfoForm from '@/components/UserInfoForm.vue';
import {
  email, nickname, avatar, introduction, dingWebHook,
} from '@/util/userStore';
import { infoStoreUser, infoRules } from '@/util/userInfoValidators';

export default {
  name: 'ModifyUserInfo',
  components: {
    UserInfoForm,
  },
  setup() {
    const data = reactive({
      cc: 123,
    });
    onMounted(() => {
      console.log(infoStoreUser);
      console.log('nickname', nickname);
    });
    return {
      ...toRefs(data), email, nickname, avatar, introduction, dingWebHook, infoRules, infoStoreUser,
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
