import { defineComponent, toRefs, toRef } from 'vue'
export default defineComponent({
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const { title } = toRefs(props)
    const title2 = toRef(props, 'title')
    console.log(title)
    console.log(title2)

    return () => (
      <div>
        {title.value}
        {title2.value}
      </div>
    )
  },
})
