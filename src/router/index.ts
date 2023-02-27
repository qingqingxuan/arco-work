import { mapTwoLevelRouter } from '@/store/help'
import { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoutes, defaultPathRoute } from './routes/constants'

const Layout = () => import('@/layouts/Layout.vue')

export const extraRoutes = [
  {
    path: '/params-info',
    name: 'paramsInfo',
    component: Layout,
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

const router = createRouter({
  history: createWebHashHistory(),
  routes: mapTwoLevelRouter([...constantRoutes, ...extraRoutes, defaultPathRoute]),
})

export default router

export function setupRouter(app: App) {
  app.use(router)
}
