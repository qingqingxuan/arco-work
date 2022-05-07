import { createApp } from 'vue'
import App from './App.vue'

import router, { setupRouter } from './router'
import './utils/router'

import './styles'
import { setupGlobalComponent } from '@/layouts'
import { setupPinia } from '@/store/pinia'
// 如果需要对接正式的接口，需要下面代码注释或者删除
import { setupMock } from '../mock'

function setup() {
  const app = createApp(App)
  setupPinia(app)
  setupRouter(app)
  setupGlobalComponent(app, {
    actions: {
      onPersonalCenter() {
        router.push('/personal')
      },
      onLogout() {
        router.replace({ path: '/login', query: { redirect: '/' } }).then(() => {
          window.location.reload()
        })
      },
    },
  })
  // 如果需要对接正式的接口，需要下面代码注释或者删除
  setupMock()
  app.mount('#app')
}

// 启动项目
setup()
