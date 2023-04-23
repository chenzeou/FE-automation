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
import FixedRightLayout from '@/components/FixedRightLayout'
import LeftDicDemo from '@/components/LeftDicDemo'
import RightDicDemo from '@/components/RightDicDemo'
import { filterRouteItem } from '@/utils/Demo'
import { useStore } from "vuex";
import { Api } from "@/dict/dto";
import { useRoute } from "vue-router";
import {getStateName} from "@/utils/String";


// store
const store = useStore()
// route
const route = useRoute()
// 字典数据
const dictData = computed(() => {
  const filters: any = filterRouteItem(route.name).map((item: Api) => {
    item.dicData = store.state.dict[getStateName(item.url, false)] || {
      options: []
    }
    return item
  })
  return filters
})
</script>
