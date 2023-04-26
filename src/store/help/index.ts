import { isExternal, toHump } from '@/utils'
import { resolve } from 'path-browserify'
import { ref } from 'vue'
import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import { MenuOption, OriginRoute, SplitTab } from '../types'
import { asyncRoutes } from '@/router/routes/async'
import { LAYOUT } from '../keys'

export function loadComponents() {
  return import.meta.glob('/src/views/**/*.vue')
}

export const asynComponents = loadComponents()

export function getComponent(it: OriginRoute) {
  return asynComponents[getFilePath(it)]
}

export function getFilePath(it: OriginRoute) {
  if (!it.localFilePath) {
    it.localFilePath = it.menuUrl
  }
  it.localFilePath = resolve('/', it.localFilePath)
  return '/src/views' + it.localFilePath + '.vue'
}

export function findRootPathRoute(routes: RouteRecordRaw[]) {
  if (!routes || routes.length === 0) {
    console.error(
      '系统加载菜单发生异常，有可能是在加载菜单的时候返回了空数据或者接口发生异常，如果您采用前端加载菜单的方式请确保/src/router/routes/default-route.ts文件里面有配置路由'
    )
    return '/login'
  }
  for (let index = 0; index < routes.length; index++) {
    const route = routes[index]
    const rootRoute = route.children?.find((it) => it.meta && it.meta.isRootPath)
    if (rootRoute) {
      return rootRoute.path
    }
  }
  return routes && routes.length > 0 && routes[0].children && routes[0].children.length > 0
    ? routes[0].children![0].path
    : '/login'
}

export function filterRoutesFromLocalRoutes(
  route: OriginRoute,
  localRoutes: Array<RouteRecordRaw>,
  path = '/'
) {
  const filterRoute = localRoutes.find((it) => {
    return resolve(path, it.path) === route.menuUrl
  })
  if (filterRoute) {
    filterRoute.meta = {
      title: route.menuName,
      affix: !!route.affix,
      cacheable: !!route.cacheable,
      icon: route.icon || 'icon-menu',
      badge: route.badge,
      hidden: !!route.hidden,
      isRootPath: !!route.isRootPath,
      isSingle: !!route.isSingle,
      ...filterRoute.meta,
    }
    const parentPath = resolve(path, filterRoute.path)
    if (
      Array.isArray(route.children) &&
      route.children.length > 0 &&
      Array.isArray(filterRoute.children) &&
      filterRoute.children.length > 0
    ) {
      const tempChildren: RouteRecordRaw[] = []
      route.children.forEach((it: any) => {
        const childFilterRoute = filterRoutesFromLocalRoutes(it, filterRoute.children!, parentPath)
        childFilterRoute && tempChildren.push(childFilterRoute)
      })
      filterRoute.children = tempChildren
    }
  }
  return filterRoute
}

export function isMenu(it: OriginRoute) {
  return it.children && it.children.length > 0
}

export function getNameByUrl(menuUrl: string) {
  const temp = menuUrl.split('/')
  return toHump(temp[temp.length - 1])
}

export function handleResponseMenus(menus: Array<any>) {
  const res: OriginRoute[] = []
  menus.forEach((it) => {
    const originRouteItem: OriginRoute = {
      affix: !!it.affix,
      cacheable: !!it.cacheable,
      hidden: !!it.hidden,
      isRootPath: !!it.rootPath,
      isSingle: !!it.single,
      badge: it.badge,
      icon: it.icon,
      iconPrefix: it.iconPrefix,
      localFilePath: it.component || '',
      menuUrl: it.path,
      menuName: it.title,
      routeName: it.routeName,
    }
    originRouteItem.children = handleResponseMenus(it.children || [])
    res.push(originRouteItem)
  })
  return res
}

export function generatorRoutes(res: Array<OriginRoute>) {
  const tempRoutes: Array<RouteRecordRaw> = []
  res.forEach((it) => {
    const isMenuFlag = isMenu(it)
    const localRoute = isMenuFlag ? filterRoutesFromLocalRoutes(it, asyncRoutes) : null
    if (localRoute) {
      tempRoutes.push(localRoute as RouteRecordRaw)
    } else {
      const route: RouteRecordRaw = {
        path: it.outLink && isExternal(it.outLink) ? it.outLink : it.menuUrl,
        name: it.routeName || getNameByUrl(it.menuUrl),
        component: isMenuFlag ? LAYOUT : getComponent(it),
        meta: {
          hidden: !!it.hidden,
          title: it.menuName,
          affix: !!it.affix,
          cacheable: !!it.cacheable,
          icon: it.icon || 'icon-menu',
          badge: it.badge,
          isRootPath: !!it.isRootPath,
          isSingle: !!it.isSingle,
        },
      }
      if (isMenuFlag) {
        route.children = generatorRoutes(it.children!) as never
      }
      tempRoutes.push(route)
    }
  })
  return tempRoutes
}

