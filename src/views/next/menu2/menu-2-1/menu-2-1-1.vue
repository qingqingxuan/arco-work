<template>
  <a-card title="缓存信息">
    <a-input v-model="content" placeholder="请输入信息" />
  </a-card>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    name: 'Menu211',
    setup() {
      const content = ref('')
      return {
        content,
      }
    },
  })
</script>
