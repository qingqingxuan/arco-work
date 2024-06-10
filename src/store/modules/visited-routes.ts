import { defineStore } from 'pinia'
import { RouteLocationNormalized } from 'vue-router'
import pinia from '../pinia'
// import useCachedRouteStore from '@/store/modules/cached-routes'
// import { findCachedRoutes } from '../help'

const visitedRoutes = JSON.parse(localStorage.getItem('visited-routes') || '[]')

const useVisitedRouteStore = defineStore('visited-routes', {
  state: () => {
    return {
      visitedRoutes: visitedRoutes as RouteLocationNormalized[],
      isLoadAffix: false,
    }
  },
  getters: {
    getVisitedRoutes(state) {
      return state.visitedRoutes
    },
  },
  actions: {
    initAffixRoutes(affixRoutes: RouteLocationNormalized[]) {
      affixRoutes.reverse().forEach((affixRoute) => {
        if (!this.visitedRoutes.find((it) => it.fullPath === affixRoute.fullPath)) {
          this.visitedRoutes.unshift(affixRoute)
        }
      })
      this.isLoadAffix = true
    },
    addVisitedRoute(route: RouteLocationNormalized) {
      return new Promise((resolve) => {
        if (!this.visitedRoutes.find((it) => it.fullPath === route.fullPath)) {
          // if (route.name) {
          //   const cachedRoutesStore = useCachedRouteStore()
          //   if (!cachedRoutesStore.cachedRoutes.includes(route.name as string)) {
          //     cachedRoutesStore.cachedRoutes.push(route.name as string)
          //   }
          // }
          this.visitedRoutes.push(route)

          this.persistentVisitedView()
        }
        resolve(route)
      })
    },
    removeVisitedRoute(route: RouteLocationNormalized) {
      return new Promise<string>((resolve) => {
        this.visitedRoutes.splice(this.visitedRoutes.indexOf(route), 1)
        // if (route.name) {
        //   const cachedRoutesStore = useCachedRouteStore()
        //   if (cachedRoutesStore.cachedRoutes.includes(route.name as string)) {
        //     cachedRoutesStore.cachedRoutes.splice(
        //       cachedRoutesStore.cachedRoutes.indexOf(route.name as string),
        //       1
        //     )
        //   }
        // }
        this.persistentVisitedView()
        resolve(this.findLastRoutePath())
      })
    },
    findLastRoutePath() {
      return this.visitedRoutes && this.visitedRoutes.length > 0
        ? this.visitedRoutes[this.visitedRoutes.length - 1].fullPath
        : '/'
    },
    closeLeftVisitedView(selectRoute: RouteLocationNormalized) {
      return new Promise((resolve) => {
        const selectIndex = this.visitedRoutes.indexOf(selectRoute)
        if (selectIndex !== -1) {
          this.visitedRoutes = this.visitedRoutes.filter((it, index) => {
            return (it.meta && it.meta.affix) || index >= selectIndex
          })
          // const cachedRoutesStore = useCachedRouteStore()
          // cachedRoutesStore.setCachedRoutes(findCachedRoutes(this.visitedRoutes))
          this.persistentVisitedView()
        }
        resolve(selectRoute)
      })
    },
    closeRightVisitedView(selectRoute: RouteLocationNormalized) {
      return new Promise((resolve) => {
        const selectIndex = this.visitedRoutes.indexOf(selectRoute)
        if (selectIndex !== -1) {
          this.visitedRoutes = this.visitedRoutes.filter((it, index) => {
            return (it.meta && it.meta.affix) || index <= selectIndex
          })
          // const cachedRoutesStore = useCachedRouteStore()
          // cachedRoutesStore.setCachedRoutes(findCachedRoutes(this.visitedRoutes))
          this.persistentVisitedView()
        }
        resolve(selectRoute)
      })
    },
    closeAllVisitedView() {
      return new Promise<void>((resolve) => {
        this.visitedRoutes = this.visitedRoutes.filter((it) => {
          return it.meta && it.meta.affix
        })
        // const cachedRoutesStore = useCachedRouteStore()
        // cachedRoutesStore.setCachedRoutes(findCachedRoutes(this.visitedRoutes))
        this.persistentVisitedView()
        resolve()
      })
    },
    persistentVisitedView() {
      const tempPersistendRoutes = this.visitedRoutes.map((it) => {
        return {
          fullPath: it.fullPath,
          meta: it.meta,
          name: it.name,
          path: it.path,
        }
      })
      localStorage.setItem(this.$id, JSON.stringify(tempPersistendRoutes))
    },
    restoreVisitedView() {
      this.$reset()
    },
  },
  // 由于需要自定义持久化过程，所以这里就不能用插件来实现
  // presist: {
  //   enable: true,
  // },
})

export function useVisitedRoutesContext() {
  return useVisitedRouteStore(pinia)
}

export default useVisitedRouteStore
