import { FormItemProps } from '@/hooks/form'
import { TableColumnPops, useTableIndexColumn } from '@/hooks/table'
import { Input, InputPassword, Radio, RadioGroup, Select } from '@arco-design/web-vue'
import { computed, h, reactive, ref } from 'vue'

export type UserModel = {
  id: string | number
  username: string
  password: string
  phone: string
  email: string
  roles?: string | number | Record<string, any> | (string | number | Record<string, any>)[]
  status: number
}

export function useFormItems(formModel: UserModel) {
  const formItems = ref<FormItemProps[]>([
    {
      formItem: {
        label: '用户名称',
        field: 'username',
        rules: {
          required: true,
          message: '请输入用户名称',
        },
        validateTrigger: 'blur',
      },
      render: () => {
        return h(Input, {
          placeholder: '请输入用户名称',
          modelValue: formModel.username,
          onInput(value) {
            formModel.username = value
          },
        })
      },
      visible: true,
    },
    {
      formItem: {
        label: '手机号码',
        field: 'phone',
        rules: {
          required: true,
          message: '请输入手机号码',
        },
        validateTrigger: 'blur',
      },
      render: () => {
        return h(Input, {
          placeholder: '请输入手机号码',
          modelValue: formModel.phone,
          maxLength: 11,
          onInput(value) {
            formModel.phone = value
          },
        })
      },
      visible: true,
    },
    {
      formItem: {
        label: '邮箱地址',
        field: 'email',
        rules: {
          required: true,
          message: '请输入邮箱',
        },
        validateTrigger: 'blur',
      },
      render: () => {
        return h(Input, {
          placeholder: '请输入邮箱',
          modelValue: formModel.email,
          onInput(value) {
            formModel.email = value
          },
        })
      },
      visible: true,
    },
    {
      formItem: {
        label: '登录密码',
        field: 'password',
        rules: {
          required: true,
          message: '请输入登录密码',
        },
        validateTrigger: 'blur',
      },
      render: () => {
        return h(InputPassword, {
          placeholder: '请输入登录密码',
          modelValue: formModel.password,
          onInput(value: string) {
            formModel.password = value
          },
        })
      },
      visible: true,
    },
    {
      formItem: {
        label: '用户角色',
        field: 'roles',
        rules: {
          required: true,
          message: '请选择用户角色',
        },
        validateTrigger: 'blur',
      },
      render: ({ options = [] }) => {
        return h(Select, {
          placeholder: '请选择用户角色',
          options,
          multiple: true,
          modelValue: formModel.roles,
          onChange(value) {
            formModel.roles = value
          },
        })
      },
      options: [],
      visible: true,
    },
    {
      formItem: {
        label: '启用状态',
        field: 'status',
        validateTrigger: 'blur',
      },
      render: () => {
        return h(
          RadioGroup,
          {
            placeholder: '请选择用户状态',
            modelValue: formModel.status,
            onChange(value) {
              formModel.status = value as number
            },
          },
          {
            default: () => [
              h(
                Radio,
                {
                  value: 1,
                },
                {
                  default: () => '启用',
                }
              ),
              h(
                Radio,
                {
                  value: 0,
                },
                {
                  default: () => '禁用',
                }
              ),
            ],
          }
        )
      },
      visible: true,
    },
  ])
  function setFormItemVisible(item: FormItemProps | string, visible: boolean) {
    let tempItem = null
    if (typeof item === 'string') {
      tempItem = formItems.value.find((it) => it.formItem.field === item)
    } else {
      tempItem = item
    }
    if (!tempItem) return
    tempItem.visible = visible
  }
  return {
    formItems: computed(() => {
      return formItems.value.filter((it) => it.visible)
    }),
    setFormItemVisible,
  }
}

export function useTableColumn() {
  const columns = ref<TableColumnPops[]>([
    useTableIndexColumn(),
    {
      title: '名称',
      key: 'username',
      dataIndex: 'username',
    },
    {
      title: '手机号',
      key: 'phone',
      dataIndex: 'phone',
    },
    {
      title: '邮箱',
      key: 'email',
      dataIndex: 'email',
      width: 200,
    },
    {
      title: '角色',
      key: 'roleName',
      dataIndex: 'roleName',
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
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

export function useUserModel() {
  const formModel = reactive<UserModel>({
    id: '',
    username: '',
    password: '',
    phone: '',
    email: '',
    roles: undefined,
    status: 1,
  })
  function clearFormModel() {
    formModel.id = ''
    formModel.password = ''
    formModel.username = ''
    formModel.phone = ''
    formModel.email = ''
    formModel.roles = undefined
    formModel.status = 1
  }
  function setFormModel({ id, username, password, phone, email, roles, status }: UserModel) {
    formModel.id = id || ''
    formModel.username = username || ''
    formModel.password = password || ''
    formModel.phone = phone || ''
    formModel.email = email || ''
    formModel.roles = roles || undefined
    formModel.status = status
  }
  return {
    formModel,
    clearFormModel,
    setFormModel,
  }
}
