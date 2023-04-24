import { FormItemInstance } from '@arco-design/web-vue'
import { VNode } from 'vue'

export interface FormItemProps {
  formItem: FormItemInstance['$props']
  render: (params: any) => VNode
  visible?: boolean
  disabled?: boolean
  [propName: string]: any
}
