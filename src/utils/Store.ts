/*
 * @Author: chenzeou
 * @Date: 2023-04-22 19:20:11
 */
import { ModuleTree } from 'vuex';

/**
 * 根据views下的store.ts和store下的ts文件生成store模块
 */
export function getAllStoreModules<S>(): ModuleTree<S> {
    const modules: ModuleTree<S> = {};
    try {
        // 查找views 下的 store.ts
        const viewsRequireContext: __WebpackModuleApi.RequireContext= require.context('@/views', true, /[/\\]store\.ts$/);
        // 查找store下的ts
        const storeRequireContext: __WebpackModuleApi.RequireContext = require.context('@/store', false, /\.ts$/);
        // 处理模块
        [viewsRequireContext, storeRequireContext].forEach(content => {
            content.keys().forEach(path => {
                const modulesContent = content(path);
                if (modulesContent.default) {
                    const { name, ...module } = modulesContent.default;
                    // 生成模块名
                    const modulesName = name || path.replace(/^\.\/(.*)\.\w+$/, '$1');
                    modules[modulesName] = { ...module };
                }
            })
        })
    } catch (error) {
        console.log(error);
    }
    return modules;
}
