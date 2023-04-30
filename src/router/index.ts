import { createRouter, createWebHashHistory } from "vue-router";
import routerConfig from "@/utils/Router/index";
import { Meta, RouterConfig, RoutesItem } from '@/utils/Router/dto'
import { firstToLowerCase } from '@/utils/String'
import { defineAsyncComponent } from 'vue'
import NProgress from 'nprogress' // 引入第三方进度条库
import 'nprogress/nprogress.css'
// 获取路由 生成子路由逻辑开发中
function getRoutes(): RoutesItem[] {
  const routesItems: RoutesItem[] = []
  const getRoute = function (pathName: string, meta: Meta) {
    const route: RoutesItem = {
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
        routesItems.push(obj)
      })
    } else {
      const obj = getRoute(config.pathName || '', config.meta || {
        title: ''
      })
      routesItems.push(obj)
    }
  })
  return routesItems
}
// const routes: RoutesItem[] = [
const routes: Array<RoutesItem> = getRoutes();
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes: routes,
});
router.beforeEach((to, from) => {
  NProgress.start()
})
router.afterEach(() => {
  NProgress.done();
});
export default router;
