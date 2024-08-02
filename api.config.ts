import Mock, { Random } from "mockjs"
import { path, method } from 'vite-plugin-api-serve/decorator'

const adminRoutes = [
  {
    menuUrl: '/index',
    menuName: 'Dashborad',
    routeName: 'dashborad',
    icon: 'icon-dashboard',
    parentPath: '',
    children: [
      {
        parentPath: '/index',
        menuUrl: '/index/home',
        menuName: '主控台',
        routeName: 'home',
      },
      {
        parentPath: '/index',
        menuUrl: '/index/work-place',
        menuName: '工作台',
        routeName: 'workPlace',
        isRootPath: true,
      },
    ],
  },
  {
    menuUrl: '/system',
    menuName: '系统管理',
    icon: 'icon-settings',
    parentPath: '',
    routeName: 'system',
    children: [
      {
        parentPath: '/system',
        menuUrl: '/system/department',
        menuName: '部门管理',
        badge: 'new',
        routeName: 'department',
        localFilePath: '/system/local-path/department',
      },
      {
        parentPath: '/system',
        menuUrl: '/system/user',
        menuName: '用户管理',
        badge: 'dot',
        routeName: 'user',
      },
      {
        parentPath: '/system',
        menuUrl: '/system/role',
        menuName: '角色管理',
        badge: '12',
      },
      {
        parentPath: '/system',
        menuUrl: '/system/menu',
        menuName: '菜单管理',
      },
    ],
  },
  {
    menuUrl: '/list',
    menuName: '表格demo',
    icon: 'icon-list',
    parentPath: '',
    children: [
      {
        parentPath: '/list',
        menuUrl: '/list/table-with-search',
        menuName: '表格搜索',
      },
      {
        parentPath: '/list',
        menuUrl: '/list/table-custom',
        menuName: '自定义表格',
      },
      {
        parentPath: '/list',
        menuUrl: '/list/list',
        menuName: '普通列表',
      },
      {
        parentPath: '/list',
        menuUrl: '/list/card-list',
        menuName: '卡片列表',
      },
    ],
  },
  {
    menuUrl: '/form',
    menuName: '表单demo',
    badge: 'dot',
    icon: 'icon-edit',
    parentPath: '',
    children: [
      {
        parentPath: '/form',
        menuUrl: '/form/base-form-view',
        menuName: '基本表单',
        cacheable: true,
      },
    ],
  },
  {
    menuUrl: '/other',
    menuName: '功能/组件',
    icon: 'icon-apps',
    parentPath: '',
    children: [
      {
        parentPath: '/other',
        menuUrl: '/other/chart',
        menuName: '图表',
        children: [
          {
            parentPath: '/other/chart',
            menuUrl: '/other/chart/icons',
            menuName: '图标',
          },
          {
            parentPath: '/other/chart',
            menuUrl: '/other/chart/echarts',
            menuName: 'echarts',
          },
          {
            parentPath: '/other/chart',
            menuUrl: '/other/chart/icon-select',
            menuName: '图标选择器',
          },
        ],
      },
      {
        parentPath: '/other',
        menuUrl: '/other/print',
        menuName: '打印',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/badge',
        menuName: '消息提示',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/clipboard',
        menuName: '剪贴板',
      },
      {
        parentPath: '/other',
        menuUrl: 'http://qingqingxuan.gitee.io/work-p-site',
        menuName: '外链',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/qrcode',
        menuName: '二维码',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/css-animation',
        menuName: 'CSS动画',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/flow',
        menuName: '流程图',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/player',
        menuName: '视频播放器',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/password-strong-page',
        menuName: '密码强度',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/cropper',
        menuName: '图片裁剪',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/iframe',
        menuName: '内嵌iframe',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/big-preview',
        menuName: '大图预览',
      },
    ],
  },
  {
    menuUrl: '/route-params',
    menuName: '路由参数',
    icon: 'icon-file',
    parentPath: '',
    children: [
      {
        parentPath: '/route-params',
        menuUrl: '/route-params/query',
        menuName: 'query参数',
      },
      {
        parentPath: '/route-params',
        menuUrl: '/route-params/params',
        menuName: 'params参数',
      },
    ],
  },
  {
    menuUrl: '/result',
    menuName: '结果页面',
    icon: 'icon-file',
    parentPath: '',
    children: [
      {
        parentPath: '/result',
        menuUrl: '/result/success',
        menuName: '成功页面',
      },
      {
        parentPath: '/result',
        menuUrl: '/result/fail',
        menuName: '失败页面',
      },
    ],
  },
  {
    menuUrl: '/editor',
    menuName: '编辑器',
    badge: '12',
    icon: 'icon-edit',
    parentPath: '',
    children: [
      {
        parentPath: '/editor',
        menuUrl: '/editor/rich-text',
        menuName: '富文本',
      },
      {
        parentPath: '/editor',
        menuUrl: '/editor/markdown',
        menuName: 'markdown',
      },
    ],
  },
  {
    menuUrl: '/excel',
    menuName: 'Excel',
    icon: 'icon-nav',
    parentPath: '',
    children: [
      {
        parentPath: '/excel',
        menuUrl: '/excel/export-excel',
        menuName: '导出Excel',
      },
      {
        parentPath: '/excel',
        menuUrl: '/excel/export-rows-excel',
        menuName: '导出选中行',
      },
    ],
  },
  {
    menuUrl: '/draggable',
    menuName: '拖拽',
    icon: 'icon-drag-arrow',
    parentPath: '',
    children: [
      // {
      //   parentPath: '/draggable',
      //   menuUrl: '/draggable/dialog-draggable',
      //   menuName: '拖拽对话框',
      // },
      {
        parentPath: '/draggable',
        menuUrl: '/draggable/card-draggable',
        menuName: '卡片拖拽',
        cacheable: true,
      },
    ],
  },
  {
    menuUrl: '/next',
    menuName: '多级菜单',
    icon: 'icon-share-alt',
    parentPath: '',
    children: [
      {
        parentPath: '/next',
        menuUrl: '/next/menu1',
        menuName: 'menu-1',
        cacheable: true,
      },
      {
        parentPath: '/next',
        menuUrl: '/next/menu2',
        menuName: 'menu-2',
        children: [
          {
            parentPath: '/next/menu2',
            menuUrl: '/next/menu2/menu-2-1',
            menuName: 'menu-2-1',
            children: [
              {
                parentPath: '/next/menu2/menu-2-1',
                menuUrl: '/next/menu2/menu-2-1/menu-2-1-1',
                menuName: 'menu-2-1-1',
                cacheable: true,
              },
              {
                parentPath: '/next/menu2/menu-2-1',
                menuUrl: '/next/menu2/menu-2-1/menu-2-1-2',
                menuName: 'menu-2-1-2',
              },
            ],
          },
          {
            parentPath: '/next/menu2',
            menuUrl: '/next/menu2/menu-2-2',
            menuName: 'menu-2-2',
            cacheable: true,
          },
        ],
      },
    ],
  },
  {
    menuUrl: '/map',
    menuName: '地图',
    icon: 'icon-location',
    children: [
      {
        parentPath: '/map',
        menuUrl: '/map/gaode',
        menuName: '高德地图',
      },
      {
        parentPath: '/map',
        menuUrl: '/map/baidu',
        menuName: '百度地图',
      },
    ],
  },
  {
    menuUrl: '/project',
    menuName: '项目信息',
    icon: 'icon-mind-mapping',
    isSingle: true,
    children: [
      {
        parentPath: '/project',
        menuUrl: '/project/infomation',
        menuName: '项目依赖',
      },
    ],
  },
]

