<template>
  <fixed-right-layout left-width="400px">
    <template #left>
      <left-dic-demo :dictData="dictData"></left-dic-demo>
    </template>
    <template #right>
      <right-dic-demo :dictData="dictData"></right-dic-demo>
    </template>
  </fixed-right-layout>
</template>
<script lang="ts" setup>
import {computed} from "vue";
import FixedRightLayout from '@/components/FixedRightLayout.vue'
import LeftDicDemo from '@/components/LeftDicDemo.vue'
import RightDicDemo from '@/components/RightDicDemo.vue'
import { filterRouteItem } from '@/utils/Demo'
import { useRoute } from "vue-router";
// route
const route = useRoute()
// 字典数据
const dictData = computed(() => filterRouteItem(route.name))
</script>
