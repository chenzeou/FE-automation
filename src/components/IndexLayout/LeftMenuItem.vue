<template>
  <template
      v-if="childItem.children && Array.isArray(childItem.children) && childItem.children.length"
  >
    <el-sub-menu :index="childItem.path" >
      <template #title>
        <i class="iconfont" :class="childItem?.meta?.icon"></i>
        <span>{{childItem?.meta?.title}}</span>
      </template>
      <left-menu-item
          v-for="item in childItem.children"
          :key="item.path"
          :childItem="item"
      ></left-menu-item>
    </el-sub-menu>
  </template>
  <template v-else>
    <el-menu-item :index="childItem.path">
      <i class="iconfont" :class="childItem?.meta?.icon"></i>
      <span>{{childItem?.meta?.title}}</span>
    </el-menu-item>
  </template>
</template>
<script lang="ts" setup>
import { defineProps, withDefaults} from 'vue';
import {RoutesItem} from "@/utils/Router/dto";

interface MenuProps {
  childItem: RoutesItem
}

withDefaults(defineProps<MenuProps>(), {
  childItem: () => ({}),
})

</script>
<style lang="scss" scoped>
</style>