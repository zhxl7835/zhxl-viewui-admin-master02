/**
 *   @description 接口请求拦截
 *   @author Xiaohui Zeng
 *   @date 2020/5/14
 */
import axios from 'axios'
import {Message} from 'view-design';
// 创建一个axios实例
const service = axios.create({
    /*baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url*/
    baseURL: 'http://base-demo-middle:8082/',
    timeout: 30000, // 请求超时时间 默认30秒
    headers: {
        'Content-Type': 'application/json'
    }
})
// 请求拦截器
service.interceptors.request.use(config => {

        const token = sessionStorage.getItem('userToken');
        // 判断是否存在token，如果存在的话，则每个http header都加上token
        if (token) {
            config.headers['token'] = token
        }
        return config
    },
    error => {
        // debug
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        const res = response.data

        if (res.code !== 200) {
            Message.warning(res.msg || 'Error')
            return Promise.reject(new Error(res.msg || 'Error'))
        } else {
            return res
        }
    },
    error => {
        // debug
        Message.error(res.msg || 'Error')
        return Promise.reject(error)
    }
)

export default service
