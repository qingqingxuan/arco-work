import { LAYOUT } from '@/store/keys'

export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/redirect',
    component: LAYOUT,
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
    component: LAYOUT,
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
