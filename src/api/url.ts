import { baseURL } from './axios.config'

export const baseAddress = baseURL

export const apiModule = '/api'

export const test = '/test'

export const login = '/login'

export const updateUserInfo = '/updateUser'

export const addUserInfo = '/addUser'

export const getMenuListByRoleId = apiModule + '/getMenusByRoleIds'

export const getAllMenuByRoleId = '/getAllMenuByRoleId'

export const deleteUserById = '/deleteUserById'

export const getDepartmentList = '/getDepartmentList'

export const addDepartment = '/addDepartment'

export const getRoleList = apiModule + '/getAllRoles'

export const getMenuList = apiModule + '/getAllMenus'

export const getParentMenuList = '/getParentMenuList'

export const getTableList = '/getTableList'

export const getCardList = '/getCardList'

export const getCommentList = '/getCommentList'

declare module 'vue' {
  interface ComponentCustomProperties {
    $urlPath: Record<string, string>
  }
}
