<!--
 * @Version: 0.0.1
 * @Author: ider
 * @Date: 2020-12-27 23:02:15
 * @LastEditors: ider
 * @LastEditTime: 2020-12-31 11:14:23
 * @Description: 乐透型彩票,红球还是蓝球
-->

<template>
  <div class="ball-list">
    <ul>
      <li
        v-for="({num,active},index) of balls"
        :key="num"
        :label="num"
        @click="clickNumber(index);"
      >
        <el-button
          v-if="boolType==='blue'"
          plain
          circle
          :class="{
            'blue-ball':!active,
            'blue-ball-active':active,
          }"
        >
          {{ FormatNumber(num) }}
        </el-button>
        <el-button
          v-else
          circle
          :class="{
            'red-ball':!active,
            'red-ball-active':active,
          }"
        >
          {{ FormatNumber(num) }}
        </el-button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">

import {
  reactive, toRefs, watch,
} from 'vue';
import _ from 'lodash';
import { FormatNumber } from '@/util/calcuate';

export default {
  name: 'LottoBall',
  props: {
    modelValue: {
      type: [Array],
      default: () => undefined,
    },
    count: {
      type: Number,
      default: 0,
    },
    boolType: {
      type: String,
      default: 'red',
    },
  },
  emits: ['update:modelValue'],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props: any, context: any) {
    const numberArray: number[] = [];
    const data = reactive({
      selectBalls: numberArray,
      balls: _.range(1, Number(props.count) + 1).map((item) => ({
        num: item,
        active: false,
      })),
    });

    watch(() => props.modelValue, (newdata) => {
      // 只负责清空，没有完全相关联
      if (newdata.length === 0) {
        console.log(data.balls.length);
        for (let index = 0; index < data.balls.length; index += 1) {
          data.balls[index].active = false;
        }
        data.selectBalls = [];
      }
    });

    function clickNumber(index: number) {
      const val: number = data.balls[index].num;
      if (data.selectBalls.includes(val)) {
        data.selectBalls = _.without(data.selectBalls, val);
      } else {
        data.selectBalls.push(val);
        data.selectBalls = data.selectBalls.slice();
      }
      data.balls[index].active = !data.balls[index].active;
      context.emit('update:modelValue', data.selectBalls);
    }
    return {
      ...toRefs(data), FormatNumber, clickNumber,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.ball-list {
  display:flex;
  ul{
    li {
      display: inline-block;
      margin: 5px;
      span {
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-radius: 50%;
        display: block;
        margin: 3px auto;
        font-size: 16px;
        font-weight: 700;
        cursor: pointer;
        border: 2px solid #e5e5e5;
      }

      .blue-ball {
        color: #4493eb;
      }

      .blue-ball-active {
        color: #fff;
        background: #4493eb;
      }
      .red-ball {
        color: #e23a3a;
      }
      .red-ball-active {
        color: #fff;
         background: #e23a3a;
      }
    }
  }
}

</style>
