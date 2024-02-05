import Axios, { AxiosResponse } from 'axios'
import qs from 'qs'

// 在开发阶段如果需要使用 Proxy 代理解决跨域问题，则需要把下面代码注释关闭
// 对应着 `vite.config.ts`中的 `server`配置选项
// export const baseURL = '/api'

// 在开发阶段如果需要使用 Proxy 代理解决跨域问题，则需要把下面代码注释打开
export const baseURL = 'http://localhost:8080/'

export const CONTENT_TYPE = 'Content-Type'

export const FORM_URLENCODED = 'application/x-www-form-urlencoded; charset=UTF-8'

export const APPLICATION_JSON = 'application/json; charset=UTF-8'

export const TEXT_PLAIN = 'text/plain; charset=UTF-8'

const service = Axios.create({
  baseURL,
  timeout: 10 * 60 * 1000,
})

service.interceptors.request.use(
  (config) => {
    if (!config.headers[CONTENT_TYPE]) {
      config.headers[CONTENT_TYPE] = APPLICATION_JSON
    }
    if (config.headers[CONTENT_TYPE] === FORM_URLENCODED) {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  (error) => {
    return Promise.reject(error.response)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    if (response.status === 200) {
      return response
    } else {
      throw new Error(response.status.toString())
    }
  },
  (error) => {
    if (import.meta.env.MODE === 'development') {
      console.log(error)
    }
    return Promise.reject({ code: 500, msg: '服务器异常，请稍后重试…' })
  }
)

export default service