const editorRoutes = [
  {
    menuUrl: '/other',
    menuName: '功能/组件',
    iconPrefix: 'iconfont',
    icon: 'appstore',
    parentPath: '',
    children: [
      {
        parentPath: '/other',
        menuUrl: '/other/chart',
        menuName: '图表',
        children: [
          {
            parentPath: '/other/chart',
            menuUrl: '/other/chart/icon',
            menuName: '图标',
            children: [
              {
                parentPath: '/other/chart/icon',
                menuUrl: '/other/chart/icon/icon-font',
                menuName: 'IconFont',
              },
              {
                parentPath: '/other/chart/icon',
                menuUrl: '/other/chart/icon/xicons',
                menuName: 'xicons',
              },
            ],
          },
          {
            parentPath: '/other/chart',
            menuUrl: '/other/chart/echarts',
            menuName: 'echarts',
          },
          {
            parentPath: '/other/chart',
            menuUrl: '/other/chart/icon-selector',
            menuName: '图标选择器',
          },
        ],
      },
      {
        parentPath: '/other',
        menuUrl: '/other/print',
        menuName: '打印',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/badge',
        menuName: '消息提示',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/clipboard',
        menuName: '剪贴板',
      },
      {
        parentPath: '/other',
        menuUrl: 'http://qingqingxuan.gitee.io/work-p-site',
        menuName: '外链',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/qrcode',
        menuName: '二维码',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/css-animation',
        menuName: 'CSS动画',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/flow',
        menuName: '流程图',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/player',
        menuName: '视频播放器',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/password-strong',
        menuName: '密码强度',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/cropper',
        menuName: '图片裁剪',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/iframe',
        menuName: '内嵌iframe',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/big-preview',
        menuName: '大图预览',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/city-selector',
        menuName: '省市区选择器',
      },
    ],
  },
  {
    menuUrl: '/next',
    menuName: '多级菜单',
    iconPrefix: 'iconfont',
    icon: 'Partition',
    parentPath: '',
    children: [
      {
        parentPath: '/next',
        menuUrl: '/next/menu1',
        menuName: 'menu-1',
        cacheable: true,
      },
      {
        parentPath: '/next',
        menuUrl: '/next/menu2',
        menuName: 'menu-2',
        children: [
          {
            parentPath: '/next/menu2',
            menuUrl: '/next/menu2/menu-2-1',
            menuName: 'menu-2-1',
            children: [
              {
                parentPath: '/next/menu2/menu-2-1',
                menuUrl: '/next/menu2/menu-2-1/menu-2-1-1',
                menuName: 'menu-2-1-1',
                cacheable: true,
              },
              {
                parentPath: '/next/menu2/menu-2-1',
                menuUrl: '/next/menu2/menu-2-1/menu-2-1-2',
                menuName: 'menu-2-1-2',
              },
            ],
          },
          {
            parentPath: '/next/menu2',
            menuUrl: '/next/menu2/menu-2-2',
            menuName: 'menu-2-2',
            cacheable: true,
          },
        ],
      },
    ],
  },
  {
    menuUrl: '/map',
    menuName: '地图',
    iconPrefix: 'iconfont',
    icon: 'location',
    children: [
      {
        parentPath: '/map',
        menuUrl: '/map/gaode',
        menuName: '高德地图',
      },
      {
        parentPath: '/map',
        menuUrl: '/map/baidu',
        menuName: '百度地图',
      },
    ],
  },
  {
    menuUrl: '/project',
    menuName: '项目信息',
    iconPrefix: 'iconfont',
    icon: 'detail',
    children: [
      {
        parentPath: '/project',
        menuUrl: '/project/infomation',
        menuName: '项目依赖',
      },
    ],
  },
]
function randomString(length: number) {
  const str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = ''
  for (let i = length; i > 0; --i) {
    result += str[Math.floor(Math.random() * str.length)]
  }
  return result
}

