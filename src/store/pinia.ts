import { createPinia } from 'pinia'
import { App } from 'vue'

const pinia = createPinia()

export function setupPinia(app: App) {
  app.use(pinia)
}

export default pinia
