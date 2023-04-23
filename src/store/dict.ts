/*
 * @Author: chenzeou
 * @Date: 2023-04-22 21:17:11
 */
import Http from '@/utils/Http';
import { Module } from "vuex";
import { getActionName, getStateName }from '@/utils/String';
import { Dict } from '@/dict/dto'
import { Label } from '@/utils/Interface'

const viewsRequireContext: __WebpackModuleApi.RequireContext = require.context(
  '@/dict',
  false,
  /\.ts$/
);
/**
 * 获取相应文件export数据
 */
const serviceList: Dict[] = [];
viewsRequireContext.keys().forEach((fileName) => {
  const modulesContent = viewsRequireContext(fileName);
  const modulesData: Dict[] = modulesContent.default
  modulesData.forEach(dict => {
      if (!dict.service) { // 如果service字段为空 则取文件名
          const match: RegExpMatchArray | null = fileName.match(/\/(.+)\.ts/);
          dict.service = match![1]
      }
  })
  serviceList.push(...modulesData);
});

/**
 * 根据路由调用相应的api
 */
const routeGetActionsName = () => {
    const routerObj: Record<string, Map<Record<string, unknown>, string>> = {};
    for (const { service, apiList = [] } of serviceList) {
        for (const { url, useRoutePathName = {} } of apiList) {
            for (const [routeName, params] of Object.entries(useRoutePathName)) {
                if (!routerObj[routeName]) {
                    routerObj[routeName] = new Map();
                }
                const actions = `dict/${getActionName(service, url)}`;
                if (params.length) {
                    for (const paramObj of params) {
                        if (!routerObj[routeName].has(paramObj)) {
                            routerObj[routeName].set(paramObj, actions);
                        }
                    }
                } else {
                    routerObj[routeName].set({}, actions);
                }
            }
        }
    }
    return routerObj;
};

/**
 * 生成dict的vuex model
 * 同个接口多参数缓存情况开发中
 */
const createDiceModel = () => {
    // 定义要生成的块
    const actions: Record<string, (store: Module<any, any>, params: any) => Promise<any>> = {};
    const state: Record<string, {
        options: Label[],
        basic: any[],
        params: any,
        isCache: boolean
    }> = {};
    try {
        for (const { service, version, apiList } of serviceList) {
            for (const api of apiList || []) {
                //  根据路由接口生成所有的state
                const stateName = getStateName(api.url, false);
                state[stateName] = {
                    options: [],
                    basic: [],
                    params: {},
                    isCache: false
                };
                // 根据路由接口生成所有的actions
                actions[getActionName(service, api.url)] = async (store, params) => {
                    /**
                     * 校验是否需要调用接口
                     */
                    const checkGetData = () => !api.cache || !(store.state[stateName].options.length || store.state[stateName].basic.length);
                    /**
                     * 获取接口数据
                     */
                    const dataGetter = async () => {
                        // actions中请求相应接口
                        const res: any = await Http[api.methods](`/${service}/${version}/${api.url}`, params);
                        const data = res.code > 0 ? res.data : [];
                        // 判断是否需要保存接口源数据
                        if (api.needBasicData) {
                            store.state[stateName].basic = data;
                        }
                        // 处理options
                        if (api.labelValueKeys?.length) {
                            const [label, value] = api.labelValueKeys;
                            const options = data.map((item: any) => ({
                                label: item[label],
                                value: item[value],
                            })) ?? [];

                            store.state[stateName].options = options;
                        }

                        store.state[stateName].params = params;
                        return data;
                    };
                    // 不需要重复请求则返回缓存数据
                    return checkGetData() ? dataGetter() : (() => {
                        state[stateName].isCache = true;
                        return state[stateName]
                    })();
                };
            }
        }
        return [state, actions];
    } catch (error) {
        console.error(error);
    }
};
const [state, actions]: any = createDiceModel();
state.routeGetActionsName = routeGetActionsName();
const StoreModel = {
  namespaced: true,
  name: 'dict',
  state,
  actions,
};
export default StoreModel;
