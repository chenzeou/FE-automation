<template>
  <div class="clearfix" :style="{width: layoutWidth}">
    <div :style="{ width: leftWidth}" class="left block">
      <slot name="left"></slot>
    </div>
    <div :style="{ marginLeft: leftWidth}" class="block">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {defineProps, withDefaults} from 'vue';
interface LayoutProps {
  layoutWidth?: string
  leftWidth?: string

}
withDefaults(defineProps<LayoutProps>(), {
  layoutWidth: '100%',
  leftWidth: '300px',
})
</script>

<style lang="less" scoped>
.left{
  float: left;
  border-right: 1px solid #3333;
}
.block{
  height: 100%;
  padding: 10px;
  //display: inline-block;
}
.clearfix{
  height: calc(100% - 20px);
  &::after {
    content: "";
    display: table;
    clear: both;
  }
}
</style>
