/*
 * @Author: chenzeou
 * @Date: 2023-04-23 16:55:20
 */
import Automation from '@/dict/automation'


/**
 * 辅助测试工具，代码不严谨 用于实战需优化
 * @param routeName
 */
export function filterRouteItem(routeName: string) {
    const apiList = Automation[0].apiList
    const filters: any = apiList?.filter(item => Object.keys(item.useRoutePathName).includes(routeName.toLowerCase()))
    return filters
}