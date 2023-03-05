import useAppConfigStore from '@/store/modules/app-config'
import router from '..'

// canFlexHeightRoutes 是可以让内容区变换高度的路由名称数组，也可以是路由地址，可以根据实际的情况去填写内容
const canFlexHeightRoutes = ['Home']

function useFlexMainHeightGuard() {
  router.beforeEach((to) => {
    const appConfigStore = useAppConfigStore()
    appConfigStore.setFlexMainHeight(canFlexHeightRoutes.includes(to.name as string))
    return true
  })
}

export default useFlexMainHeightGuard
