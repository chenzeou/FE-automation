/*
 * @Author: chenzeou
 * @Date: 2023-04-22 20:59:13
 */
import { Dict } from './dto'
export default [
    { // 每个版本号添加一个对象 预留逻辑， 字段详情请参考Dict dto
        service: '',
        version: 'v1',
        apiList: [
            {
                url: 'dict/list',
                methods: 'get',
                cache: true,
                useRoutePathName: {
                    dictTest1Test11Test111: [],
                    dictTest2: [],
                },
                labelValueKeys: ['name', 'value'],
                needBasicData: true
            },
            {
                url: 'dict/list1',
                methods: 'get',
                cache: true,
                useRoutePathName: {
                    dictTest1Test11Test111: [],
                    dictTest3: [],
                },
                labelValueKeys: ['name', 'value'],
                needBasicData: true
            },
            {
                url: 'dict/list2',
                methods: 'get',
                cache: true,
                useRoutePathName: {
                    dictTest2: [],
                    dictTest3: [],
                },
                labelValueKeys: ['name', 'value'],
                needBasicData: true
            },
            {
                url: 'dict/list3',
                methods: 'get',
                cache: true,
                useRoutePathName: {
                    dictTest2: [],
                    dictTest3: [],
                    dictTest5: []
                },
                labelValueKeys: ['name', 'value'],
                needBasicData: true
            },
            {
                url: 'dict/list4',
                methods: 'get',
                cache: true,
                useRoutePathName: {
                    dictTest1Test11Test111: [],
                    dictTest2: [],
                    dictTest3: [],
                    dictTest4: []
                },
                labelValueKeys: ['name', 'value'],
                needBasicData: true
            }
        ]
    }
] as Dict[]