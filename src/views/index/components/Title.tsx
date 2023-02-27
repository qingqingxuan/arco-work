import { defineComponent, toRefs } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const { title } = toRefs(props)
    return () => <div>{title}</div>
  },
})
