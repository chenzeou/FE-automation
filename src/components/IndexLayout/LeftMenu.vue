<template>
  <el-menu
      class="el-menu-vertical"
      :router="false"
  >
    <left-menu-item
        v-for="item in menuData"
        :key="item.path"
        :childItem="item"
    ></left-menu-item>
  </el-menu>
</template>
<script lang="ts" setup>
import { RoutesItem } from '@/utils/Router/dto';
import {withDefaults, defineProps, watch} from 'vue';
import LeftMenuItem from './LeftMenuItem.vue';
interface MenuProps {
  menuData: RoutesItem[]
}

const props = withDefaults(defineProps<MenuProps>(), {
  menuData: () => [],
})
watch(() => props.menuData, (value) => {
  console.log('value', value)
}, {
  deep: true
})
</script>
<style lang="less" scoped>
.el-menu-vertical{
  height: 100vh;
}
</style>
