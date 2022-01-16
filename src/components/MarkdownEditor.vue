<template>
  <div class="editor-wrapper" :style="{ zIndex: zIndex, height: innerHeight }">
    <textarea id="markdownEditor"></textarea>
  </div>
</template>

<script lang="ts">
  import 'simplemde/dist/simplemde.min.css'
  import 'font-awesome/css/font-awesome.min.css'
  import SimpleMDE from 'simplemde'
  import { computed, defineComponent, onMounted, ref, toRef, watch } from 'vue'
  export default defineComponent({
    name: 'MarkdownEditor',
    props: {
      value: {
        type: String,
        default: '',
      },
      placeholder: {
        type: String,
        default: '',
      },
      zIndex: {
        type: Number,
        default: 1,
      },
      height: {
        type: [Number, String],
        default: 'auto',
      },
    },
    emits: ['update:value'],
    setup(props, { emit }) {
      let simpleMDE: SimpleMDE | null = null
      const innerInput = ref(false)
      const innerHeight = computed(() => {
        if (typeof props.height === 'string') {
          return parseInt(props.height) + 50 + 'px'
        }
        return props.height + 50 + 'px'
      })
      const init = () => {
        simpleMDE = new SimpleMDE({
          element: document.getElementById('markdownEditor') as HTMLElement,
          spellChecker: false,
          placeholder: props.placeholder,
          hideIcons: ['side-by-side', 'fullscreen'],
        })
        simpleMDE.codemirror.on('change', () => {
          innerInput.value = true
          const val = simpleMDE?.value()
          emit('update:value', val)
        })
      }
      const addText = (text: string) => {
        simpleMDE?.value(simpleMDE?.value() + text)
      }
      const addImage = (imgInfo: string) => {
        simpleMDE?.value(simpleMDE?.value() + imgInfo)
      }
      function getHtmlValue() {
        return (simpleMDE as any).options.previewRender(simpleMDE?.value())
      }
      onMounted(init)
      const value = toRef(props, 'value')
      watch(value, (newVal) => {
        if (innerInput.value) {
          innerInput.value = false
        } else {
          simpleMDE?.value(newVal.toString())
        }
      })
      return {
        innerHeight,
        innerInput,
        addText,
        addImage,
        getHtmlValue,
      }
    },
  })
</script>

<style lang="less" scoped>
  .editor-wrapper {
    position: relative;
    :deep(.CodeMirror) {
      height: calc(100% - 50px);
    }
  }
</style>
