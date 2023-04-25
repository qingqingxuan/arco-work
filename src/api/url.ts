import { baseURL } from './axios.config'

export const baseAddress = baseURL

export const apiModule = '/api'

export const login = '/login'

export const updateUserInfo = '/updateUser'

export const getUserList = apiModule + '/getUserList'

export const addUser = apiModule + '/createUser'

export const updateUser = apiModule + '/updateUser'

export const changeUserStatus = apiModule + '/changeUserStatus'

export const getMenuListByRoleId = apiModule + '/getMenusByRoleIds'

export const getMenuList = apiModule + '/getAllMenus'

export const createMenu = apiModule + '/createMenu'

export const updateMenu = apiModule + '/updateMenu'

export const getSelectedMenusByRoleId = apiModule + '/getSelectedMenusByRoleId'

export const getRoleList = apiModule + '/getAllRoles'

export const createRole = apiModule + '/createRole'

export const updateRole = apiModule + '/editRole'

export const updateMenuByRoleId = apiModule + '/updateMenuByRoleId'

export const deleteUserById = '/deleteUserById'

export const getDepartmentList = '/getDepartmentList'

export const addDepartment = '/addDepartment'

export const getParentMenuList = '/getParentMenuList'

export const getTableList = '/getTableList'

export const getCardList = '/getCardList'

export const getCommentList = '/getCommentList'

declare module 'vue' {
  interface ComponentCustomProperties {
    $urlPath: Record<string, string>
  }
}
