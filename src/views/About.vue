<template>
  <div style="margin-top: 20px">
    <el-checkbox-group v-model="checkboxGroup3" size="large">
      <el-checkbox-button v-for="city in cities" :label="city" class="round" border  :key="city">
        {{city}}
        </el-checkbox-button>
    </el-checkbox-group>
  </div>
  <div style="margin-top: 20px">
    <el-checkbox-group v-model="checkboxGroup4" size="mini" >
      <el-checkbox-button v-for="city in cities" :label="city"
      :key="city">{{city}}</el-checkbox-button>
    </el-checkbox-group>
  </div>
</template>

<script lang="ts">
const cityOptions = ['上海', '北京', '广州', '深圳'];
export default {
  data() {
    return {
      checkboxGroup1: ['上海'],
      checkboxGroup2: ['上海'],
      checkboxGroup3: ['上海'],
      checkboxGroup4: ['上海'],
      cities: cityOptions,
    };
  },
};
</script>

<style lang="scss" scope>

.el-checkbox-button {
  // border-radius: 50%;
  // margin-left: 1em;
}

</style>
