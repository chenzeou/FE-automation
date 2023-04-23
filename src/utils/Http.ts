/*
 * @Author: chenzeou
 * @Date: 2023-04-22 18:56:20
 */
import axios from 'axios'
import { ElNotification } from 'element-plus'
const http = axios.create({
    baseURL: '/api',
    timeout: 20000, // request timeout
})
// http request 拦截器
http.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// http response 拦截器
http.interceptors.response.use(
    (res) => {
        console.log('response', res)
        if (res.data.code !== 1) {
            switch (res.data.code) {
                case 401:
                    ElNotification.error({
                        title: '提示',
                        message: '登录超时，请重新登录'
                    });
                    return Promise.reject(res.data);
                default:
                    ElNotification.error({
                        title: '提示',
                        message: res.data.msg
                    });
                    break;
            }
            return Promise.reject(res.data);
        }

        return res.data
    },
    (error) => {
        console.log('请求出错', error.response.data)
        error.data = {}
        ElNotification.error({
            title: '错误提示',
            message: '请求超时或服务器异常，请检查网络或联系管理员！'
        });
        error.data.msg = '请求超时或服务器异常，请检查网络或联系管理员！'
        return Promise.reject(error)
    }
)
export default http
