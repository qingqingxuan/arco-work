import { Ref, UnwrapRef } from 'vue'
import { RouteRecordRaw } from 'vue-router'

export interface UserState {
  userId: number
  token: string
  roleId: number
  roles: string[] | null
  userName: string
  nickName: string
  avatar: string
}
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

export enum PageAnim {
  FADE = 'fade',
  OPACITY = 'opacity',
  DOWN = 'down',
  SCALE = 'scale',
}

export interface AppConfigState {
  projectName: string
  theme: ThemeMode
  sideTheme: SideTheme
  themeColor: string
  layoutMode: LayoutMode
  deviceType: DeviceType
  sideWidth: number
  pageAnim: PageAnim
  isFixedNavBar: boolean
  isCollapse: boolean
  actionBar: {
    isShowSearch: boolean
    isShowMessage: boolean
    isShowRefresh: boolean
    isShowFullScreen: boolean
  }
}

export interface MenuOption {
  key: string | undefined
  label: string | undefined
  icon: string | undefined
  children: Array<MenuOption> | null
}

export interface SplitTab {
  label: string
  iconPrefix?: string | unknown
  icon: string
  fullPath: string
  children?: Array<RouteRecordRaw>
  checked: Ref<UnwrapRef<boolean>>
}

export interface OriginRoute {
  parentPath?: string
  menuUrl: string
  menuName?: string
  routeName?: string
  hidden?: boolean
  outLink?: string
  affix?: boolean
  cacheable?: boolean
  isRootPath?: boolean
  iconPrefix?: string
  icon?: string
  badge?: string | number
  isSingle?: boolean
  localFilePath?: string
  children?: Array<OriginRoute>
}