function computePageSize(totalSize: number, page: number, pageSize: number) {
  return Math.abs(totalSize - pageSize * page >= 0 ? pageSize : totalSize - pageSize * page)
}

const totalSize = 30

export default class DevApiServeController {
  /**
   * 用户登录
   * @returns 
   */
  @path('/login')
  @method('POST')
  onLogin({ body }: any) {
    const username = body.username
    const data: any = {}
    const baseData: any = {}
    if (username === 'admin') {
      baseData.code = 200
      baseData.msg = '登录成功'
      data.nickName = '超级管理员'
      data.userName = 'admin'
      data.userId = 1
      data.roleId = 1
      data.token = randomString(100)
      data.roles = [
        {
          roleCode: 'ROLE_admin',
          roleId: 1,
          roleName: '超级管理员',
        },
      ]
      baseData.data = data
    } else if (username === 'editor') {
      baseData.code = 200
      baseData.msg = '登录成功'
      data.nickName = '编辑员'
      data.userName = 'editor'
      data.userId = 2
      data.roleId = 2
      data.token = randomString(100)
      data.roles = [
        {
          roleCode: 'ROLE_editor',
          roleId: 2,
          roleName: '网站编辑人员',
        },
      ]
      baseData.data = data
    } else {
      baseData.code = 500
      baseData.data = ''
      baseData.msg = '用户名或密码错误'
    }
    return baseData
  }

  /**
   * 根据用户角色获取菜单权限列表
   * @returns 
   */
  @path('/getMenusByRoleId')
  @method('POST')
  onGetMenuListByRoleId({ body }: any) {
    const roleId = body.roleId
    if (parseInt(roleId) === 1) {
      return { code: 200, data: adminRoutes, msg: '获取菜单列表成功' }
    } else if (parseInt(roleId) === 2) {
      // 编辑
      return {
        code: 200,
        data: editorRoutes,
        msg: '获取菜单列表成功',
      }
    } else {
      throw new Error('获取菜单失败')
    }
  }

