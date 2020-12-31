<!--
 * @Version: 0.0.1
 * @Author: ider
 * @Date: 2020-12-29 13:26:16
 * @LastEditors: ider
 * @LastEditTime: 2020-12-31 11:32:49
 * @Description:双色球,开奖信息
-->
<template>
  <div class="container">
    <el-row>
      <div class="h1">
        双色球抽奖历史
      </div>
    </el-row>
    <!-- 未开奖 -->
    <el-row>
      <div class="title">
        未开奖 <el-divider direction="vertical" />
      </div>
    </el-row>
    <el-row>
      <el-table
        :data="unopenTicks"
        border
        style="width: 100%"
      >
        <el-table-column
          fixed
          prop="qihao"
          label="期号"
        />
        <el-table-column
          label="红球"
          min-width="160px"
        >
          <template #default="scope">
            <el-tag
              v-for="(ball,index) of scope.row.redball"
              :key="index"
              effect="dark"
              type="danger"
            >
              {{ FormatNumber(ball) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="蓝球"
        >
          <template #default="scope">
            <el-tag
              v-for="(ball,index) of scope.row.blueball"
              :key="index"
              effect="dark"
            >
              {{ FormatNumber(ball) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="注数"
          prop="count"
        />
        <el-table-column
          label="更新时间"
        >
          <template #default="scope">
            <el-popover
              effect="light"
              trigger="hover"
              placement="top"
            >
              <template #default>
                <p>备注: {{ scope.row.comment }}</p>
              </template>
              <template #reference>
                <div class="name-wrapper">
                  <el-tag size="medium">
                    {{ scope.row.date }}
                  </el-tag>
                </div>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="50px"
        >
          <template #default="scope">
            <el-button
              type="text"
              size="small"
              @click="tickSelects.splice(scope.$index, 1)"
            >
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <el-col>
        <el-pagination
          hide-on-single-page
          background
          layout="prev, pager, next"
          :total="1000"
        />
      </el-col>
    </el-row>
    <!-- 已中奖 -->
    <el-row>
      <div class="title">
        中奖历史
        <el-divider direction="vertical" />
      </div>
    </el-row>
    <el-row>
      <el-table
        :data="awardTicks"
        border
        style="width: 100%"
      >
        <el-table-column
          fixed
          prop="qihao"
          label="期号"
        />
        <el-table-column
          label="红球"
          min-width="160px"
        >
          <template #default="scope">
            <el-tag
              v-for="(ball,index) of scope.row.redball"
              :key="index"
              effect="dark"
              type="danger"
            >
              {{ FormatNumber(ball) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="蓝球"
        >
          <template #default="scope">
            <el-tag
              v-for="(ball,index) of scope.row.blueball"
              :key="index"
              effect="dark"
            >
              {{ FormatNumber(ball) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="中奖情况"
        >
          <template #default="scope">
            <span>
              {{ RanderAwardSSQ(scope.row).join(',') }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="注数"
          prop="count"
        />
        <el-table-column
          label="更新时间"
        >
          <template #default="scope">
            <el-popover
              effect="light"
              trigger="hover"
              placement="top"
            >
              <template #default>
                <p>备注: {{ scope.row.comment }}</p>
              </template>
              <template #reference>
                <div class="name-wrapper">
                  <el-tag size="medium">
                    {{ scope.row.date }}
                  </el-tag>
                </div>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="50px"
        >
          <template #default="scope">
            <el-button
              type="text"
              size="small"
              @click="tickSelects.splice(scope.$index, 1)"
            >
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <el-col>
        <el-pagination
          hide-on-single-page
          background
          layout="prev, pager, next"
          :total="1000"
        />
      </el-col>
    </el-row>
    <!-- 未中奖 -->
    <el-row>
      <div class="title">
        未中奖
        <el-divider direction="vertical" />
      </div>
    </el-row>
    <el-row>
      <el-table
        :data="unAwardTicks"
        border
        style="width: 100%"
      >
        <el-table-column
          fixed
          prop="qihao"
          label="期号"
        />
        <el-table-column
          label="红球"
          min-width="160px"
        >
          <template #default="scope">
            <el-tag
              v-for="(ball,index) of scope.row.redball"
              :key="index"
              effect="dark"
              type="danger"
            >
              {{ FormatNumber(ball) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="蓝球"
        >
          <template #default="scope">
            <el-tag
              v-for="(ball,index) of scope.row.blueball"
              :key="index"
              effect="dark"
            >
              {{ FormatNumber(ball) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="注数"
          prop="count"
        />
        <el-table-column
          label="更新时间"
        >
          <template #default="scope">
            <el-popover
              effect="light"
              trigger="hover"
              placement="top"
            >
              <template #default>
                <p>备注: {{ scope.row.comment }}</p>
              </template>
              <template #reference>
                <div class="name-wrapper">
                  <el-tag size="medium">
                    {{ scope.row.date }}
                  </el-tag>
                </div>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="50px"
        >
          <template #default="scope">
            <el-button
              type="text"
              size="small"
              @click="tickSelects.splice(scope.$index, 1)"
            >
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <el-col>
        <el-pagination
          hide-on-single-page
          background
          layout="prev, pager, next"
          :total="1000"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import {
  reactive, toRefs, onMounted,
} from 'vue';
import { FormatNumber, RanderAwardSSQ } from '@/util/calcuate';
// import { ElMessage } from 'element-plus';
import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';

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
export interface TicksData {
    qihao: string;
    date: string;
    redball: number[];
    blueball: number[];
    count: number;
    open: boolean;
    comment: string;
    A: number;
    B: number;
    C: number;
    D: number;
    E: number;
    F: number;
}

export interface SelectOpt {
    label: string;
    value: string;
}

export default {
  name: 'DoubleBall',
  setup() {
    // 未开奖
    const unopenTicksDefault: TicksData[] = [];
    // 中奖
    const awardTicksDefault: TicksData[] = [];
    // 未中奖
    const unAwardTicksDefault: TicksData[] = [];
    const data = reactive({
      // 开奖信息
      unopenTicks: unopenTicksDefault,
      awardTicks: awardTicksDefault,
      unAwardTicks: unAwardTicksDefault,
      unopenTicksPage: 0,
      awardTicksPage: 0,
      unAwardPage: 0,
    });

    onMounted(() => {
      // updateQiHaoOption();
    });

    return {
      ...toRefs(data), FormatNumber, RanderAwardSSQ,
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
</style>
