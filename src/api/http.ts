import { AxiosResponse } from 'axios'
import type { App } from 'vue'
import request from './axios.config'
import { Message } from '@arco-design/web-vue'
import { HttpOption, Response } from './types'

export function http<T = any>({
  url,
  data,
  method,
  headers,
  beforeRequest,
  afterRequest,
}: HttpOption) {
  const successHandler = (res: AxiosResponse<Response<T>>) => {
    if (res.data.code === 200) {
      return res.data
    }
    Message.error(res.data.msg)
  }
  const failHandler = (error: Error) => {
    afterRequest && afterRequest()
    return Promise.reject(error)
  }
  beforeRequest && beforeRequest()
  method = method || 'GET'
  const params = Object.assign(typeof data === 'function' ? data() : data || {}, {})
  if (['GET', 'DELETE', 'HEAD', 'OPTIONS', 'head', 'options', 'get', 'delete'].includes(method)) {
    return (request as any)
      [method.toLowerCase()](url, { params, headers })
      .then(successHandler, failHandler)
  } else if (['POST', 'PUT', 'PATH', 'post', 'put', 'patch'].includes(method)) {
    return (request as any)
      [method.toLowerCase()](url, params, { headers })
      .then(successHandler, failHandler)
  } else {
    throw new Error('cannot support "' + method + '" request')
  }
}

export function get<T = any>({
  url,
  data,
  beforeRequest,
  afterRequest,
}: HttpOption): Promise<Response<T>> {
  return http<T>({
    url,
    method: 'GET',
    data,
    beforeRequest,
    afterRequest,
  })
}

export function deleteReq<T = any>({
  url,
  data,
  beforeRequest,
  afterRequest,
}: HttpOption): Promise<Response<T>> {
  return http<T>({
    url,
    method: 'DELETE',
    data,
    beforeRequest,
    afterRequest,
  })
}

export function post<T = any>({
  url,
  data,
  headers,
  beforeRequest,
  afterRequest,
}: HttpOption): Promise<Response<T>> {
  return http<T>({
    url,
    method: 'POST',
    data,
    headers,
    beforeRequest,
    afterRequest,
  })
}

export function put<T = any>({
  url,
  data,
  headers,
  beforeRequest,
  afterRequest,
}: HttpOption): Promise<Response<T>> {
  return http<T>({
    url,
    method: 'PUT',
    data,
    headers,
    beforeRequest,
    afterRequest,
  })
}

function install(app: App): void {
  app.config.globalProperties.$http = http

  app.config.globalProperties.$get = get

  app.config.globalProperties.$delete = deleteReq

  app.config.globalProperties.$put = put
}

export default {
  install,
  get,
  post,
  deleteReq,
  put,
}

declare module 'vue' {
  // 为 `this.$` 提供类型声明
  interface ComponentCustomProperties {
    $get: <T = any>(options: HttpOption) => Promise<Response<T>>
    $delete: <T = any>(options: HttpOption) => Promise<Response<T>>
    $post: <T = any>(options: HttpOption) => Promise<Response<T>>
    $put: <T = any>(options: HttpOption) => Promise<Response<T>>
  }
}
