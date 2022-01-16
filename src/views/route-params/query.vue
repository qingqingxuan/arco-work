<template>
  <div class="flex justify-center items-center h-full mt-16">
    <a-card :style="{ width: '360px' }" title="演示路由跳转通过 query 方式传递参数">
      <a-space direction="vertical" fill>
        <a-input v-model="id" placeholder="请输入id值"></a-input>
        <a-button type="primary" size="small" long @click="onClick">跳转</a-button>
      </a-space>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  const id = ref('')

  const router = useRouter()
  function onClick() {
    router.push({
      path: '/params-info/query',
      query: {
        id: id.value || new Date().getTime(),
      },
    })
  }
</script>
