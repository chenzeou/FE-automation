<template>
  <el-form :model="form" label-width="120px" v-if="dictData.length">
    <el-form-item :label="item.url" v-for="(item, index) in dictData" :key="index">
      <el-select v-model="form[`selectValue${index + 1}`]" :placeholder="`字典接口${item.url}`">
        <el-option
            v-for="item in item.dicData.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </el-form-item>
  </el-form>
  <div v-else>
    当前页面未在@/dict下配置字典自动加载
  </div>
</template>
<script lang="ts" setup>

import {defineProps, reactive, withDefaults} from 'vue';
interface LeftProps {
  dictData: any
}
// 表单model
const form = reactive<Record<string, string | number>>({})
withDefaults(defineProps<LeftProps>(), {
  dictData: () => [],
})
</script>
