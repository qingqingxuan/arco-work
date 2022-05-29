import { Ref, UnwrapRef } from 'vue'
import { RouteRecordRaw, RouteMeta } from 'vue-router'
import CacheView from './cached-view'
import VisitedView from './visited-view'

export interface RouteMetaType extends RouteMeta {
  icon?: string
  title?: string
  cacheable?: boolean
  affix?: boolean
}

export type RouteRecordRawWithHidden = RouteRecordRaw & {
  fullPath?: string
  icon?: string
  hidden?: boolean
  params?: Record<string, any>
  query?: Record<string, any>
}

export interface SplitTab {
  label: string
  iconPrefix?: string | unknown
  icon: string
  fullPath: string
  children?: Array<RouteRecordRawWithHidden>
  checked: Ref<UnwrapRef<boolean>>
}

// export type RouteRecordRawWithHidden = RouteRecordRaw & RouteLocationNormalized & { hidden?: boolean }

export enum LayoutMode {
  LTR = 'ltr',
  LCR = 'lcr',
  TTB = 'ttb',
}

export enum DeviceType {
  PC = 'pc',
  PAD = 'pad',
  MOBILE = 'mobile',
}

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum SideTheme {
  DARK = 'dark',
  WHITE = 'white',
  BLUE = 'blue',
  IMAGE = 'image',
}

export interface StateType {
  permissionRoutes: Array<RouteRecordRawWithHidden>
  visitedView: Array<RouteRecordRawWithHidden>
  cachedView: Array<string>
}

export interface StoreType extends CacheView, VisitedView {
  state: UnwrapRef<StateType>
  start: (params: any) => void
  getSplitTabs: () => Array<RouteRecordRawWithHidden>
  initPermissionRoute: (routes: Array<RouteRecordRaw>) => void
  isEmptyPermissionRoute: () => boolean
  reset: () => void
}
