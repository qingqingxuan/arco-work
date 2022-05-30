import { App } from 'vue'
import { toHump } from '../utils'
export default {
  install(app: App, options: any) {
    const { getComponentName } = options
    const components = import.meta.globEager('./**/*.{vue,tsx}')
    Object.keys(components).forEach((it: string) => {
      const component = components[it]
      app.component(component.default.name || toHump(getComponentName(it)), component.default)
    })
  },
}
