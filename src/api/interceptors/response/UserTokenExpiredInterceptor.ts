import { AxiosResponse } from 'axios'
import { Response } from '../../types'

export default function (response: AxiosResponse<Response>): AxiosResponse {
  if (response.status === 200) {
    if (response.data.code === 401) {
      throw new Error(JSON.stringify({ code: 401, message: '当前登录已过期，请重新登录' }))
    }
    return response
  }
  return response
}
