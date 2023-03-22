## 2023-3-22(v: 3.0.2)

- 升级：升级 `arco-design` 版本到 `v2.44.2`

## 2023-3-14(v: 3.0.1)

- 修复：修复在获取菜单数据为空的时候造成系统死循环的异常

  涉及文件：
   
   - src/store/help/index.ts

- 修复：修复在`hmr`下 `transition` 动画执行会丢失进入页面的bug

  涉及文件：
   - src/layouts/Main.vue

- 优化：升级 `import.meta.globEager` 到 `import.meta.glob`

  涉及文件：
   - src/layouts/index.ts
   - src/components/index.ts

## 2023-3-10(v: 3.0.0)

  - 升级：全新升级登录页面和首页面UI

  - 修复：全新设计并修复 SortableTable.vue 组件报错问题。 涉及文件如下：
      - src/components/SortableTable.vue
      - src/types/components.ts
      - package.json （新增第三方依赖：sortablejs 声明依赖：@types/sortablejs）

  - 修复：添加 @typescript-eslint/parser eslint 依赖，修复在某些情况下报错信息： Parsing error: Cannot find module '@typescript-eslint/parser'


## 2023-2-20(v: 2.1.0)

- 优化：优化`路由` 以 `fullPath` 字段为主键，以支持相同路由，query参数不一致时导致路由参数缺失 
  
  涉及文件如下：
    - src/layouts/actions/index.vue
    - src/layouts/tabbar/index.vue
    - src/router/guard/visited.ts
    - src/store/help/index.ts
    - src/store/modules/visited-routes.ts


- 升级：升级 `arco-design` 版本到 `v2.43.1`

## 2022-12-14(v: 2.0.8)

- 优化：优化 `主体滑动` 样式

- 升级：升级 `arco-design` 版本到 `v2.41.0`

## 2022-11-18(v: 2.0.7)

- 升级：升级 `arco-design` 版本到 `v2.39.0`

- 修复：修复 `vite.config.ts` 中 `dotEnv` 报错

## 2022-10-24(v: 2.0.6)

- 适配：`arco-work` 适配 `pnpm` 包管理工具，在使用 `pnpm` 的时候不会产生报错信息

## 2022-10-18(v: 2.0.5)

- 移除多余的依赖，解决 `npm install` 报错

## 2022-10-08(v: 2.0.4)

- 升级：升级 `arco-design` 版本到 `v2.37.4`

- 优化：优化 `tabbar` 按钮样式

- 修复：修复 `.arco-trigger-popup` 样式问题

- 修复：修复在动态加载菜单的时候或者刷新页面的时候 `vue-router` 出现警告 `No match found for location with xxx` 信息。

## 2022-9-20(v: 2.0.3)

- 升级：升级 `arco-design` 版本到 `v2.37.1`

- 新增：适配 `上下` 分栏

## 2022-7-27(v: 2.0.2)

- 升级：升级 `arco-design` 版本到 `v2.35.2`

## 2022-6-27(v: 2.0.1)

- 升级：升级 `arco-design` 版本到 `v2.32.0`

- 新增：添加自定义 axios 的 request interceptor，方便使用 Pinia。

## 2022-5-30(v: 2.0.0)

- 升级：升级 `arco-design` 版本到 `v2.26.0`

- 优化：优化 `main.ts` 执行流程，优化代码

## 2022-5-10(v: 1.1.3)

- 升级：升级 `arco-design` 版本到 `v2.26.0`

- 优化：优化 `main.ts` 执行流程，优化代码

## 2022-5-3(v: 1.1.2)

- 升级：网络操作 api `post、get` 支持泛型功能

- 新增：新增 `FormRender` 组件，方便在构建表单项的时候，可以通过 `render`方法自定义元素

- 调整：调整 `TableHeader.vue` 中的组件布局样式

- 修复：修复 `Humburger.vue` 组件中 `展开和闭合`图标指示器显示不正确的 bug

- 修复：修复 `演示`页面部分 bug

- 新增：新增 `jsx` 编写组件的功能

  ```ts
  plugins: [
     ...
      vueJsx(),
     ...
    ],
  ```

