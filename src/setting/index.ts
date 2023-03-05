import { DeviceType } from '@/store/types'

export const projectName = 'Arco Work'

export default {
  theme: 'light',
  sideTheme: 'white',
  themeColor: '#165dff',
  projectName,
  layoutMode: 'ttb',
  sideWidth: 210,
  pageAnim: 'opacity',
  isFixedNavBar: true,
  deviceType: DeviceType.PC,
  isCollapse: false,
  flexMainHeight: false,
  mainHeight: document.body.clientHeight,
  actionBar: {
    isShowSearch: true,
    isShowMessage: true,
    isShowRefresh: true,
    isShowFullScreen: true,
  },
}
