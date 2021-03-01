<!--
 * @Version: 0.0.1
 * @Author: ider
 * @Date: 2020-12-29 13:26:16
 * @LastEditors: ider
 * @LastEditTime: 2021-01-13 16:59:03
 * @Description:双色球，选号机器
-->
<template  lang="pug">
.container
  .h1
    span 双色球选号工具
  .red-ball.title
    span 红球区--- 至少选6个
  LottoBall(v-model="redballs",:count="33",bool-type="red")
  .blue-ball.title
    span 蓝球区--- 至少选1个
  LottoBall(v-model="blueballs",:count="16",bool-type="blue")
  el-divider
    //- <!-- 按钮区， 测试， 单期， 长期 -->
  el-row(justify="center",type="flex")
    span 您当前选了
      em(style="color:red;") {{ redballs.length }}
      span 个红球
      em(style="color:blue;") {{ blueballs.length }}
      span 个蓝球, 共
      em(style="color:green;") {{ Combine(redballs.length, 6) * blueballs.length }}
      span 注

      el-button(type="text",style="margin-left:1em;",@click="redballs=[];blueballs=[]") 清空上方选号
  el-row(justify="center",type="flex")
    el-button(type="primary",:disabled="buttonLevel1Status",@click="getWinner") 查 询
    el-button(type="primary",:disabled="buttonLevel1Status",@click="selectTick",v-if="token!=undefined&&token.length>0") 选好了
  el-collapse-transition
    .title(v-show="tickSelects.length>0")
      span 清 单
  el-collapse-transition
    el-table(v-show="tickSelects.length>0",:data="tickSelects",stripe,style="width: 100%")
      el-table-column(label="红球",min-width="160px")
        template(#default="scope")
          li.ball.red(v-for="(ball,index) of scope.row.redBall",:key="index") {{ FormatNumber(ball) }}
      el-table-column(label="蓝球")
        template(#default="scope")
          li.ball.blue(v-for="(ball,index) of scope.row.blueBall",:key="index") {{ FormatNumber(ball) }}
      el-table-column(label="注数",prop="count")
      el-table-column(label="操作",fixed="right",width="50px")
        template(#default="scope")
          el-button(type="text",size="small",@click="tickSelects.splice(scope.$index, 1)") 移 除
  el-collapse-transition
    el-row(v-show="tickSelects.length>0",justify="center",type="flex")
      el-button(type="primary",@click="dialogQiHaoVisible = !dialogQiHaoVisible") 下 注

  .title
    span 中奖详情

  LotterySsqAward(:redball="checkredball",:blueball="checkblueball")
    //- <!-- 期号选择 对话框 -->
  el-dialog(v-model="dialogQiHaoVisible",title="确认项目")
    el-form
      el-form-item(label="期号选择:")
        el-select(v-model="qihaoSelect",placeholder="请选择")
          el-option(v-for="item in qihaoOption",:key="item.value",:label="item.label",:value="item.value")

      el-form-item(label="备注信息:")
        el-input(v-model="comment",type="textarea")

    template(#footer)
      span.dialog-footer
        el-button(@click="dialogQiHaoVisible = false")  取 消
        el-button(type="primary",@click="ssqBet")  确 定
</template>

<script lang="ts">
import {
  reactive, toRefs, watch, onMounted,
} from 'vue';
import LottoBall from '@/components/LottoBall.vue';
import LotterySsqAward from '@/components/LotterySsqAward.vue';
import { token } from '@/util/userStore';
import { Combine, FormatNumber } from '@/util/calcuate';
import { ElMessage } from 'element-plus';
import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';

import { getLatest, userBet } from '@/api/ssq';

dayjs.extend(dayOfYear);

export interface TickSelect {
    redBall: number[];
    blueBall: number[];
    count: number;
}

export interface SelectOpt {
    label: string;
    value: string;
}

export default {
  name: 'DoubleBall',
  components: {
    LottoBall,
    LotterySsqAward,
  },
  setup() {
    const tickSelectsDefault: TickSelect[] = [];
    const qihaoSelectsDefault: SelectOpt[] = [];
    const data = reactive({
      buttonLevel1Status: true,
      redballs: [],
      blueballs: [],
      checkredball: [],
      checkblueball: [],
      dialogQiHaoVisible: false,
      tickSelects: tickSelectsDefault,
      qihaoSelect: '',
      qihaoOption: qihaoSelectsDefault,
      comment: '',
    });

    const checkButton = () => {
      // 只负责清空，没有完全相关联
      if (data.redballs.length >= 6 && data.blueballs.length >= 1) {
        console.log(false);
        data.buttonLevel1Status = false;
      } else {
        console.log(true);
        data.buttonLevel1Status = true;
      }
    };
    // 按键 disabled
    watch([() => data.redballs, () => data.blueballs], checkButton);

    // 中奖情况查询
    function getWinner() {
      data.checkredball = data.redballs;
      data.checkblueball = data.blueballs;
    }

    // 加入选择池
    function selectTick() {
      const tick: TickSelect = {
        redBall: data.redballs.sort(),
        blueBall: data.blueballs.sort(),
        count: Combine(data.redballs.length, 6) * data.blueballs.length,
      };
      data.redballs = [];
      data.blueballs = [];
      data.tickSelects.push(tick);
    }

    // 更新 ssq 期号数据
    async function updateQiHaoOption() {
      // todo get last qihao

      const response = await getLatest();

      console.log(response.data);
      const { qihao } = response.data;
      // todo test
      data.qihaoSelect = qihao;
      data.qihaoOption.push({
        value: qihao,
        label: `20${qihao}`,
      });
      //   添加后2期
      data.qihaoOption.unshift({
        value: String(Number(data.qihaoOption[0].value) + 1),
        label: String(Number(data.qihaoOption[0].label) + 1),
      });
      data.qihaoOption.unshift({
        value: String(Number(data.qihaoOption[0].value) + 1),
        label: String(Number(data.qihaoOption[0].label) + 1),
      });
      // 长期
      data.qihaoOption.unshift({
        value: 'forever',
        label: '长期跟踪',
      }, {
        value: 'forever-3',
        label: '跟踪3期',
      }, {
        value: 'forever-12',
        label: '跟踪12期',
      }, {
        value: 'forever-244',
        label: '跟踪244期',
      });
      //   判断是否加入新一年的期号
      if (dayjs().dayOfYear() > 363) {
        data.qihaoOption.unshift({
          value: `${String(dayjs().year() % 100)}001`,
          label: `${String(dayjs().year())}001`,
        });
      }
    }

    // 投注
    async function ssqBet() {
      try {
        const response = await userBet({
          qihao: data.qihaoSelect,
          comment: data.comment,
          bets: data.tickSelects,
        });
        console.log(response.data);
        data.dialogQiHaoVisible = false;
        data.tickSelects.splice(0, data.tickSelects.length);
        ElMessage.success({
          message: '恭喜你，成功下注',
          type: 'success',
        });
      } catch (error) {
        data.dialogQiHaoVisible = false;
        ElMessage.error({
          message: '下注失败',
          type: 'error',
        });
      }
    }

    onMounted(() => {
      updateQiHaoOption();
    });

    function clickFun() {
      console.log(data.redballs);
      console.log(data.blueballs);
    }
    return {
      ...toRefs(data), clickFun, getWinner, selectTick, FormatNumber, token, Combine, ssqBet,
    };
  },
};
</script>

<style lang="scss" scoped>
.text {
    text-align: left;
}
.title {
    margin-top: 1em;
    text-align: left;
    height:2em;
    margin-bottom: 1em;
    padding:1em 0 0 1em;
}
.red-ball {
    background: linear-gradient(to right, #e23a3a,#fff);
    color: #fff;
}

.blue-ball {
    background: linear-gradient(to right, #4493eb,#fff);
    color: #fff;
}

.h1 {
  font-size:large;
  font-weight: 400;
  color: #1f2f3d;
}

span em {
  margin: 0 0.3em
}

li.ball {
  width: 2.1em;
  height: 2.1em;
  line-height: 2.1em;
  margin: 0 2px;
  text-align: center;
  border-radius: 50%;
  display: inline-block;
}
.red{
  color:#fe4245;
  border-width:2px;
  border-style:solid;
  border-color: #fe4245;
}
.blue {
    color:#5b85fe;
  border-width:2px;
  border-style:solid;
  border-color: #5b85fe;
}
</style>
