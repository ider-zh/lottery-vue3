<!--
 * @Version: 0.0.1
 * @Author: ider
 * @Date: 2020-12-29 13:26:16
 * @LastEditors: ider
 * @LastEditTime: 2020-12-31 11:13:40
 * @Description:双色球，选号机器
-->
<template>
  <div class="container">
    <div class="h1">
      <span>双色球选号工具</span>
    </div>
    <div class="red-ball title">
      <span>红球区--- 至少选6个</span>
    </div>
    <LottoBall
      v-model="redballs"
      :count="11"
      bool-type="red"
    />
    <div class="blue-ball title">
      <span>蓝球区--- 至少选1个</span>
    </div>
    <LottoBall
      v-model="blueballs"
      :count="3"
      bool-type="blue"
    />
    <el-divider />
    <!-- 按钮区， 测试， 单期， 长期 -->
    <div>
      <span>您当前选了 <em style="color:red;">{{ redballs.length }}</em> 个红球 <em style="color:blue;">{{ blueballs.length }}</em> 个蓝球</span>
      <el-button
        type="text"
        style="margin-left:1em;"
        @click="redballs=[];blueballs=[]"
      >
        清空上方选号
      </el-button>
    </div>
    <div>
      <el-button
        type="primary"
        :disabled="buttonLevel1Status"
        @click="getWinner"
      >
        查 询
      </el-button>
      <el-button
        type="primary"
        :disabled="buttonLevel1Status"
        @click="selectTick"
      >
        选好了
      </el-button>
    </div>
    <el-collapse-transition>
      <div
        v-show="tickSelects.length>0"
        class="title"
      >
        <span> 清单 </span>
      </div>
    </el-collapse-transition>
    <el-collapse-transition>
      <el-table
        v-show="tickSelects.length>0"
        :data="tickSelects"
        stripe
        style="width: 100%"
      >
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
    </el-collapse-transition>
    <el-collapse-transition>
      <div
        v-show="tickSelects.length>0"
      >
        <el-button
          type="primary"
          @click="dialogQiHaoVisible = !dialogQiHaoVisible"
        >
          下 注
        </el-button>
      </div>
    </el-collapse-transition>
    <div class="title">
      <span> 中奖详情 </span>
    </div>
    <el-collapse
      accordion
    >
      <el-collapse-item
        v-for="({title,data},index) of winnerStatus"
        :key="index"
        :title="title"
      >
        <div
          v-for="(item,i) of data"
          :key="i"
          class="text"
        >
          {{ item }}
        </div>
      </el-collapse-item>
    </el-collapse>

    <!-- 期号选择 对话框 -->
    <el-dialog
      v-model="dialogQiHaoVisible"
      title="确认项目"
    >
      <el-form>
        <el-form-item label="期号选择:">
          <el-select
            v-model="qihaoSelect"
            placeholder="请选择"
          >
            <el-option
              v-for="item in qihaoOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="备注信息:"
        >
          <el-input
            v-model="comment"
            type="textarea"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogQiHaoVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="postTicks(true)"
          >确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import {
  reactive, toRefs, watch, onMounted,
} from 'vue';
import LottoBall from '@/components/LottoBall.vue';
import { Combine, FormatNumber } from '@/util/calcuate';
import { ElMessage } from 'element-plus';
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

export interface SelectOpt {
    label: string;
    value: string;
}

export default {
  name: 'DoubleBall',
  components: {
    // HelloWorld,
    LottoBall,
  },
  setup() {
    const winerTypeDefault: WinnerData[] = [{
      title: '一等奖',
      data: [],
    }];
    const tickSelectsDefault: TickSelect[] = [];
    const qihaoSelectsDefault: SelectOpt[] = [];
    const data = reactive({
      buttonLevel1Status: true,
      redballs: [],
      blueballs: [],
      winnerStatus: winerTypeDefault,
      dialogQiHaoVisible: false,
      tickSelects: tickSelectsDefault,
      qihaoSelect: '',
      qihaoOption: qihaoSelectsDefault,
      comment: '',
    });

    const checkButton = () => {
      // 只负责清空，没有完全相关联
      if (data.redballs.length >= 1 && data.blueballs.length >= 1) {
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
      // TODO
      data.winnerStatus = [{
        title: '一等奖',
        data: ['时间 2012-02-02, 期号 20111111, 红球: 01 02 03 04 05 06, 蓝球 02', '时间 2012-02-02, 期号 20111111, 红球: 01 02 03 04 05 06, 蓝球 02', '时间 2012-02-02, 期号 20111111, 红球: 01 02 03 04 05 06, 蓝球 02'],
      }, {
        title: '二等奖',
        data: ['时间 2012-02-02, 期号 20111111, 红球: 01 02 03 04 05 06, 蓝球 02', '时间 2012-02-02, 期号 20111111, 红球: 01 02 03 04 05 06, 蓝球 02', '时间 2012-02-02, 期号 20111111, 红球: 01 02 03 04 05 06, 蓝球 02'],
      }, {
        title: '三等奖',
        data: ['时间 2012-02-02, 期号 20111111, 红球: 01 02 03 04 05 06, 蓝球 02', '时间 2012-02-02, 期号 20111111, 红球: 01 02 03 04 05 06, 蓝球 02', '时间 2012-02-02, 期号 20111111, 红球: 01 02 03 04 05 06, 蓝球 02'],
      }];
    }

    // 加入选择池
    function selectTick() {
      const tick: TickSelect = {
        redball: data.redballs.sort(), blueball: data.blueballs.sort(), count: Combine(data.redballs.length, 6) * data.blueballs.length,
      };
      data.redballs = [];
      data.blueballs = [];
      data.tickSelects.push(tick);
    }

    // 提交数据
    function postTicks(Danqi = false) {
      // todo  提交数据
      if (Danqi === false) {
        // todo
      } else {
        data.dialogQiHaoVisible = false;
        // todo
      }
      ElMessage.success({
        message: '恭喜你，这是一条成功消息',
        type: 'success',
      });
    }

    // 更新 ssq 期号数据
    async function updateQiHaoOption() {
      // todo get last qihao
      const qihao = '20134';
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
        value: 'long',
        label: '长期跟踪',
      });
      //   判断是否加入新一年的期号
      if (dayjs().dayOfYear() > 363) {
        data.qihaoOption.unshift({
          value: `${String(dayjs().year() % 100)}001`,
          label: `${String(dayjs().year())}001`,
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
      ...toRefs(data), clickFun, getWinner, selectTick, FormatNumber, postTicks,
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
.el-tag {
        border-radius: 50%;
}

.h1 {
  font-size:large;
  font-weight: 400;
  color: #1f2f3d;
}
</style>
