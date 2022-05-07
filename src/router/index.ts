import { mapTwoLevelRouter } from '@/utils'
import { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const Layout = () => import('@/layouts/Layout.vue')

export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    meta: {
      noShowTabbar: true,
    },
    children: [
      {
        path: '/redirect/:path(.*)*',
        component: (): any => import('@/views/redirect/index.vue'),
      },
    ],
  },
  {
    path: '/personal',
    name: 'personal',
    component: Layout,
    hidden: true,
    meta: {
      title: '个人中心',
    },
    children: [
      {
        path: 'info',
        component: () => import('@/views/personal/index.vue'),
        meta: {
          title: '个人中心',
        },
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    hidden: true,
    component: () => import('@/views/exception/404.vue'),
  },
  {
    path: '/500',
    name: '500',
    hidden: true,
    component: () => import('@/views/exception/500.vue'),
  },
  {
    path: '/403',
    name: '403',
    hidden: true,
    component: () => import('@/views/exception/403.vue'),
  },
]

export const extraRoutes = [
  {
    path: '/params-info',
    name: 'paramsInfo',
    component: Layout,
    hidden: true,
    meta: {
      title: '路由参数',
    },
    children: [
      {
        path: 'query',
        component: () => import('@/views/route-params/query-details.vue'),
        meta: {
          title: 'query参数详情',
        },
      },
      {
        path: 'params/:id',
        name: 'paramsDetails',
        component: () => import('@/views/route-params/params-details.vue'),
        meta: {
          title: 'params参数详情',
        },
      },
    ],
  },
]

export const asyncRoutes = [
  {
    path: '/index',
    component: Layout,
    name: 'Index',
    meta: {
      title: 'Dashboard',
      iconPrefix: 'iconfont',
      icon: 'icon-dashboard',
    },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: (): any => import('@/views/index/main.vue'),
        meta: {
          title: '主控台',
          affix: true,
          cacheable: true,
        },
      },
      {
        path: 'work-place',
        name: 'WorkPlace',
        component: (): any => import('@/views/index/work-place.vue'),
        meta: {
          title: '工作台',
        },
      },
    ],
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: mapTwoLevelRouter([...constantRoutes, ...extraRoutes]),
})

export default router

export function setupRouter(app: App) {
  app.use(router)
}
