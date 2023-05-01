/*
 * @Author: chenzeou
 * @Date: 2023-04-23 16:55:20
 */
import Automation from '@/dict/automation'
import {Api} from "@/dict/dto";
import { RoutesItem } from "@/utils/Router/dto";
import {getStateName} from "@/utils/String";
import {useStore} from "vuex";


/**
 * 辅助测试工具，代码不严谨 用于实战需优化
 * @param route
 */
export function filterRouteItem(route: RoutesItem) {
    const store = useStore()
    const apiList = Automation[0].apiList
    const filters: any = apiList?.filter(item => {
        const routePathNames = Object.keys(item.useRoutePathName)
        return routePathNames.includes(<string>route.name) || routePathNames.includes(<string>route.path.replace('/', ''))
    })
    return filters.map((item: any) => {
        item.dicData = store.state.dict[getStateName(item.url, false)] || {
            options: []
        }
        return item
    })
}