- 新增：`FormRender` 中 添加常用的 `表单元素` 快捷渲染方式，如下：

  ```ts
  import {
    Checkbox,
    Input,
    InputNumber,
    Option,
    Select,
    SelectOptionData,
    SelectProps,
  } from '@arco-design/web-vue'
  import { AllowedComponentProps, h, Ref } from 'vue'

  export default function Render(props: any) {
    if (!props || !props.formItem) {
      throw new Error('miss formItem prop and check it')
    }
    return props.render(props.formItem, h)
  }

  export function renderInput(value: Ref<string>, props = {}) {
    return (
      <Input
        onUpdate:modelValue={(newValue) => {
          value.value = newValue
        }}
        modelValue={value.value}
        {...props}
      />
    )
  }
  ...
  ```

## 2022-4-23(v: 1.1.1)

- 优化：优化 `Tabbar` 按钮样式

- 升级：更改 `Vue Admin Work P` 名字为 `Admin Work Pro`

- 重要升级：菜单可以从本地路由中过滤

  - 之前的菜单都是根据接口数据从本地 `views` 中动态加载，但在某些场景下或者某些人的开发习惯，可能需要根据本地定义中的路由表（如：`src/router/index.ts` 中的 `asyncRoutes`）中动态加载。如果接口中的菜单配置项和本地路由表中的配置项重复，优先使用本地路由表中的配置项。
  - 在根据权限获取到菜单列表的时候，就可以根据以下三种方式加载路由：
    - 完全从 本地 `views` 中动态加载
    - 完全从 本地 `路由表` 中动态加载
    - 本地 `views` 和 本地 `路由表` 两种方式的结合。注：本地 `路由表`方式的 `优先级要高于` 本地 `views`的方式。（本项目默认的使用方式）

- 优化：把 `src/router/index.ts`中的路由分类

  - `constantRoutes` 存放一些系统页面，如`login`、`redirect`、`404`、`403`、`500`等
  - `asyncRoutes` 存放一些需要根据权限加载的路由
  - `extraRoutes` 存放一些由一级页面进入二级及多级页面，不需要在菜单中展示，同时也不需要根据权限加载的路由。如：列表详情页面

- 新增：在菜单数据结构中新增`routeName`属性，方便在有些时候可以自己命令菜单路由名称

  - 在定义路由的时候，需要指定 `name` 属性，项目目前使用的方式是根据 `menuUrl` 获取最后的路径为 `name` 属性值，如 `/system/department`，就会以 `department` 为 `name`属性。
  - 但在某些场景下，可能需要自定义 `name`，这个时候就可以根据 `routeName` 配置项来指定，如指定为 `my-department`。当没有配置此配置项时，还是会使用根据 `menuUrl` 获取最后的路径为 `name`属性值。

- 新增：在菜单数据结构中新增`localFilePath`属性，方便在有些时候可以自己自定义 `vue` 文件路径

  - 在动态加载路由的时候，系统会根据 `menuUrl` 从 `src/views` 中动态加载 `.vue` 文件。
  - 但在某些场景下，可能会根据自定义的 `path` 从 `src/views` 中动态加载 `.vue` 文件。
  - 注：`localFilePath` 在配置的时候要以`views`为参考，可以配置成，如：`system/department` 或者 `./system/department` 或者 `/system/department`。切记：不要加文件后缀名`.vue`

- 新增：在菜单数据结构中新增`isRootPath`属性，可以自定义 `/` 路径跳转的页面地址

  - 在动态加载路由的时候，会增加一个 `path` 为 `/` 的路由，在访问 `http://localhost:3000/` 的时候会加载此配置路由，此路由不方便指定具体的 `component`，但可以指定一个 `redirect` 属性，这样就可以动态配置此路由的跳转页面
  - 如果对某个具体的路由指定 `isRootPath` 为 `true` 的时候，会把此路由的 `path或者menuUrl` 指定为 `/` 路由的 `redirect`属性值
  - 注：
    - 如果没有指定任何路由为 `isRootPath`，则会以根据权限获取的菜单中的第一个元素的 `children` 属性的第一个元素的 `menuUrl` 指定为 `/` 路由的 `redirect`属性值
    - 如果指定了多个路由配置项 `isRootPath` 为 `true`，则会以按顺序获取第一个路由
    - 要指定到某个具体的叶子路由中，如果某个路由下面有 `children` 属性并且不为空，则判定该路由不是叶子路由