export function mapTwoLevelRouter(srcRoutes: Array<RouteRecordRaw>) {
  function addParentRoute(routes: any, parent: any, parentPath: string) {
    routes.forEach((it: RouteRecordRaw) => {
      if (!isExternal(it.path)) {
        it.path = resolve(parentPath, it.path)
      }
      parent.push(it)
      if (it.children && it.children.length > 0) {
        addParentRoute(it.children, parent, it.path)
      }
    })
  }
  if (srcRoutes && srcRoutes.length > 0) {
    const tempRoutes = [] as Array<any>
    srcRoutes.forEach((it) => {
      const route = { ...it }
      const parentRoutes = [] as Array<any>
      if (route.children && route.children.length > 0) {
        addParentRoute(route.children, parentRoutes, route.path)
      }
      parentRoutes && parentRoutes.length > 0 && (route.children = parentRoutes)
      tempRoutes.push(route)
    })
    return tempRoutes
  }
  return []
}

export function findAffixedRoutes(routes: Array<RouteLocationNormalized>) {
  const temp = [] as Array<RouteLocationNormalized>
  routes.forEach((it) => {
    if (it.meta && it.meta.affix) {
      if (!it.fullPath) {
        it.fullPath = it.path
      }
      temp.push(it)
    }
  })
  return temp
}

export function findCachedRoutes(routes: Array<RouteLocationNormalized>) {
  const temp = [] as Array<string>
  routes.forEach((it) => {
    if (it.name && it.meta && it.meta.cacheable) {
      temp.push(it.name as string)
    }
  })
  return temp
}

export function transfromMenu(originRoutes: Array<RouteRecordRaw>): Array<MenuOption> {
  if (!originRoutes) {
    return []
  }
  const tempMenus = [] as Array<MenuOption>
  originRoutes
    .filter((it) => (it.meta ? !it.meta.hidden : true))
    .forEach((it) => {
      const tempMenu: MenuOption = {
        key: it.path,
        label: it.meta?.title as string,
        icon: it.meta?.icon as string,
        children: null,
      }
      if (it.children) {
        if (it.meta && it.meta.isSingle && it.children.length === 1) {
          const lastItem = it.children[0] as RouteRecordRaw
          tempMenu.key = lastItem.path || tempMenu.key
          tempMenu.label = (
            lastItem.meta && lastItem.meta.title ? lastItem.meta?.title : tempMenu.label
          ) as string
          tempMenu.icon = (
            lastItem.meta && lastItem.meta.icon ? lastItem.meta?.icon : tempMenu.icon
          ) as string
          tempMenu.children = null
        } else {
          tempMenu.children = transfromMenu(it.children)
        }
      }
      tempMenus.push(tempMenu)
    })
  return tempMenus
}

export function transformSplitTabMenu(routes: Array<RouteRecordRaw>): Array<SplitTab> {
  const tempTabs = [] as Array<SplitTab>
  routes.forEach((it) => {
    const splitTab: SplitTab = {
      label: it.meta ? (it.meta?.title as string) : '',
      fullPath: it.path || '',
      iconPrefix: it.meta?.iconPrefix || 'icon',
      icon: it.meta ? (it.meta?.icon as any) : undefined,
      children: it.children as RouteRecordRaw[],
      checked: ref(false),
    }
    tempTabs.push(splitTab)
  })
  return tempTabs
}

export function findRouteByUrl(routes: Array<any>, path: string): RouteRecordRaw | null {
  if (!path || !routes) {
    return null
  }
  let tempRoute = null
  for (let index = 0; index < routes.length; index++) {
    const temp = routes[index]
    if (temp.path === path) {
      tempRoute = temp
      return tempRoute
    }
    if (temp.children) {
      tempRoute = findRouteByUrl(temp.children, path)
      if (tempRoute) {
        return tempRoute
      }
    }
  }
  return null
}
