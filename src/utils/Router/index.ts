/*
 * @Author: chenzeou
 * @Date: 2023-04-22 12:16:24
 */
/**
 * 导入定义路由所需的类型和工具函数
 */
import { RouterConfig, RoutesItem } from './dto'
import { firstToLowerCase, countOccurrences } from "@/utils/String";
import { defineAsyncComponent } from "vue";

/**
 * 根据views中的config.ts生成路由参数
 * 生成子路由逻辑开发中
 */

// 使用 Webpack 的 require.context 方法获取 views 文件夹下所有 config.ts 文件的路径
const viewsRequireContext: __WebpackModuleApi.RequireContext = require.context('@/views', true, /[/\\]config\.ts$/);
const configs: RouterConfig[] = []

// 遍历 viewsRequireContext 中的每个路径，读取相应的配置文件内容，并将配置信息转换为 RouterConfig 对象，再将其添加到数组 configs 中保存
viewsRequireContext.keys().forEach((path) => {
    // 获取当前配置文件内容
    const modulesContent = viewsRequireContext(path);

    // 设置源路径
    const basePath = path.replace('./', '')

    // 根据当前配置文件内容生成路由配置对象
    const config: RouterConfig = {
        basePath,
        ...modulesContent.routeConfig,
    }

    // 将当前路由配置对象添加到 configs 数组中
    configs.push(config)
});

/**
 * 生成路由参数的主要逻辑
 */
export function getRoutes(): RoutesItem[] {
    // 定义一个空数组用于保存最终生成的路由参数对象
    const routesItems: RoutesItem[] = []

    // 定义内部函数 getRoute，用于根据 RouterConfig 对象生成对应的 RoutesItem 对象
    const getRoute = function (config: RouterConfig): RoutesItem {
        // 获取当前配置文件的路径名
        const pathArr = config.basePath?.split('/') || []
        const pathName = (pathArr)[pathArr.indexOf('config.ts') - 1]
        // 首字母小写做为path
        const path = firstToLowerCase(pathName)
        // 将基础路径中的config.ts替换为空，剩下作为路由的key方便后续逻辑使用
        const key: string = config.basePath?.replace('config.ts', '') || ''

        const route: RoutesItem = {
            key,
            // 长度等于2的时候是根路由[根路由,config.ts]，子路由路径用相对路径
            path: pathArr.length > 2 ? path :  '/' + path,
            name: firstToLowerCase(key.replace(/\//g, '')),
            component: defineAsyncComponent(() => import(`@/views/${key}`))
        }

        // 如果配置文件包含 meta 属性，则将其添加到生成的 route 对象中
        if (config.meta) {
            route.meta = config.meta
        }

        return route
    }
    // 定义内部函数 addChildRoute，用于生成并添加子路由到父路由的 children 属性中
    const addChildRoute = (route: RoutesItem) => {
        // 获取当前路由的层级数
        const routeLevel = countOccurrences(route.key, '/')

        // 查找所有当前路由的直接子路由配置文件，并根据这些配置文件生成对应的 RoutesItem 对象
        const nextLevelConfigs = configs.filter(config =>
            config.basePath?.startsWith(<string>route.key) &&
            countOccurrences(config.basePath, '/') === routeLevel + 1)

        // 如果没有子路由，则直接返回
        if (!nextLevelConfigs.length) return

        // 遍历所有子路由并递归调用 addChildRoute 函数生成其下一级子路由，并添加到当前路由的 children 属性中
        nextLevelConfigs.forEach(config => {
            const childrenRoute = getRoute(config)
            if (route.children && route.children.length > 0) {
                route.children.push(childrenRoute)
            } else {
                route.children = [childrenRoute]
            }
            addChildRoute(childrenRoute)
        })
    }
    // 筛选出所有一级路由对象，并根据这些对象生成对应的路由参数对象
    const rootRoutePaths = configs.filter(config => countOccurrences(config.basePath, '/') === 1)
    rootRoutePaths.forEach(config => {
        const rootRoute = getRoute(config)
        addChildRoute(rootRoute)
        routesItems.push(rootRoute)
    });
    // 返回最终生成的路由参数对象数组
    return routesItems
}

// 导出保存了所有路由配置信息的数组 configs
export default configs as RouterConfig[]
