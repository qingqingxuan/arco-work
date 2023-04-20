import { get } from '@/api/http'
import { getRoleList } from '@/api/url'

export function useRoleList() {
  return get({
    url: getRoleList,
  }).then((res) => {
    return res.data || []
  })
}
