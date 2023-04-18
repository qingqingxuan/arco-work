import { RouteRecordRaw } from 'vue-router'
import { defineStore } from 'pinia'
import router from '@/router'
import { getMenuListByRoleId } from '@/api/url'
import { post } from '@/api/http'
import { defaultRoutes } from '@/router/routes/default-routes'
import { findRootPathRoute, generatorRoutes, mapTwoLevelRouter } from '../help'
import { constantRoutes } from '@/router/routes/constants'

const usePermissionStore = defineStore('permission-route', {
  state: () => {
    return {
      permissionRoutes: [] as RouteRecordRaw[],
    }
  },
  getters: {
    getPermissionSideBar(state) {
      return state.permissionRoutes.filter((it) => {
        return it.meta && !it.meta.hidden
      })
    },
    getPermissionSplitTabs(state) {
      return state.permissionRoutes.filter((it) => {
        return it.meta && !it.meta.hidden && it.children && it.children.length > 0
      })
    },
    getTopLevelTabs(state) {
      return state.permissionRoutes
        .filter((it) => {
          return it.meta && !it.meta.hidden && it.children && it.children.length > 0
        })
        .map((it) => {
          const obj = { ...it, items: it.children }
          delete obj.children
          return obj
        })
    },
  },
  actions: {
    async getRoutes() {
      try {
        if (getMenuListByRoleId) {
          const res = await post({
            url: getMenuListByRoleId,
          })
          return generatorRoutes(res.data)
        } else {
          return generatorRoutes(defaultRoutes)
        }
      } catch (error) {
        console.log(
          '路由加载失败了，请清空一下Cookie和localStorage，重新登录；如果已经采用真实接口的，请确保菜单接口地址真实可用并且返回的数据格式和mock中的一样'
        )
        return []
      }
    },
    async initPermissionRoute() {
      // 加载路由
      const accessRoutes = await this.getRoutes()
      const mapRoutes = mapTwoLevelRouter(accessRoutes)
      mapRoutes.forEach((it: any) => {
        router.addRoute(it)
      })
      // 配置 `/` 路由的默认跳转地址
      router.addRoute({
        path: '/',
        redirect: findRootPathRoute(accessRoutes),
        meta: {
          hidden: true,
        },
      })
      // 这个路由一定要放在最后
      router.addRoute({
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        meta: {
          hidden: true,
        },
      })
      this.permissionRoutes = [...constantRoutes, ...accessRoutes]
    },
    isEmptyPermissionRoute() {
      return !this.permissionRoutes || this.permissionRoutes.length === 0
    },
    reset() {
      this.$reset()
    },
  },
})

export default usePermissionStore