  /**
   * 获取部门管理列表数据
   * @returns 
  */
  @path('/getDepartmentList')
  @method('POST')
  onGetDepartmentList() {
    return {
      code: 200,
      msg: 'success',
      totalSize: 30,
      data: [
        {
          id: 1,
          name: '总裁办',
          depCode: 'dp_code_manager', // 0男 1女
          order: 1,
          createTime: Date.now(),
          status: 0, // 0 禁用 1正常
        },
        {
          id: 2,
          name: '市场部',
          depCode: 'dp_code_marketing', // 0男 1女
          order: 1,
          createTime: Date.now(),
          status: 1, // 0 禁用 1正常,
          children: [
            {
              id: 3,
              parentId: 2,
              name: '市场一部',
              depCode: 'dp_code_marketing_1', // 0男 1女
              order: 1,
              createTime: Date.now(),
              status: 1, // 0 禁用 1正常
            },
            {
              id: 4,
              parentId: 2,
              name: '市场二部',
              depCode: 'dp_code_marketing_2', // 0男 1女
              order: 1,
              createTime: Date.now(),
              status: 1, // 0 禁用 1正常
            },
          ],
        },
        {
          id: 5,
          name: '技术部',
          depCode: 'dp_code_technology', // 0男 1女
          order: 1,
          createTime: Date.now(),
          status: 1, // 0 禁用 1正常
        },
        {
          id: 6,
          name: '销售部',
          depCode: 'dp_code_sale', // 0男 1女
          order: 1,
          createTime: Date.now(),
          status: 1, // 0 禁用 1正常
        },
      ],
    }
  }

  /**
   * 获取角色列表数据
   * @returns 
   */
  @path('/getRoleList')
  @method('POST')
  onGetRoleList() {
    return {
      code: 200,
      msg: 'success',
      totalSize: 30,
      data: [
        {
          id: 1,
          name: '超级管理员',
          roleCode: 'ROLE_admin',
          description: '超级管理员',
          createTime: Date.now(),
        },
        {
          id: 2,
          name: '编辑员',
          roleCode: 'ROLE_editor',
          description: '编辑员',
          createTime: Date.now(),
        },
      ],
    }
  }

  /**
   * 获取菜单列表数据
   * @returns 
   */
  @path('/getMenuList')
  @method('POST')
  onGetMenuList() {
    return {
      code: 200,
      msg: 'success',
      data: adminRoutes,
    }
  }

  /**
   * 获取菜单列表数据
   * @returns 
   */
  @path('/getAllMenuByRoleId')
  @method('POST')
  onGetAllMenuByRoleId() {
    return {
      code: 200,
      msg: 'success',
      data: adminRoutes,
    }
  }

  /**
   * 获取用户列表数据
   * @returns 
   */
  @path('/getUserList')
  @method('POST')
  onGetUserList({ body }: any) {
    const { page, pageSize = 10 } = body
    const size = computePageSize(totalSize, page, pageSize)
    return Mock.mock({
      code: 200,
      msg: 'success',
      pageInfo: {
        totalSize,
        page,
      },
      [`data|${size}`]: [
        {
          'id|+1': 1,
          nickName: () => {
            return Random.name()
          },
          'gender|0-1': 0, // 0男 1女
          'departmentId|1-6': 1,
          'roleId|1-2': 1,
          mobile: '18800000000',
          email: '123456789@123.com',
          lastLoginTime: Random.now('yyyy-MM-dd HH:mm:ss'),
          lastLoginIp: function () {
            return Random.ip()
          },
          'status|0-1': 1, // 0 禁用 1正常
        },
      ],
    })
  }

  /**
   * 获取表格列表数据
   * @returns 
   */
  @path('/getTableList')
  @method('POST')
  onGetTableList({ body }: any) {
    const { page, pageSize = 10 } = body
    const size = computePageSize(totalSize, page, pageSize)
    return Mock.mock({
      code: 200,
      msg: 'success',
      pageInfo: {
        totalSize,
        page,
      },
      [`data|${size}`]: [
        {
          'id|+1': 1,
          nickName: function () {
            return Random.name()
          },
          'age|0-100': 50,
          avatar: '/static/images/img_avatar_01.jpeg',
          'gender|0-1': 0, // 0男 1女
          'vip|0-1': 0, // 0不是 1是
          address: function () {
            return Random.city(true)
          },
          lastLoginTime: Random.now('yyyy-MM-dd HH:mm:ss'),
          lastLoginIp: function () {
            return Random.ip()
          },
          'status|0-1': 1, // 0 禁用 1正常
        },
      ],
    })
  }
}
