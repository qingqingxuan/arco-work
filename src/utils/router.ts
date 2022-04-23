import router, { constantRoutes, asyncRoutes } from '../router'
import Cookies from 'js-cookie'
import { post } from '@/api/http'
import { getMenuListByRoleId } from '@/api/url'
import { RouteRecordRaw } from 'vue-router'
import { isExternal, mapTwoLevelRouter, toHump } from '.'
import { Layout } from '@/layouts'
import layoutStore from '@/store'
import { defineAsyncComponent } from 'vue'
import LoadingComponent from '@/layouts/loading/index.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { resolve } from 'path-browserify'
import { USER_TOKEN_KEY } from '@/store/keys'
import useUserStore from '@/store/modules/user'
import pinia from '@/store/pinia'

const userStore = useUserStore(pinia)

NProgress.configure({
  showSpinner: false,
})

interface OriginRoute {
  menuUrl: string
  menuName?: string
  routeName?: string
  hidden?: boolean
  outLink?: string
  affix?: boolean
  cacheable?: boolean
  iconPrefix?: string
  icon?: string
  badge?: string | number
  isSingle: boolean
  localFilePath?: string
  children: Array<OriginRoute>
}

type RouteRecordRawWithHidden = RouteRecordRaw & { hidden: boolean }

async function getRoutes() {
  try {
    const res = await post({
      url: getMenuListByRoleId,
      data: {
        userId: userStore.userId,
        roleId: userStore.roleId,
      },
    })
    return generatorRoutes(res.data)
  } catch (error) {
    console.log(
      '请检查是否清空Cookie 和 localStorage 里面的数据；如果已经对接真实接口，请检查菜单接口是否可用'
    )
    return []
  }
}

function loadComponents() {
  return import.meta.glob('../views/**/*.vue')
}

const asynComponents = loadComponents()

function getFilePath(it: OriginRoute) {
  if (!it.localFilePath) {
    it.localFilePath = it.menuUrl
  }
  it.localFilePath = resolve('/', it.localFilePath)
  return '../views' + it.localFilePath + '.vue'
}

function getComponent(it: OriginRoute) {
  return defineAsyncComponent({
    loader: asynComponents[getFilePath(it)],
    loadingComponent: LoadingComponent,
  })
}

function getCharCount(str: string, char: string) {
  const regex = new RegExp(char, 'g')
  const result = str.match(regex)
  const count = !result ? 0 : result.length
  return count
}

function isMenu(path: string) {
  return getCharCount(path, '/') === 1
}

function getNameByUrl(menuUrl: string) {
  const temp = menuUrl.split('/')
  return toHump(temp[temp.length - 1])
}

function filterRoutesFromLocalRoutes(
  route: OriginRoute,
  localRoutes: Array<RouteRecordRaw>,
  path = '/'
) {
  const filterRoute = localRoutes.find((it) => {
    return resolve(path, it.path) === route.menuUrl
  })
  if (filterRoute) {
    const parentPath = resolve(path, filterRoute.path)
    if (
      Array.isArray(route.children) &&
      route.children.length > 0 &&
      Array.isArray(filterRoute.children) &&
      filterRoute.children.length > 0
    ) {
      const tempChildren: RouteRecordRaw[] = []
      route.children.forEach((it) => {
        const childFilterRoute = filterRoutesFromLocalRoutes(it, filterRoute.children!, parentPath)
        childFilterRoute && tempChildren.push(childFilterRoute)
      })
      filterRoute.children = tempChildren
    }
  }
  return filterRoute
}

function generatorRoutes(res: Array<OriginRoute>) {
  const tempRoutes: Array<RouteRecordRawWithHidden> = []
  res.forEach((it) => {
    const isMenuFlag = isMenu(it.menuUrl)
    const localRoute = isMenuFlag ? filterRoutesFromLocalRoutes(it, asyncRoutes) : null
    if (localRoute) {
      tempRoutes.push(localRoute as RouteRecordRawWithHidden)
    } else {
      const route: RouteRecordRawWithHidden = {
        path: it.outLink && isExternal(it.outLink) ? it.outLink : it.menuUrl,
        name: it.routeName || getNameByUrl(it.menuUrl),
        hidden: !!it.hidden,
        component: isMenuFlag ? Layout : getComponent(it),
        meta: {
          title: it.menuName,
          affix: !!it.affix,
          cacheable: !!it.cacheable,
          icon: it.icon || 'icon-menu',
          badge: it.badge,
          isSingle: !!it.isSingle,
        },
      }
      if (it.children) {
        route.children = generatorRoutes(it.children)
      }
      tempRoutes.push(route)
    }
  })
  return tempRoutes
}

const whiteRoutes: string[] = ['/login']

function isTokenExpired(): boolean {
  const token = Cookies.get(USER_TOKEN_KEY)
  return !!token
}
router.beforeEach(async (to) => {
  NProgress.start()
  if (whiteRoutes.includes(to.path)) {
    return true
  } else {
    if (!isTokenExpired()) {
      return {
        path: '/login',
        query: { redirect: to.fullPath },
      }
    } else {
      const isEmptyRoute = layoutStore.isEmptyPermissionRoute()
      if (isEmptyRoute) {
        // 加载路由
        const accessRoutes = await getRoutes()
        const mapRoutes = mapTwoLevelRouter(accessRoutes)
        mapRoutes.forEach((it: any) => {
          router.addRoute(it)
        })
        router.addRoute({
          path: '/:pathMatch(.*)*',
          redirect: '/404',
          hidden: true,
        } as RouteRecordRaw)
        layoutStore.initPermissionRoute([...constantRoutes, ...accessRoutes])
        return { ...to, replace: true }
      } else {
        return true
      }
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
