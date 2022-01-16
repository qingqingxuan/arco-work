import { APP_SETTING_INFO } from '@/store/keys'

export const projectName = 'Arco Work'
const settingInfo = JSON.parse(localStorage.getItem(APP_SETTING_INFO) || '{}')
interface Setting {
  projectName: string
  theme: 'light' | 'dark'
  sideTheme: 'dark' | 'white' | 'blue' | 'image'
  themeColor: string
  layoutMode: 'ltr' | 'ttb' | 'lcr'
  sideWidth: number
  pageAnim: 'fade' | 'opacity' | 'down' | 'scale'
  isShowTabbar: boolean
  isFixedNavBar: boolean
  isOpenWaterMark: boolean
  isGray: boolean
  waterMark: string
  actionBar: {
    isShowSearch: boolean
    isShowMessage: boolean
    isShowRefresh: boolean
    isShowFullScreen: boolean
  }
}

export default Object.assign(
  {
    theme: 'light',
    sideTheme: 'white',
    themeColor: 'cyan@#165dff',
    projectName,
    layoutMode: 'ltr',
    sideWidth: 210,
    pageAnim: 'opacity',
    isShowTabbar: true,
    isFixedNavBar: true,
    isOpenWaterMark: false,
    waterMark: projectName,
    isGray: false,
    actionBar: {
      isShowSearch: true,
      isShowMessage: true,
      isShowRefresh: true,
      isShowFullScreen: true,
    },
  },
  settingInfo
) as Setting
