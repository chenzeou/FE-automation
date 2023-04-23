<template>
  <div class="right-dic-block">
    <div v-for="(item, index) in dictData" :key="index" class="right">
      {{index + 1}}：接口{{item.url}}
      <span v-if="item.dicData.isCache">已经请求成功过数据，网络不会发送请求。</span>
      <span v-else>首次请求数据，网络有发送请求。</span>
    </div>
  </div>

</template>
<script lang="ts" setup>
import {defineProps, withDefaults} from 'vue';
interface LeftProps {
  dictData: any
}
withDefaults(defineProps<LeftProps>(), {
  dictData: () => [],
})
</script>
<style lang="less" scoped>
.right-dic-block{
  padding: 0 10px;
  display: flow-root;
  line-height: 2;
}
.right{


}
</style>