- 新增：`defaultRoutes` 为了在一开始对接项目的时候，后端人员还没有准备好菜单接口，导致前端开发者不能进入主页面。如果设置获取 `菜单` 的地址为空时，会加载此 `defaultRoutes`，否则会加载接口中的菜单数据

  - 在刚开始对接正式后台接口的时候，后端人员还没有准备好菜单接口，导致前端开发者不能进入主页面。这个时候可以先把 `根据角色获取菜单数据的接口` 置为 `''`，对应本项目中就是，`src/api/url.ts`中的以下地址

  ```ts
  // 在有接口的时候，要配置成真实的接口
  export const getMenuListByRoleId = '/getMenusByRoleId'
  // 在没有接口时候，可以先配置成 '' ，等后台人员提供了接口再进行修改成真实的接口
  export const getMenuListByRoleId = ''
  ```

  - 系统在获取 `getMenuListByRoleId` 地址的时候，发现不是真实的地址，就会加载 `defaultRoutes` 中的路由，以能进入系统的主页面，进行其它的开发工作

## 2022-4-11(v: 1.1.0)

- 升级：升级 `vue`版本到: `3.2.31`

- 升级：升级 `vue-router`版本到: `^4.0.14`

- 优化：移除 `arco-design-vue` 按需加载功能，防止首次加载太慢

- 修复: 修复 `tabbar`点击的时候，会出现滑动异常的 bug

- 修复: 修复 `personal` 在 vue-router 中 重复定义的 bug

- 修复: 在多个缓存页面的时候，切换页面可能会卡死的 bug

- 优化: 优化部分页面控制台出现警告的问题

## 2022-4-1(v: 1.0.1)

- 升级：升级 `arco-design-vue`组件库到版本: `2.21.2`

- 调整: 修改 `work-place` 页面，罗列出所有 `vue admin work` 版本

- 修复: 修复 `table`页面中有 `expand`选项的时候，不居中的 bug

- 修复: 在连续点击 `刷新页面按钮`的时候，会造成页面渲染失败的 bug

## 2022-3-6(v: 1.0.0)

- 升级：升级 `arco-design-vue`组件库到版本：2.18.0

- 升级: 升级`arco-design-vue`组件由原来的全部引入改成按需引入，新增第三方依赖：`unplugin-vue-components`，删除 `main.ts` 引入 `arco-design-vue`组件库的全局代码

- 新增: 添加 在用户状态失效时的拦截器，`UserTokenExpiredInterceptor`，当加载某个接口返回 400 状态时，判定用户状态失效，会自动跳转到登录页面

- 优化: 优化打包时某文件体积过大，新增 `vite.config.ts` 配置文件中 `rollup` 配置项，把`node_modules`中的依赖单独打成独立的文件

## 2022-1-16(v: 0.0.2)

- 升级：升级美化 `带有 表格 的页面` 功能，增加更多的配置

- 修复: 修复优化部分代码

- 新增: `pinia`第三方状态管理工具库 替换 `vuex`，并且删除 `vuex` 依赖库

- 升级: `vue`版本到 `3.2.26` 和 `arco design` 到 `^2.15.1`

- 删除: 删除 `layoutStore` 中用户相关的信息，保证 `用户信息` 的获取唯一入口是：`useUserStore`

- 升级：升级 `vite.config.ts` 的写法，在根目录下新增 `.ent.[mode]` 文件. 根据不同的场景配置不同的打包属性

## 2021-12-18(v: 0.0.1)

- 升级：升级 `arco design` 版本到 `v: 2.11.0`

- 修复：`menu` 菜单在 `dark` 或 `image` 模式下，图标颜色显示的问题

- 修复：`部门管理` 在展开时，会增加几行空白

- 优化：`ModaiDilaog` 组件超出滑动功能

- 优化：`breadcrumb` 重新调整设计

- 新增：`路由参数` 演示功能

- 优化：`登录页面`、`工作台`、`控制台` 的 UI
