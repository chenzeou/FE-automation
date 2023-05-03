<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <left />
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
  import Left from '@/components/IndexLayout/Left.vue'
  import { useStore } from "vuex";
  import { useRoute } from "vue-router";
  const store = useStore()
  const route = useRoute()
  watch(
      () => route.path,
      () => {
        const name = route.name;
        const path = route.path;
        const getActions = (name: string) => (store.state?.dict?.routeGetActionsName[name] || false)
        const routeGetActionsName = getActions((name || '').toString()) || getActions(path.split('/')[1])
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
