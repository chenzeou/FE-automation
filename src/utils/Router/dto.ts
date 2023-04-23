/*
 * @Author: chenzeou
 * @Date: 2023-04-22 12:20:14
 */
export type Meta = {
    icon?: string, // iconfont的icon 菜单图标
    title: string, // 菜单标题
    [key: string]: any; // 其他meta为对象可以放任何key
}
export interface RouterConfig {
    pathName?: string, // 路由name 英文唯一 因为会根据这个自动生成path，以及会自动从views下引入该文件夹名，请记得创建
    meta?: Meta, // 如有配置其他属性
    children?: RouterConfig[] // 子路由
}