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
    <el-menu-item :index="childItem.path" @click="routerTo(childItem)">
      <i class="iconfont" :class="childItem?.meta?.icon"></i>
      <span>{{childItem?.meta?.title}}</span>
    </el-menu-item>
  </template>
</template>
<script lang="ts" setup>
import { defineProps, withDefaults} from 'vue';
import {RoutesItem} from "@/utils/Router/dto";
import { useRouter } from "vue-router";

interface MenuProps {
  childItem: RoutesItem
}
const router = useRouter()
withDefaults(defineProps<MenuProps>(), {
  childItem: {} as any,
})
/**
 * 跳转路由
 * @param route
 */
const routerTo = (route: RoutesItem) => {
  if (route.children?.length) return
  router.push(route)
}
</script>
<style lang="scss" scoped>
</style>