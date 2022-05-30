import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router'
import './styles'
import { setupGlobalComponent } from '@/layouts'
import { setupPinia } from '@/store/pinia'
import setupRouterGuard from './router/guard'
// 如果需要对接正式的接口，需要下面代码注释或者删除
import { setupMock } from '../mock'

function setup() {
  const app = createApp(App)
  setupPinia(app)
  setupRouter(app)
  setupRouterGuard()
  setupGlobalComponent(app)
  // 如果需要对接正式的接口，需要下面代码注释或者删除
  setupMock()
  app.mount('#app')
}

// 启动项目
setup()
