import { DeviceType } from '@/store/types'

export const projectName = 'Arco Work'

export default {
  theme: 'light',
  sideTheme: 'white',
  themeColor: '#165dff',
  projectName,
  layoutMode: 'ltr',
  sideWidth: 210,
  pageAnim: 'opacity',
  isShowTabbar: true,
  isFixedNavBar: true,
  isOpenWaterMark: false,
  waterMark: projectName,
  deviceType: DeviceType.PC,
  isGray: false,
  isCollapse: false,
  actionBar: {
    isShowSearch: true,
    isShowMessage: true,
    isShowRefresh: true,
    isShowFullScreen: true,
  },
}
