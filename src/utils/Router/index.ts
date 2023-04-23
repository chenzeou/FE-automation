/*
 * @Author: chenzeou
 * @Date: 2023-04-22 12:16:24
 */
import { RouterConfig } from './dto'

/**
 * 根据views中的config.ts生成路由参数
 * 生成子路由逻辑开发中
 */
const viewsRequireContext: __WebpackModuleApi.RequireContext = require.context('@/views', true, /[/\\]config\.ts$/);
const configs: RouterConfig[] = []
// 根据路径生成配置文件
viewsRequireContext.keys().forEach((path) => {
    const modulesContent = viewsRequireContext(path);
    // 将文件所处路径位置分解
    const pathArr = path.split('/')
    // 拿到文件所处的文件夹 将pathName为文件夹名
    const pathName = (pathArr)[pathArr.indexOf('config.ts') - 1]
    const config: RouterConfig = {
        pathName,
        ...modulesContent.routeConfig,
    }
    configs.push(config)
});
export default configs as RouterConfig[]
