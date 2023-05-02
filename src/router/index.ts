import { createRouter, createWebHashHistory } from "vue-router";
import { getRoutes } from "@/utils/Router";
import {  RoutesItem } from '@/utils/Router/dto'
import NProgress from 'nprogress' // 引入第三方进度条库
import 'nprogress/nprogress.css'

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
