import {
  FormItemInstance,
  Input,
  InputPassword,
  Radio,
  RadioGroup,
  Select,
} from '@arco-design/web-vue'
import { VNode, h, reactive, ref } from 'vue'

export interface FormItemProps {
  formItem: FormItemInstance['$props']
  render: (params: any) => VNode
  [propName: string]: any
}

export type UserItem = {
  id: string | number
  username: string
  password: string
  phone: string
  email: string
  roles?: string | number | Record<string, any> | (string | number | Record<string, any>)[]
  status: number
}

export function useUserFormItem(formModel: UserItem) {
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
    },
  ])
  return {
    formItems,
  }
}

export function useUserModel() {
  const formModel = reactive<UserItem>({
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
  function setFormModel({ id, username, password, phone, email, roles, status }: UserItem) {
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
