import { App } from 'vue'
import { toHump } from '../utils'
export default {
  install(app: App, options: any) {
    const { getComponentName } = options
    const components = import.meta.glob('./**/*.{vue,tsx}', { eager: true })
    Object.keys(components).forEach((it: string) => {
      const component = components[it]
      app.component(
        (component as any).default.name || toHump(getComponentName(it)),
        (component as any).default
      )
    })
  },
}
