<!--
 * @Version: 0.0.1
 * @Author: ider
 * @Date: 2021-01-10 23:13:41
 * @LastEditors: ider
 * @LastEditTime: 2021-01-11 00:53:54
 * @Description:双色球历史中奖情况
-->
<template lang="pug">
.container
  el-row(justify="start",type="flex")
    el-col
      el-collapse(accordion)
        el-collapse-item(v-for="({title,data},index) of winnerStatus",:key="index",:title="title + ' ( '+ data.length +' ) '")
          .text(v-for="(item,i) of data",:key="i") {{ item }}
</template>

<script lang="ts">

import {
  reactive, toRefs, watchEffect,
} from 'vue';

import { checkAward } from '@/api/ssq';

export interface WinnerData {
    title: string;
    data: string[];
}

export default {
  name: 'LottoSsqAward',
  props: {
    redball: {
      type: Array,
      default: () => [],
    },
    blueball: {
      type: Array,
      default: () => [],
    },
  },
  setup(props: any) {
    const winerTypeDefault: WinnerData[] = [{
      title: '今晚吃鸡',
      data: [],
    }];
    const data = reactive({
      winnerStatus: winerTypeDefault,
    });

    // 中奖情况查询
    function getWinner() {
      checkAward({
        redball: props.redball,
        blueball: props.blueball,
      }).then((response) => {
        if (response.data.data.length > 0) { data.winnerStatus = response.data.data; }
      });
    }

    // 更新数据
    watchEffect(() => {
      if (props.redball.length >= 6 && props.blueball.length >= 1) { getWinner(); }
    });

    return { ...toRefs(data), getWinner };
  },
};
</script>
