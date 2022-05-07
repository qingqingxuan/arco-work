import '../styles/transition.css'
import store from '../store'
import { App, inject } from 'vue'
import { StoreType } from '../types/store'
import { TinyEmitter } from 'tiny-emitter'

import { toHump } from '../utils'
import components from '../components'

import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import '@arco-design/web-vue/dist/arco.css'
import ArcoVue from '@arco-design/web-vue/es/arco-vue'

function getComponentName(key: string) {
  if (!key) {
    return ''
  }
  const paths = key.split('/')
  const name = paths
    .filter((it) => !!it && it !== '.')
    .reverse()
    .find((it) => it !== 'index.vue' && it !== 'index.ts' && it !== 'index.js')
    ?.replace('.vue', '')
  return name || ''
}

export function registerComponents(app: App) {
  const components = import.meta.globEager('./**.vue')
  const componentsTsx = import.meta.globEager('./**.tsx')
  Object.keys({ ...components, ...componentsTsx }).forEach((it: string) => {
    const component = components[it]
    app.component(component.default.name || toHump(getComponentName(it)), component.default)
  })
}

const key = Symbol('layout_store')
export const emitKey = Symbol('tiny-emit')

function install(app: App, options?: any) {
  app.use(ArcoVue)
  app.use(ArcoVueIcon)
  registerComponents(app)
  app.use(components, { getComponentName })
  delete options?.registerElement
  store.start(options || {})
  app.config.globalProperties.$layoutStore = store
  app.provide(key, store)
  app.provide(emitKey, new TinyEmitter())
}

export function useLayoutStore() {
  return inject<StoreType>(key) as StoreType
}

export { default as Layout } from './Layout.vue'

export function setupGlobalComponent(app: App, options?: any) {
  install(app, options)
}
