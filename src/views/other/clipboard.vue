<template>
  <a-card title="请输入内容" :content-style="{ padding: '10px' }">
    <a-input
      :style="{ width: '50%' }"
      v-model="content"
      placeholder="请输入内容"
    >
      <template #append>
        <a-button type="primary" @click="onCopy">复制</a-button>
      </template>
    </a-input>
  </a-card>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useClipboard } from '@vueuse/core'
  import { Message } from '@arco-design/web-vue'

  export default defineComponent({
    name: 'Clipboard',
    setup() {
      const content = ref('')
      const { copy, isSupported, text } = useClipboard({ source: content })
      const onCopy = () => {
        copy(content.value).then(() => {
          Message.success('复制成功，内容为：' + text.value)
        })
      }
      if (!isSupported) {
        Message.error('当前浏览器不支持此功能')
      }
      return {
        content,
        onCopy,
      }
    },
  })
</script>
