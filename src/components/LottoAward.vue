<!--
 * @Version: 0.0.1
 * @Author: ider
 * @Date: 2021-01-10 23:13:41
 * @LastEditors: ider
 * @LastEditTime: 2021-03-02 01:22:44
 * @Description:大乐透历史中奖情况
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

import { checkAward } from '@/api/lotto';

export interface WinnerData {
    title: string;
    data: string[];
}

export default {
  name: 'LottoAward',
  props: {
    front: {
      type: Array,
      default: () => [],
    },
    back: {
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
        front: props.front,
        back: props.back,
      }).then((response) => {
        if (response.data.data.length > 0) { data.winnerStatus = response.data.data; }
      });
    }

    // 更新数据
    watchEffect(() => {
      if (props.front.length >= 6 && props.back.length >= 1) { getWinner(); }
    });

    return { ...toRefs(data), getWinner };
  },
};
</script>
