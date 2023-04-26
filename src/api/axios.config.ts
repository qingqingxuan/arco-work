import { useUserStoreContext } from '@/store/modules/user'
import { Message } from '@arco-design/web-vue'
import Axios, { AxiosResponse } from 'axios'
import qs from 'qs'

const reqInterceptors = import.meta.glob('./interceptors/request/*.ts', { eager: true })
const resInterceptors = import.meta.glob('./interceptors/response/*.ts', { eager: true })

export const baseURL = import.meta.env.VITE_PROXY_API

export const CONTENT_TYPE = 'Content-Type'

export const FORM_URLENCODED = 'application/x-www-form-urlencoded; charset=UTF-8'

export const APPLICATION_JSON = 'application/json; charset=UTF-8'

export const TEXT_PLAIN = 'text/plain; charset=UTF-8'

export const TOKEN_PREFIX = 'Bearer '

const service = Axios.create({
  baseURL,
  timeout: 10 * 60 * 1000,
})

service.interceptors.request.use(
  (config) => {
    const userInfo = useUserStoreContext()
    !config.headers && (config.headers = {})
    if (!config.headers[CONTENT_TYPE]) {
      config.headers[CONTENT_TYPE] = APPLICATION_JSON
    }
    if (config.headers[CONTENT_TYPE] === FORM_URLENCODED) {
      config.data = qs.stringify(config.data)
    }
    config.headers['token'] = TOKEN_PREFIX + userInfo.token
    return config
  },
  (error) => {
    return Promise.reject(error.response)
  }
)

Object.keys(reqInterceptors).forEach((it) => {
  service.interceptors.request.use((reqInterceptors as any)[it].default)
})

Object.keys(resInterceptors).forEach((it) => {
  service.interceptors.response.use((resInterceptors as any)[it].default)
})

service.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    if (response.status === 200) {
      return response
    } else {
      throw new Error(response.status.toString())
    }
  },
  (error: Error) => {
    if (import.meta.env.MODE === 'development') {
      console.log(error)
    }
    try {
      const errorObj = JSON.parse(error.message)
      if (errorObj.code === 401) {
        Message.error(errorObj.message)
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      }
    } catch (e) {
      return Promise.reject({ code: 500, message: error.message || '服务器异常，请稍后重试…' })
    }
  }
)

export default service
