import { FormItemProps } from '@/hooks/form'
import { TableColumnPops } from '@/hooks/table'
import {
  FormInstance,
  Input,
  RadioGroup,
  Switch,
  TreeNodeData,
  TreeSelect,
} from '@arco-design/web-vue'
import IconSelector from '@/components/IconSelector.vue'
import { ref, h, reactive, computed, unref } from 'vue'

export type MenuModel = {
  id: number
  pid: number | string
  title: string
  routeName: string
  iconPrefix: string
  icon: string
  type: number
  path: string
  component: string
  badge: string
  rootPath: number
  affix: number
  cacheable: number
  single: number
  sort: number
  status: number
  children?: MenuModel[]
}

function handleParentList(models: MenuModel[]) {
  const parentList: TreeNodeData[] = []
  models.forEach((it) => {
    if (it.type === 0) {
      const item: TreeNodeData = { key: it.id, title: it.title, children: [] }
      if (item.children) {
        item.children = handleParentList(it.children!)
      }
      parentList.push(item)
    }
  })
  return parentList
}

function getParentMenuPath(models: MenuModel[], id: number) {
  let path = ''
  for (const it of models) {
    if (it.type === 0) {
      if (it.id === id) {
        path = it.path
        return path
      }
      if (it.children) {
        path = getParentMenuPath(it.children, id)
        return path
      }
    }
  }
  return path
}

export function useTableColumn() {
  const columns = ref<TableColumnPops[]>([
    {
      title: '菜单名称',
      key: 'title',
      dataIndex: 'title',
    },
    {
      title: '菜单地址',
      key: 'path',
      dataIndex: 'path',
    },
    {
      title: '组件地址',
      key: 'component',
      dataIndex: 'component',
      width: 100,
    },
    {
      title: '路由name',
      key: 'routeName',
      dataIndex: 'routeName',
      width: 100,
    },
    {
      title: '菜单图标',
      key: 'icon',
      dataIndex: 'icon',
      width: 100,
    },
    {
      title: '是否缓存',
      key: 'cacheable',
      dataIndex: 'cacheable',
      width: 100,
    },
    {
      title: '是否固定',
      key: 'affix',
      dataIndex: 'affix',
      width: 100,
    },
    {
      title: '操作',
      key: 'actions',
      dataIndex: 'actions',
      fixed: 'right',
    },
  ])
  return {
    columns,
  }
}

