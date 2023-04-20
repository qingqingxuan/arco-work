import { FormItemInstance, Input, Select } from '@arco-design/web-vue'
import { VNode, h, reactive, ref } from 'vue'

export interface FormItemProps {
  formItem: FormItemInstance['$props']
  render: (params: any) => VNode
  [propName: string]: any
}

export type UserItem = {
  id: string | number
  username: string
  phone: string
  email: string
  roles?: string | number | Record<string, any> | (string | number | Record<string, any>)[]
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
        label: '用户角色',
        field: 'roles',
        rules: {
          required: true,
          message: '请选择用户角色',
        },
        validateTrigger: 'blur',
      },
      render: ({ options = [] }) => {
        console.log(options)
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
  ])
  return {
    formItems,
  }
}

export function useUser() {
  const formModel = reactive<UserItem>({
    id: '',
    username: '',
    phone: '',
    email: '',
    roles: undefined,
  })
  function clearFormModel() {
    formModel.id = ''
    formModel.username = ''
    formModel.phone = ''
    formModel.email = ''
    formModel.roles = undefined
  }
  function setFormModel({ id, username, phone, email, roles }: any) {
    formModel.id = id || ''
    formModel.username = username || ''
    formModel.phone = phone || ''
    formModel.email = email || ''
    formModel.roles = roles || undefined
  }
  return {
    formModel,
    clearFormModel,
    setFormModel,
  }
}
