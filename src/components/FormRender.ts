import { h } from 'vue'

export default function Render(props: any) {
  return props.render(props.formItem, h)
}
