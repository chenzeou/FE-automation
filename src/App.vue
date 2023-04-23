<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-menu
            class="el-menu-vertical"
            :router="true"
        >
          <el-menu-item :index="item.path" :key="index" v-for="(item, index) in Menu">
            <template #title>
              <i class="iconfont" :class="item?.meta?.icon"></i>
              <span>{{item?.meta?.title}}</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
<!--        <el-header>Header</el-header>-->
        <el-main>
          <router-view />
        </el-main>
<!--        <el-footer>Footer</el-footer>-->
      </el-container>
    </el-container>
  </div>

</template>
<script lang="ts" setup>
  import { watch } from 'vue'
  import Menu from '@/utils/Menu'
  import { useStore } from "vuex";
  import { useRoute } from "vue-router";
  const store = useStore()
  const route = useRoute()
  watch(
      () => route.path,
      () => {
        const name = route.name;
        const path = route.path;
        const getActions = (name: string) => store.state?.dict?.routeGetActionsName[name] || false
        const routeGetActionsName = getActions(name) || getActions(path.split('/')[1])
        if (routeGetActionsName) {
          for (let [params, actions] of routeGetActionsName) {
            store.dispatch(actions, params);
          }
        }
      },
  );
</script>

<style lang="less" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  color: #2c3e50;
  height: 100vh;
}
.el-main{
  padding: 0;
}
.el-header{
  border-bottom: 1px solid #3333;
}
.el-menu-vertical{
  height: 100vh;
}
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
