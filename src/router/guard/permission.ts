import useUserStore from '@/store/modules/user'
import usePermissionStore from '@/store/modules/permission'
import router from '..'

const whiteRoutes: string[] = ['/login', '/404', '/403', '/500']

function usePermissionGuard() {
  router.beforeEach(async (to) => {
    if (whiteRoutes.includes(to.path)) {
      return true
    }
    const userStore = useUserStore()
    if (userStore.isTokenExpire()) {
      return {
        path: '/login',
        // query: { redirect: to.fullPath },
        replace: true,
      }
    }
    const permissionStore = usePermissionStore()
    const isEmptyRoute = permissionStore.isEmptyPermissionRoute()
    if (isEmptyRoute) {
      const result = await permissionStore.initPermissionRoute()
      if (result) {
        return { ...to, replace: true }
      } else {
        return {
          path: '/login',
          // query: { redirect: to.fullPath },
          replace: true,
        }
      }
    }
    return true
  })
}

export default usePermissionGuard