export function useFormItems(formModel: MenuModel) {
  const formItems = ref<FormItemProps[]>([
    {
      formItem: {
        label: '上级菜单',
        field: 'pid',
        tooltip: '如果没有选择此属性，则是以根 / 为父级',
      },
      visible: true,
      disabled: false,
      render: ({ options, disabled }) => {
        return h(TreeSelect, {
          placeholder: '请选择上级菜单',
          modelValue: formModel.pid,
          disabled,
          onChange(value) {
            formModel.pid = value as number
          },
          data: options,
        })
      },
      options: [],
    },
    {
      formItem: {
        label: '菜单标题',
        field: 'title',
        rules: {
          required: true,
          message: '请输入菜单标题',
        },
        tooltip: '该属性值会显示在侧边栏中，如：菜单管理',
        validateTrigger: 'blur',
      },
      visible: true,
      render: (props) => {
        return h(Input, {
          placeholder: '请输入菜单标题',
          modelValue: formModel.title,
          disabled: props.disabled,
          onInput(value) {
            formModel.title = value
          },
        })
      },
    },
    {
      formItem: {
        label: '菜单地址',
        field: 'path',
        rules: {
          required: true,
          message: '请输入菜单地址',
        },
        validateTrigger: 'blur',
        tooltip: `菜单的地址会以父地址加上此属性值为最终菜单地址，如父级菜单地址为：/system 而且此属性值设置成了 menu，则最终地址为：/system/menu，系统会以此地址作为文件地址去/src/views/下寻找对应的.vue文件。
          \n总之，在设置此属性的时候一定要以系统在/src/views/目录下能找到本地文件路径为准则。如果地址以 / 开头如 /menu，则不会自动拼接父级菜单路径，最终路径为：/menu`,
      },
      visible: true,
      render: (props) => {
        return h(Input, {
          placeholder: '请输入菜单地址',
          modelValue: formModel.path,
          disabled: props.disabled,
          onInput(value) {
            formModel.path = value
          },
        })
      },
    },
    {
      formItem: {
        label: '菜单图标',
        field: 'icon',
        tooltip: '默认使用arco-design组件库带的图标',
      },
      visible: true,
      render: () => {
        return h(IconSelector, {
          value: formModel.icon,
          onSelect: (value: string) => {
            formModel.icon = value
          },
        })
      },
    },
    {
      formItem: {
        label: '菜单类型',
        field: 'type',
        tooltip: '菜单类型可以是目录也可以是组件',
      },
      visible: true,
      disabled: false,
      render: ({ disabled }) => {
        return h(RadioGroup, {
          modelValue: formModel.type,
          disabled,
          onChange(value) {
            formModel.type = value as number
            onChangeType(value as number)
          },
          options: [
            {
              label: '目录',
              value: 0,
            },
            {
              label: '组件',
              value: 1,
            },
          ],
        })
      },
    },
    {
      formItem: {
        label: '路由名称',
        field: 'routeName',
        tooltip: '方便通过名称进行跳转，如 router.push({ name: "routeName" })',
      },
      visible: false,
      render: (props) => {
        return h(Input, {
          placeholder: '请输入路由名称',
          modelValue: formModel.routeName,
          disabled: props.disabled,
          onInput(value) {
            formModel.routeName = value
          },
        })
      },
    },
    {
      formItem: {
        label: '组件路径',
        field: 'component',
        tooltip:
          '默认与菜单地址属性一致，如果想单独设置本地文件路径则需要用此属性，如设置为： /system/local-path/department。则系统会此此路径在/src/views目录下进行寻找对应的.vue文件。注意不要带有.vue文件后缀',
      },
      visible: false,
      render: (props) => {
        return h(Input, {
          placeholder: '请输入组件路径',
          modelValue: formModel.component,
          disabled: props.disabled,
          onInput(value) {
            formModel.component = value
          },
        })
      },
    },
    {
      formItem: {
        label: '是否缓存',
        field: 'cacheable',
        tooltip: '开启缓存后，切换tabbar页面在重新打开会保留原状态，但不能关闭',
      },
      visible: false,
      render: () => {
        return h(Switch, {
          modelValue: formModel.cacheable,
          checkedValue: 1,
          uncheckedValue: 0,
          onChange(value) {
            formModel.cacheable = value as number
          },
        })
      },
    },
    {
      formItem: {
        label: '是否固定',
        field: 'affix',
        tooltip: '开启固定后，会固定在tabbar上，不能进行关闭',
      },
      visible: false,
      render: () => {
        return h(Switch, {
          modelValue: formModel.affix,
          checkedValue: 1,
          uncheckedValue: 0,
          onChange(value) {
            formModel.affix = value as number
          },
        })
      },
    },
  ])
  function setFormItemDisabled(item: string, disabled: boolean) {
    let tempItem = null
    if (typeof item === 'string') {
      tempItem = formItems.value.find((it) => it.formItem.field === item)
    } else {
      tempItem = item
    }
    if (!tempItem) return
    tempItem.disabled = disabled
  }
  function onChangeType(type: number) {
    //如果是目录 则有些设置是不需要展示的
    formItems.value.find((it) => it.formItem.field === 'routeName')!.visible = type === 1
    formItems.value.find((it) => it.formItem.field === 'component')!.visible = type === 1
    formItems.value.find((it) => it.formItem.field === 'cacheable')!.visible = type === 1
    formItems.value.find((it) => it.formItem.field === 'affix')!.visible = type === 1
  }
  function setParentOptions(menuList: MenuModel[]) {
    const parentList = handleParentList(menuList)
    formItems.value.find((it) => it.formItem.field === 'pid')!.options = parentList
  }
  return {
    formItems: computed(() => {
      return formItems.value.filter((it) => it.visible)
    }),
    setFormItemDisabled,
    setParentOptions,
  }
}

export function useMenuModel() {
  const formModel = reactive<MenuModel>({
    id: 0,
    pid: '',
    title: '',
    routeName: '',
    iconPrefix: '',
    icon: '',
    type: 0,
    path: '',
    component: '',
    badge: '',
    rootPath: 0,
    affix: 0,
    cacheable: 0,
    single: 0,
    sort: 0,
    status: 0,
  })
  function clearFormModel() {
    formModel.id = 0
    formModel.pid = ''
    formModel.title = ''
    formModel.routeName = ''
    formModel.iconPrefix = ''
    formModel.icon = ''
    formModel.type = 0
    formModel.path = ''
    formModel.component = ''
    formModel.badge = ''
    formModel.rootPath = 0
    formModel.affix = 0
    formModel.cacheable = 0
    formModel.single = 0
    formModel.sort = 0
    formModel.status = 0
  }
  function setFormModel(model: MenuModel) {
    Object.keys(model).forEach((it: string) => {
      if (it !== 'children') {
        ;(formModel as any)[it] = (model as any)[it]
      }
      if (it === 'pid' && (model as any)[it] === 0) {
        formModel.pid = ''
      }
    })
  }
  function getFormModel() {
    const model = { ...formModel } as any
    delete model.children
    model.pid = formModel.pid === '' ? 0 : formModel.pid
    if (formModel.id === 0) {
      // 新增模式
      delete model.id
    } else {
      // 编辑模式
    }
    return model
  }
  return {
    formModel,
    clearFormModel,
    setFormModel,
    getFormModel,
  }
}

export function useForm() {
  const menuFormRef = ref<FormInstance | null>()
  function clearValidate() {
    unref(menuFormRef)?.clearValidate()
  }
  return {
    menuFormRef,
    clearValidate,
  }
}
