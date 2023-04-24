import { get } from '@/api/http'
import { getRoleList } from '@/api/url'

export type Role = {
  id: number
  name: string
  code: string
  status: number
}

export function useRoleList() {
  return get<Role[]>({
    url: getRoleList,
  }).then((res) => {
    return res.data || []
  })
}
