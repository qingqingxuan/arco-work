import { AxiosResponse } from 'axios'
import { Message } from '@arco-design/web-vue'

export default function (response: AxiosResponse): AxiosResponse {
  console.log(response)
  if (response.status === 200) {
    Message.error('当前用户登录已过期，请重新登录')
    throw new Error('11')
  }
  return response
}
