<!--
 * @Version: 0.0.1
 * @Author: ider
 * @Date: 2020-12-29 13:26:16
 * @LastEditors: ider
 * @LastEditTime: 2021-01-11 00:56:00
 * @Description:双色球,开奖信息
-->
<template lang="pug">
.container
  el-row
    .h1 双色球抽奖历史
  el-row
    .title 长期跟踪
      el-divider(direction="vertical")
  el-row
    el-table(:data="foreverTicksOption.data",border,style="width: 100%")
      el-table-column(min-width="160px",label="红球")
        template(#default="scope")
          li.ball.red(v-for="(ball,index) of scope.row.redball",:key="index") {{ FormatNumber(ball) }}
      el-table-column(label="蓝球")
        template(#default="scope")
          li.ball.blue(v-for="(ball,index) of scope.row.blueball",:key="index") {{ FormatNumber(ball) }}
      el-table-column(label="注数",width="60px",align="center")
          template(#default="scope")
            span {{Combine(scope.row.redball.length, 6) * scope.row.blueball.length}}
      el-table-column(prop="last",label="跟投",width="60px",align="center")
          template(#default="scope")
            span {{ scope.row.last > 1000?"长期":scope.row.last}}
      el-table-column(label="更新时间/备注",align="center")
        template(#default="scope")
          el-popover(effect="light",trigger="hover",placement="top")
            template(#default)
              p 备注: {{ scope.row.comment }}
            template(#reference)
              .name-wrapper
                el-tag(size="medium") {{ scope.row.createdAt }}
      el-table-column(fixed="right",width="90px",label="操作",align="center")
        template(#default="scope")
          el-row
            el-button(type="text",size="small",@click="ForeverBetsDelete(foreverTicksOption.data,scope.$index)") 移除
            el-button(type="text",size="small",@click="checkHistory(scope.row)") 历史

  el-row
    el-col
      el-pagination(hide-on-single-page,background,layout="prev, pager, next",:page-size="foreverTicksOption.pageSize",
      :total="foreverTicksOption.total",:current-page="foreverTicksOption.page",@current-change="syncForeverBets")

  //- 单期投注
  el-row
    .title 未开奖单期投注
      el-divider(direction="vertical")
  el-row
    el-table(:data="unOpenTicksOption.data",border,style="width: 100%")
      el-table-column(prop="qihao",label="期号")
      el-table-column(min-width="160px",label="红球")
        template(#default="scope")
          li.ball.red(v-for="(ball,index) of scope.row.redball",:key="index") {{ FormatNumber(ball) }}
      el-table-column(label="蓝球")
        template(#default="scope")
          li.ball.blue(v-for="(ball,index) of scope.row.blueball",:key="index") {{ FormatNumber(ball) }}
      el-table-column(label="注数",width="60px",align="center")
          template(#default="scope")
            span {{Combine(scope.row.redball.length, 6) * scope.row.blueball.length}}
      el-table-column(label="更新时间/备注",align="center")
        template(#default="scope")
          el-popover(effect="light",trigger="hover",placement="top")
            template(#default)
              p 备注: {{ scope.row.comment }}
            template(#reference)
              .name-wrapper
                el-tag(size="medium") {{ scope.row.createdAt }}
      el-table-column(fixed="right",width="90px",label="操作",align="center")
        template(#default="scope")
          el-row
            el-button(type="text",size="small",@click="BetsDelete(unOpenTicksOption.data,scope.$index)") 移除
            el-button(type="text",size="small",@click="checkHistory(scope.row)") 历史
  el-row
    el-col
      el-pagination(hide-on-single-page,background,layout="prev, pager, next",:page-size="unOpenTicksOption.pageSize",
      :total="unOpenTicksOption.total",:current-page="unOpenTicksOption.page",@current-change="(val)=>{syncBets(0, val, unOpenTicksOption)}")

  //- 历史中奖投注
  el-row
    .title 中奖期数
      el-divider(direction="vertical")
  el-row
    el-table(:data="awardTicksOption.data",border,style="width: 100%")
      el-table-column(prop="qihao",label="期号")
      el-table-column(min-width="160px",label="红球")
        template(#default="scope")
          li.ball.red(v-for="(ball,index) of scope.row.redball",:key="index") {{ FormatNumber(ball) }}
      el-table-column(label="蓝球")
        template(#default="scope")
          li.ball.blue(v-for="(ball,index) of scope.row.blueball",:key="index") {{ FormatNumber(ball) }}
      el-table-column(label="注数",width="60px",align="center")
          template(#default="scope")
            span {{Combine(scope.row.redball.length, 6) * scope.row.blueball.length}}
      el-table-column(prop="award",label="中奖情况")
      el-table-column(label="更新时间/备注",align="center")
        template(#default="scope")
          el-popover(effect="light",trigger="hover",placement="top")
            template(#default)
              p 备注: {{ scope.row.comment }}
            template(#reference)
              .name-wrapper
                el-tag(size="medium") {{ scope.row.createdAt }}
      el-table-column(fixed="right",width="90px",label="操作",align="center")
        template(#default="scope")
          el-row
            el-button(type="text",size="small",@click="BetsDelete(awardTicksOption.data,scope.$index)") 移除
            el-button(type="text",size="small",@click="checkHistory(scope.row)") 历史
  el-row
    el-col
      el-pagination(hide-on-single-page,background,layout="prev, pager, next",:page-size="awardTicksOption.pageSize",
      :total="awardTicksOption.total",:current-page="awardTicksOption.page",@current-change="(val)=>{syncBets(1, val, awardTicksOption)}")

  //- 历史中奖投注
  el-row
    .title 未中奖期数
      el-divider(direction="vertical")
  el-row
    el-table(:data="unAwardTicksOption.data",border,style="width: 100%")
      el-table-column(prop="qihao",label="期号")
      el-table-column(min-width="160px",label="红球")
        template(#default="scope")
          li.ball.red(v-for="(ball,index) of scope.row.redball",:key="index") {{ FormatNumber(ball) }}
      el-table-column(label="蓝球")
        template(#default="scope")
          li.ball.blue(v-for="(ball,index) of scope.row.blueball",:key="index") {{ FormatNumber(ball) }}
      el-table-column(label="注数",width="60px",align="center")
          template(#default="scope")
            span {{Combine(scope.row.redball.length, 6) * scope.row.blueball.length}}
      el-table-column(label="更新时间/备注",align="center")
        template(#default="scope")
          el-popover(effect="light",trigger="hover",placement="top")
            template(#default)
              p 备注: {{ scope.row.comment }}
            template(#reference)
              .name-wrapper
                el-tag(size="medium") {{ scope.row.createdAt }}
      el-table-column(fixed="right",width="90px",label="操作",align="center")
        template(#default="scope")
          el-row
            el-button(type="text",size="small",@click="BetsDelete(unAwardTicksOption.data,scope.$index)") 移除
            el-button(type="text",size="small",@click="checkHistory(scope.row)") 历史
  el-row
    el-col
      el-pagination(hide-on-single-page,background,layout="prev, pager, next",:page-size="unAwardTicksOption.pageSize",
      :total="unAwardTicksOption.total",:current-page="unAwardTicksOption.page",@current-change="(val)=>{syncBets(2, val, unAwardTicksOption)}")

  el-dialog(v-model="dialogHistoryVisible",title="历史中奖")
    LotterySsqAward(:redball="checkredball",:blueball="checkblueball")

</template>

<script lang="ts">
import {
  reactive, toRefs, onMounted,
} from 'vue';
import { FormatNumber, RanderAwardSSQ, Combine } from '@/util/calcuate';
// import { ElMessage } from 'element-plus';
import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import {
  getUserForeverBets, deleteUserForeverBets, getUserBets, deleteUserBets,
} from '@/api/ssq';
import { ElMessage, ElMessageBox } from 'element-plus';
import LotterySsqAward from '@/components/LotterySsqAward.vue';

dayjs.extend(dayOfYear);

export interface WinnerData {
    title: string;
    data: string[];
}

export interface TickSelect {
    redball: number[];
    blueball: number[];
    count: number;
}

// 服务器返回的数据
export interface ForeverTicksData {
    id: number;
    redball: number[];
    blueball: number[];
    last: number;
    comment: string;
    createdAt: string;
}

// 服务器返回的数据
export interface TicksData {
    qihao: string;
    createdAt: string;
    redball: number[];
    blueball: number[];
    isOpen: boolean;
    isBot: boolean;
    comment: string;
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
    award: string;
}

export interface SelectOpt {
    label: string;
    value: string;
}

const PAGESIZE = 15;

export default {
  name: 'DoubleBall',
  components: {
    LotterySsqAward,
  },
  setup() {
    // 长期跟踪
    const foreverTicksdefault: ForeverTicksData[] = [];
    // 未开奖
    const unoOenTicksDefault: TicksData[] = [];
    // 中奖
    const awardTicksDefault: TicksData[] = [];
    // 未中奖
    const unAwardTicksDefault: TicksData[] = [];
    const data = reactive({
      dialogHistoryVisible: false,
      checkredball: [],
      checkblueball: [],
      // 开奖信息
      foreverTicksOption: {
        data: foreverTicksdefault,
        page: 1,
        pageSize: PAGESIZE,
        pageCount: 1,
        total: 10,
      },
      unOpenTicksOption: {
        data: unoOenTicksDefault,
        page: 1,
        pageSize: PAGESIZE,
        pageCount: 1,
        total: 10,
      },
      awardTicksOption: {
        data: awardTicksDefault,
        page: 1,
        pageSize: PAGESIZE,
        pageCount: 1,
        total: 10,
      },
      unAwardTicksOption: {
        data: unAwardTicksDefault,
        page: 1,
        pageSize: PAGESIZE,
        pageCount: 1,
        total: 10,
      },
    });

    // 进行历史查询
    function checkHistory(ticks: Record<string, any>) {
      data.checkredball = ticks.redball.map((item: string) => Number(item));
      data.checkblueball = ticks.blueball.map((item: string) => Number(item));
      console.log(data.checkredball, data.checkblueball);
      data.dialogHistoryVisible = !data.dialogHistoryVisible;
    }

    // 同步长期投注
    function syncForeverBets(currentPage = 1) {
      data.foreverTicksOption.page = currentPage;
      const opt = {
        page: data.foreverTicksOption.page,
        pageSize: data.foreverTicksOption.pageSize,
      };
      getUserForeverBets(opt).then((res) => {
        data.foreverTicksOption.pageCount = res.data.pageCount;
        data.foreverTicksOption.total = res.data.total;
        // 清空length
        data.foreverTicksOption.data.splice(0, data.foreverTicksOption.data.length);
        console.log(data.foreverTicksOption.data.length);
        data.foreverTicksOption.data.push(...res.data.data.map((item: any) => ({
          id: item.id,
          redball: item.redball.split(' '),
          blueball: item.blueball.split(' '),
          last: item.last,
          comment: item.comment,
          createdAt: dayjs(item.createdAt).locale('zh-cn').format('YYYY-MM-DD'),
        })));
      });
    }

    function ForeverBetsDelete(datalist: Array<Record<string, any>>, index: number) {
      ElMessageBox.confirm('确定删除这条记录吗?', '删除记录', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        deleteUserForeverBets({
          id: datalist[index].id,
        }).then(() => {
          datalist.splice(index, 1);
          ElMessage.success({
            message: '移除成功',
            type: 'success',
          });
        }).catch((error) => {
          ElMessage.error({
            message: `移除失败:${error}`,
            type: 'error',
          });
        });
      });
    }

    function BetsDelete(datalist: Array<Record<string, any>>, index: number) {
      ElMessageBox.confirm('确定删除这条记录吗?', '删除记录', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        deleteUserBets({
          id: datalist[index].id,
        }).then(() => {
          datalist.splice(index, 1);
          ElMessage.success({
            message: '移除成功',
            type: 'success',
          });
        }).catch((error) => {
          ElMessage.error({
            message: `移除失败:${error}`,
            type: 'error',
          });
        });
      });
    }

    // 同步投注信息
    function syncBets(mode = 0, currentPage = 1, dataObj: Record<string, any>) {
      // eslint-disable-next-line no-param-reassign
      dataObj.page = currentPage;
      const opt = {
        mode,
        page: dataObj.page,
        pageSize: dataObj.pageSize,
      };
      getUserBets(opt).then((res) => {
        // eslint-disable-next-line no-param-reassign
        dataObj.pageCount = res.data.pageCount;
        // eslint-disable-next-line no-param-reassign
        dataObj.total = res.data.total;
        // 清空length
        dataObj.data.splice(0, dataObj.data.length);
        console.log(dataObj.data.length);
        dataObj.data.push(...res.data.data.map((item: any) => ({
          id: item.id,
          qihao: `20${item.qihao}`,
          redball: item.redball.split(' '),
          blueball: item.blueball.split(' '),
          isbot: item.isBot,
          award: item.award,
          comment: item.comment,
          createdAt: dayjs(item.createdAt).locale('zh-cn').format('YYYY-MM-DD'),
        })));
      });
    }

    onMounted(() => {
      // updateQiHaoOption();
      syncForeverBets();
      syncBets(0, 1, data.unOpenTicksOption);
      syncBets(1, 1, data.awardTicksOption);
      syncBets(2, 1, data.unAwardTicksOption);
    });

    return {
      ...toRefs(data), FormatNumber, RanderAwardSSQ, syncForeverBets, ForeverBetsDelete, Combine, BetsDelete, syncBets, checkHistory,
    };
  },
};
</script>

<style lang="scss" scoped>
.h1 {
      display: block;
    font-size: 2em;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
}
.title {
  margin-top:2em;
  font-size: 1.25rem;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.el-pagination {
  margin-top:0.5em;
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
