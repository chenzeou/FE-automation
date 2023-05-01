<template>
  <div>
    <left-menu
        :menuData="menuData"
    >
    </left-menu>
  </div>
</template>
<script lang="ts" setup>
import LeftMenu from './LeftMenu';
import menuData from '@/utils/Menu'
console.log('menuData', menuData)
</script>
<style lang="less" scoped>

</style>
