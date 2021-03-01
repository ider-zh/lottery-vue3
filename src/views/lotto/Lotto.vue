<!--
 * @Version: 0.0.1
 * @Author: ider
 * @Date: 2020-12-29 13:26:16
 * @LastEditors: ider
 * @LastEditTime: 2021-03-02 01:36:35
 * @Description:大乐透，选号机器
-->
<template lang="pug">
.container
  .h1
    span 大乐透选号工具
  .red-ball.title
    span 前区--- 至少选5个
  LottoBall(v-model="fronts",:count="35",bool-type="red")
  .blue-ball.title
    span 后区--- 至少选2个
  LottoBall(v-model="backs",:count="12",bool-type="blue")
  el-divider
    //- <!-- 按钮区， 测试， 单期， 长期 -->
  el-row(justify="center",type="flex")
    span 您当前选了
      em(style="color:red;") {{ fronts.length }}
      span 个前区
      em(style="color:blue;") {{ backs.length }}
      span 个后区, 共
      em(style="color:green;") {{ Combine(fronts.length, 5) * backs.length }}
      span 注

      el-button(type="text",style="margin-left:1em;",@click="fronts=[];backs=[]") 清空上方选号
  el-row(justify="center",type="flex")
    el-button(type="primary",:disabled="buttonLevel1Status",@click="getWinner") 查 询
    el-button(type="primary",:disabled="buttonLevel1Status",@click="selectTick",v-if="token!=undefined&&token.length>0") 选好了
  el-collapse-transition
    .title(v-show="tickSelects.length>0")
      span 清 单
  el-collapse-transition
    el-table(v-show="tickSelects.length>0",:data="tickSelects",stripe,style="width: 100%")
      el-table-column(label="前区",min-width="160px")
        template(#default="scope")
          li.ball.red(v-for="(ball,index) of scope.row.front",:key="index") {{ FormatNumber(ball) }}
      el-table-column(label="后区")
        template(#default="scope")
          li.ball.blue(v-for="(ball,index) of scope.row.back",:key="index") {{ FormatNumber(ball) }}
      el-table-column(label="注数",prop="count")
      el-table-column(label="操作",fixed="right",width="50px")
        template(#default="scope")
          el-button(type="text",size="small",@click="tickSelects.splice(scope.$index, 1)") 移 除
  el-collapse-transition
    el-row(v-show="tickSelects.length>0",justify="center",type="flex")
      el-button(type="primary",@click="dialogQiHaoVisible = !dialogQiHaoVisible") 下 注

  .title
    span 中奖详情

  LottoAward(:front="checkfrontball",:back="checkbackball")
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
import { useStore } from 'vuex';
import {
  reactive, toRefs, watch, onMounted, computed,
} from 'vue';
import LottoBall from '@/components/LottoBall.vue';
import LottoAward from '@/components/LottoAward.vue';

import { Combine, FormatNumber } from '@/util/calcuate';
import { ElMessage } from 'element-plus';
import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';

import { getLatest, userBet } from '@/api/lotto';

dayjs.extend(dayOfYear);

export interface TickSelect {
    front: number[];
    back: number[];
    count: number;
}

export interface SelectOpt {
    label: string;
    value: string;
}

export default {
  name: 'Lotto',
  components: {
    LottoBall,
    LottoAward,
  },
  setup() {
    const store = useStore();

    const token = computed(() => store.getters['user/token']);

    const tickSelectsDefault: TickSelect[] = [];
    const qihaoSelectsDefault: SelectOpt[] = [];
    const data = reactive({
      buttonLevel1Status: true,
      fronts: [],
      backs: [],
      checkfrontball: [],
      checkbackball: [],
      dialogQiHaoVisible: false,
      tickSelects: tickSelectsDefault,
      qihaoSelect: '',
      qihaoOption: qihaoSelectsDefault,
      comment: '',
    });

    const checkButton = () => {
      // 只负责清空，没有完全相关联
      if (data.fronts.length >= 5 && data.backs.length >= 2) {
        console.log(false);
        data.buttonLevel1Status = false;
      } else {
        console.log(true);
        data.buttonLevel1Status = true;
      }
    };
    // 按键 disabled
    watch([() => data.fronts, () => data.backs], checkButton);

    // 中奖情况查询
    function getWinner() {
      data.checkfrontball = data.fronts;
      data.checkbackball = data.backs;
    }

    // 加入选择池
    function selectTick() {
      const tick: TickSelect = {
        front: data.fronts.sort(),
        back: data.backs.sort(),
        count: Combine(data.fronts.length, 6) * data.backs.length,
      };
      data.fronts = [];
      data.backs = [];
      data.tickSelects.push(tick);
    }

    // 更新 ssq 期号数据
    async function updateDrawNumOption() {
      // todo get last qihao

      const response = await getLatest();

      console.log(response.data);
      const { drawnum } = response.data;
      // todo test
      data.qihaoSelect = String(Number(drawnum) + 1);
      data.qihaoOption.push({
        value: String(Number(drawnum) + 1),
        label: String(Number(drawnum) + 1),
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
          drawnum: data.qihaoSelect,
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
      updateDrawNumOption();
    });

    function clickFun() {
      console.log(data.fronts);
      console.log(data.backs);
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
