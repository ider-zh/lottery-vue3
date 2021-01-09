<!--
 * @Version: 0.0.1
 * @Author: ider
 * @Date: 2020-12-28 14:13:34
 * @LastEditors: ider
 * @LastEditTime: 2021-01-06 00:18:32
 * @Description:
-->
<template  lang="pug">
.not-found
  img(src="../assets/404.gif",alt="404")
</template>

<script lang="ts">
export default {
  name: '404',
  components: {
    // DoubleBall,
  },
  setup() {
    // todo
  },
};
</script>

<style lang="scss" scope>
.not-found {
  width: 100%;
  height: 100%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    }
}
</style>
