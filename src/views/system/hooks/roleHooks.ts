import { get } from '@/api/http'
import { getRoleList } from '@/api/url'
import { FormItemProps } from '@/hooks/form'
import { TableColumnPops, useTableIndexColumn } from '@/hooks/table'
import { FormInstance, Input, TreeNodeData } from '@arco-design/web-vue'
import { ref, h, reactive, unref } from 'vue'
import { MenuModel } from './menuHooks'

export const ROLE_CODE_FLAG = 'ROLE_'

export type RoleModel = {
  id: number
  name: string
  code: string
  status?: number
}

export function useRoleList() {
  return get<RoleModel[]>({
    url: getRoleList,
  }).then((res) => {
    return res.data || []
  })
}

export function useForm() {
  const roleFormRef = ref<FormInstance | null>()
  function clearValidate() {
    unref(roleFormRef)?.clearValidate()
  }
  return {
    roleFormRef,
    clearValidate,
  }
}

export function useFormItems(formModel: RoleModel) {
  const formItems = ref<FormItemProps[]>([
    {
      formItem: {
        label: '角色标识',
        field: 'code',
        rules: {
          required: true,
          message: '请输入角色标识',
        },
        validateTrigger: 'blur',
      },
      render: (props) => {
        return h(
          Input,
          {
            placeholder: '请输入角色标识',
            modelValue: formModel.code,
            disabled: props.disabled,
            onInput(value) {
              formModel.code = value
            },
          },
          {
            prefix: () => ROLE_CODE_FLAG,
          }
        )
      },
    },
    {
      formItem: {
        label: '角色名称',
        field: 'name',
        rules: {
          required: true,
          message: '请输入角色名称',
        },
        validateTrigger: 'blur',
      },
      render: () => {
        return h(Input, {
          placeholder: '请输入角色名称',
          modelValue: formModel.name,
          onInput(value) {
            formModel.name = value
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
  return {
    formItems,
    setFormItemDisabled,
  }
}

export function useTableColumn() {
  const columns = ref<TableColumnPops[]>([
    useTableIndexColumn(),
    {
      title: '角色名称',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '角色标识',
      key: 'code',
      dataIndex: 'code',
    },
    {
      title: '角色状态',
      key: 'status',
      dataIndex: 'status',
    },
    {
      title: '创建时间',
      key: 'createdAt',
      dataIndex: 'createdAt',
    },
    {
      title: '操作',
      key: 'actions',
      dataIndex: 'actions',
    },
  ])
  return {
    columns,
  }
}

export function useRoleModel() {
  const formModel = reactive<RoleModel>({
    id: 0,
    name: '',
    code: '',
  })
  function clearFormModel() {
    formModel.id = 0
    formModel.name = ''
    formModel.code = ''
  }
  function setFormModel({ id, name, code }: RoleModel) {
    formModel.id = id || 0
    formModel.name = name || ''
    formModel.code = code.replace(ROLE_CODE_FLAG, '')
  }
  return {
    formModel,
    clearFormModel,
    setFormModel,
  }
}

export function handleMenuData(
  menuData: Array<MenuModel>,
  selectedKeys: number[],
  defaultExpandedKeys: Array<number>
) {
  const tempMenus: Array<TreeNodeData> = []
  menuData.forEach((it) => {
    const tempMenu: TreeNodeData = {}
    tempMenu.key = it.id
    tempMenu.title = it.title
    tempMenu.disabled = it.children && it.children.length === 0 && it.type === 0
    if (it.children && it.children.length > 0) {
      defaultExpandedKeys.push(tempMenu.key as number)
      const index = selectedKeys.indexOf(tempMenu.key as number)
      if (index !== -1) {
        selectedKeys.splice(selectedKeys.indexOf(tempMenu.key as number), 1)
      }
      tempMenu.children = handleMenuData(it.children, selectedKeys, defaultExpandedKeys)
    }
    tempMenus.push(tempMenu)
  })
  return tempMenus
}
