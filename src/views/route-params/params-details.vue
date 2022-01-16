<template>
  <div class="flex justify-center items-center h-full mt-16">
    <a-card :style="{ width: '360px' }" title="通过 params 方式传递参数如下：">
      {{ params }}
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const params = route.params
</script>
