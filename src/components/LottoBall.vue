<!--
 * @Version: 0.0.1
 * @Author: ider
 * @Date: 2020-12-27 23:02:15
 * @LastEditors: ider
 * @LastEditTime: 2020-12-28 01:10:05
 * @Description: 乐透型彩票,红球还是蓝球
-->

<template>
  <div class="hello">
    <el-checkbox-group v-model="selectBalls">
      <el-checkbox-button v-for="num in balls" :label="num" :key="num">{{num}}</el-checkbox-button>
    </el-checkbox-group>
  </div>
</template>

<script lang="ts">

import { computed } from 'vue';

export default {
  name: 'LottoBall',
  props: {
    count: {
      type: Number,
    },
    boolType: {
      type: String,
    },
  },
  data() {
    return {
      selectBalls: [],
    };
  },
  computed: {
    balls: computed(() => this.lodash.range(1, Number(this.count) + 1)),
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

.el-checkbox-button{
  margin-left: 4px;
  padding-left: 4px;
  text-align: center;

  // border-radius: 200%;
  .el-checkbox-button__inner {
    border: 1px solid #DCDFE6;
    border-radius: 50% !important;
    width: 50px;
    height: 50px;
  }

}

// .el-checkbox-button__inner{
// }

</style>
