import { createRouter, createWebHistory, RouteRecordRaw, createWebHashHistory } from "vue-router";
import routerConfig from "@/utils/Router/index";
import { Meta, RouterConfig } from '@/utils/Router/dto'
import { firstToLowerCase } from '@/utils/String'
import { defineAsyncComponent } from 'vue'
import NProgress from 'nprogress' // 引入第三方进度条库
import 'nprogress/nprogress.css'
type MainChildRoute = RouteRecordRaw & { // 拓展原有route type 添加meat属性
  meta?: Meta
}
// 获取路由 生成子路由逻辑开发中
function getMainRoute(): MainChildRoute[] {
  const mainChildRoute: MainChildRoute[] = []
  const getRoute = function (pathName: string, meta: Meta) {
    const route: MainChildRoute = {
      // 将文件夹名首字母改为小写设置为path
      path: '/' + firstToLowerCase(pathName),
      name: pathName,
      // 引入views下pathName组件
      component: defineAsyncComponent(() => import(`@/views/${pathName}`))
    }
    if (meta) {
      route.meta = meta
    }
    return route
  }
  routerConfig.forEach((config: RouterConfig) => {
    if (config.children) {
      config.children.forEach((child) => {
        const pathName: string = child.pathName || ''
        const meta = child.meta || {
          title: ''
        }
        const obj = getRoute(pathName, meta)
        mainChildRoute.push(obj)
      })
    } else {
      const obj = getRoute(config.pathName || '', config.meta || {
        title: ''
      })
      mainChildRoute.push(obj)
    }
  })
  return mainChildRoute
}
// const routes: RouteRecordRaw[] = [
const routes: Array<MainChildRoute> = getMainRoute();
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from) => {
  //
  NProgress.start()
  console.log(222)

})
router.afterEach(() => {

  NProgress.done();
});
export default router;
