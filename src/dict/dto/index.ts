/*
 * @Author: chenzeou
 * @Date: 2023-04-22 21:30:15
 */
export interface Api {
    url: string, // 除去服务和版本号的接口地址
    methods: 'get' | 'post' | 'delete' | 'put' ,
    cache?: boolean, // 是否需要缓存(如果是一次性获取所有数据，请使用缓存, 分页等会改变参数的不要缓存)
    useRoutePathName: Record<string, []>, // 根据不同的路由名传不同的参数, 有可能出现同个路由同个请求不同参数 所以用数组来存 格式未{ [路由名或路径]: [{ [参数key]: 参数value}]}
    labelValueKeys: string[], // 自动格式化成下拉框数据的label value ['name', 'id']
    needBasicData: boolean, // 是否需要保存基础数据供后面逻辑用
    paramsSaveKey?: string // 当接口出现多参数获取不同数据时，可根据哪个参数的key来保存数据
}
export interface Dict {
    service: string, // 后端服务/网关 留空自动取文件名
    version: string, // 版本
    apiList?: Api[]
}