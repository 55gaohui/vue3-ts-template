import { AxiosResponse } from 'axios'
import Request from './axios'
import { TIMEOUT } from '@/config/index'
import { RequestConfig } from './type'
export interface IResponse<T = any> {
  code: number
  data: T
  message: string
}

// 重写返回类型
interface IRequestConfig<T, R> extends RequestConfig<IResponse<R>> {
  data?: T
  params?: T
}

const request = new Request({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: TIMEOUT,
  interceptors: {
    // 请求拦截器
    requestInterceptors: (config) => {
      return config
    },
    // 响应拦截器
    responseInterceptors: (result: AxiosResponse) => {
      return result
    }
  }
})
/**
 * @description: 函数的描述
 * @generic D 请求参数
 * @generic T 响应结构
 * @param {IRequestConfig} config
 * @returns {Promise}
 */
const http = <D = any, T = any>(url: string, config: IRequestConfig<D, T>) => {
  return request.request<IResponse<T>>({ ...config, url })
}
// 取消请求
export const cancelRequest = (url: string | string[]) => {
  return request.cancelRequest(url)
}
// 取消全部请求
export const cancelAllRequest = () => {
  return request.cancelAllRequest()
}

export default http
