/*
 * @Author: chenzeou
 * @Date: 2023-04-22 12:20:14
 */
import { RouteRecordRaw } from "vue-router";

export type Meta = {
    icon?: string, // iconfont的icon 菜单图标
    title: string, // 菜单标题
    [key: string]: any; // 其他meta为对象可以放任何key
}
export interface RouterConfig {
    basePath?: string, // 组件位置路径
    pathName?: string, // 路由name 英文唯一 因为会根据这个自动生成path，以及会自动从views下引入该文件夹名，请记得创建
    meta?: Meta, // 如有配置其他属性
    children?:  Array<RouterConfig & { pathName: string; }>; // 子路由
}
export type RoutesItem = RouteRecordRaw & {
    key?: string; // 目录唯一key，用于方便逻辑索引
};